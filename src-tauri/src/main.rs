// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

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
    artist: String,
    year: i32,
    album: String,
    image: String,
    file_name: String,
}

#[tauri::command]
fn get_music_items() -> String {
    let mut songs = Vec::new();

    for entry in glob("C:/Users/jesus/Music/Done/**/*.mp3").expect("Failed to read glob pattern") {
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
            Err(e) => eprintln!("[ERROR] - {:?}", e),
        }
    }

    let json_string = convert_to_json(songs);

    match json_string {
        Ok(song_metadata) => song_metadata,
        Err(_e) => "{}, e".into(),
    }
}

fn convert_to_json(song_info_vec: Vec<SongData>) -> Result<String, Box<dyn std::error::Error>> {
    let json_string = serde_json::to_string(&song_info_vec)?;
    Ok(json_string)
}

fn get_song_name(song_path: String) -> Option<String> {
    if let Some(suffix) = song_path.strip_prefix("C:/Users\\jesus\\Music\\Done\\") {
        Some(suffix.to_string())
    } else {
        println!("La cadena no tiene el prefijo esperado.");
        None
    }
}

fn get_song_metatadata(
    song_path: String,
    song_name: String,
) -> Result<SongData, Box<dyn std::error::Error>> {
    let song_file_name: String = song_path.clone().as_str().to_string();
    let tag = Tag::read_from_path(song_path)?;

    create_dir_all("C:/Users/jesus/Music/Done/img").expect("Error creating img directory");

    if let Some(picture) = tag.pictures().next() {
        let file_name = Path::new(&song_file_name)
            .file_stem()
            .and_then(|name| name.to_str())
            .unwrap_or("unknown");

        let image_path = format!("C:/Users/jesus/Music/Done/img/{}_image.jpg", file_name);
        let mut image_file = File::create(&image_path).expect("Error creating image file");

        image_file
            .write_all(&picture.data)
            .expect("Error writing image data");
    }

    let song_metadata = SongData {
        title: tag
            .title()
            .map(String::from)
            .unwrap_or_else(|| "null".to_string()),
        artist: tag
            .artist()
            .map(String::from)
            .unwrap_or_else(|| "null".to_string()),
        year: tag.year().unwrap_or_else(|| 0),
        album: tag
            .album()
            .map(String::from)
            .unwrap_or_else(|| "null".to_string()),
        image: format!("img/{:?}_image.jpg", song_name.to_string()),
        file_name: song_name.to_string(),
    };

    Ok(song_metadata)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_music_items])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
