// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv;
use glob::glob;
use id3::{Tag, TagLike};
use serde::Serialize;
use serde_json;
use std::fs::create_dir_all;
use std::path::Path;
use std::{fs::File, io::Write};

#[derive(Debug, Serialize)]
struct SongData {
    title: String,
    artist: Option<String>,
    year: Option<i32>,
    album: Option<String>,
    image: Option<String>,
    file_name: String,
    lyrics: Vec<Lyrics>,
    genres: Vec<String>,
}

#[derive(Debug, Serialize)]
struct Lyrics {
    lang: String,
    description: String,
    text: String,
}

/// A Tauri command to retrieve music items, including metadata, from a specified directory.
///
/// This function scans the specified directory for MP3 files, extracts their metadata,
/// and returns a JSON-formatted string containing information about the songs.
///
/// # Returns
///
/// Returns a `String` representing the JSON-formatted metadata of the songs found in the directory.
///
/// If any error occurs during the process, the function returns an error message within the JSON format.
///
/// # Examples
///
/// ```
/// let result = get_music_items();
/// println!("Music Items: {}", result);
/// ```
#[tauri::command]
fn get_music_items() -> String {
    let mut songs = Vec::new();

    for entry in glob(&dotenv::var("MUSIC_PATH").unwrap()).expect("Failed to read glob pattern") {
        match entry {
            Ok(path) => {
                if let Some(suffix) = get_song_name(path.display().to_string()) {
                    match get_song_metatadata(path.display().to_string(), suffix) {
                        Ok(song_metadata) => {
                            songs.push(song_metadata);
                        }
                        Err(e) => {
                            eprintln!("[ERROR] - Error getting metadata!: {:?}", e);
                        }
                    };
                }
            }
            Err(e) => eprintln!("[ERROR] - Error reading song path! {:?}", e),
        }
    }

    convert_to_json(songs).unwrap_or_else(|_| "[ERROR] - Can't convert songs to JSON".to_string())
}

/// Converts a vector of `SongData` into a JSON-formatted string.
///
/// # Arguments
///
/// * `song_info_vec` - A vector containing `SongData` structs.
///
/// # Returns
///
/// Returns a `Result` where `Ok` contains the JSON-formatted string, and `Err` contains
/// a `serde_json::Error` if the conversion fails.
///
/// # Examples
///
/// ```
/// let song_info_vec = vec![SongData { /* ... */ }];
/// let result = convert_to_json(song_info_vec);
/// assert!(result.is_ok());
/// ```
fn convert_to_json(song_info_vec: Vec<SongData>) -> Result<String, Box<dyn std::error::Error>> {
    let json_string = serde_json::to_string(&song_info_vec)?;
    Ok(json_string)
}

/// Extracts the suffix of a song path, if it starts with the specified prefix.
///
/// # Arguments
///
/// * `song_path` - A `String` representing the full path of the song.
///
/// # Returns
///
/// Returns `Some(suffix)` if the `song_path` starts with the specified prefix,
/// where `suffix` is the part of the path after the prefix. Returns `None` otherwise.
///
/// # Examples
///
/// ```
/// let song_path = "C:/Users\\jesus\\Music\\Done\\song.mp3".to_string();
/// let result = get_song_name(song_path);
/// assert_eq!(result, Some("song.mp3".to_string()));
/// ```
fn get_song_name(song_path: String) -> Option<String> {
    song_path
        .strip_prefix(&dotenv::var("MUSIC_STRIP_PREFIX").unwrap())
        .map(|suffix| suffix.to_string())
}

/// Retrieves metadata for a song and saves its associated image.
///
/// # Arguments
///
/// * `song_path` - A `String` representing the full path to the song file.
/// * `song_name` - A `String` representing the name of the song.
///
/// # Returns
///
/// Returns a `Result` where `Ok` contains a `SongData` struct with metadata, and `Err` contains
/// an error (boxed as `Box<dyn std::error::Error>`) if any operation fails.
///
/// # Examples
///
/// ```
/// let song_path = "C:/Users/jesus/Music/Done/song.mp3".to_string();
/// let song_name = "song".to_string();
/// let result = get_song_metadata(song_path, song_name);
/// assert!(result.is_ok());
/// ```
fn get_song_metatadata(
    song_path: String,
    song_name: String,
) -> Result<SongData, Box<dyn std::error::Error>> {
    let song_file_name: String = song_path.clone().as_str().to_string();
    let tag = Tag::read_from_path(song_path)?;

    let duration = tag.genres();
    println!("Lyrics frames: {:?}", duration);

    let genres: Vec<String> = match tag.genres() {
        Some(song_genres) => song_genres.iter().map(|&g| g.to_owned()).collect(),
        None => Vec::new(),
    };

    let lyrics: Vec<Lyrics> = tag
        .lyrics()
        .map(|l| Lyrics {
            lang: l.lang.to_string(),
            description: l.description.to_string(),
            text: l.text.to_string(),
        })
        .collect();

    create_dir_all(&dotenv::var("SONGS_COVERS_FOLDER").unwrap())
        .expect("Error creating img directory");

    if let Some(picture) = tag.pictures().next() {
        let file_name = Path::new(&song_file_name)
            .file_stem()
            .and_then(|name| name.to_str())
            .unwrap_or("unknown");

        let image_path = format!(
            "{}/{}_image.jpg",
            &dotenv::var("SONGS_COVERS_FOLDER").unwrap(),
            file_name
        );
        let mut image_file = File::create(&image_path).expect("Error creating image file");

        image_file
            .write_all(&picture.data)
            .expect("Error writing image data");
    }

    let song_metadata = SongData {
        title: tag
            .title()
            .map(String::from)
            .unwrap_or_else(|| song_name.to_string()),
        artist: tag.artist().map(String::from).or_else(|| None),
        year: tag.year().or_else(|| None),
        album: tag.album().map(String::from).or_else(|| None),
        image: if tag.pictures().next().is_some() {
            Some(format!("img/{:?}_image.jpg", song_name.to_string()))
        } else {
            None
        },
        file_name: song_name.to_string(),
        lyrics,
        genres,
    };

    Ok(song_metadata)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_music_items])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
