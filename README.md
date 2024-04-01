<div align="center">
  <h1>MyMusicPlayer</h1>
</div>

## :star2: About the Project

This repository contains a full stack app, a Music player created Using Tauri, React and Rust, it was created using:

<ul>
<li><a href="https://tauri.app/" target="_blank" rel="noopener noreferrer">Tauri</a></li>
<li><a href="https://www.rust-lang.org/" target="_blank" rel="noopener noreferrer">Rust</a></li>
<li><a href="https://crates.io/crates/id3" target="_blank" rel="noopener noreferrer">Rust-id3 crate</a></li>
<li><a href="https://es.react.dev/" target="_blank" rel="noopener noreferrer">React</a></li>
<li><a href="https://reactrouter.com/en/main" target="_blank" rel="noopener noreferrer">React Router</a></li>
<li><a href="https://react.i18next.com/" target="_blank" rel="noopener noreferrer">React i18Next</a></li>
<li><a href="https://docs.pmnd.rs/zustand/getting-started/introduction" target="_blank" rel="noopener noreferrer">Zustand</a></li>
<li>HTML</li>
<li>CSS</li>
<li>TypeScript</li>
</ul>

<!-- Screenshots -->

### :camera: Screenshots

<div align="center"> 
  <img src="https://github.com/jesusalberto11/MyMusicPlayer/blob/main/src/assets/app_image_1.png" alt="App_Image_1" title="First section" />
</div>

<div align="center"> 
  <img src="https://github.com/jesusalberto11/MyMusicPlayer/blob/main/src/assets/app_image_3.png" alt="App_Image_3" title="Third section" />
</div>

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

- To run this project you need:
  - NodeJS
  - Rust
  - Tauri
  - Visual Studio Code

Once you have that, you're ready to go

<!-- Installation and Run Locally -->

### :running: Installation and Run Locally

Clone the project

```bash
  git clone https://github.com/jesusalberto11/MyMusicPlayer
```

Go to the project directory

```bash
  cd MyMusicPlayer
```

Install the dependencies

```bash
  npm install
```

Configure the .env file 

#### First step 
##### Create a .env file in src-tauri folder

#### Second step
##### Copy paste the below variables to the .env file and replace the %USERNAME% to your username on Windows

##### - Music path where we're loading the music files
MUSIC_PATH=C:/Users/%USERNAME%/Music/Done/**/*.mp3

##### - Music strip prefix used for getting the song name
MUSIC_STRIP_PREFIX=C:/Users\\%USERNAME%\\Music\\Done\\

##### - Music folder where we're storing the songs images
SONGS_COVERS_FOLDER=C:/Users/%USERNAME%/Music/Done/img

##### - Songs image files path
SONGS_IMAGES_PATH=C:/Users/%USERNAME%/Music/Done/img/{}_image.jpg

##### If you're using MacOS or Linux, you need to replace the whole path to your music path

Then you're ready to go

Launch the development server

```bash
  npm run tauri dev
```

<!-- Contributing -->

## :wave: Contributing

Contributions are always welcome!

Please send a message if you're interested in contributing to the proyect.

<!-- Contact -->

## :handshake: Contact

Jesus Alberto - [@LinkedIn](https://www.linkedin.com/in/jesus-alberto-morales-rico-7092a9227/)
