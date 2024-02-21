# How to configure your .env variables

## First step 
### Create a .env file in src-tauri folder

## Second step
### Copy paste the below variables to the .env file and replace the %USERNAME% to your username on Windows

# - Music path where we're loading the music files
MUSIC_PATH=C:/Users/%USERNAME%/Music/Done/**/*.mp3

# - Music strip prefix used for getting the song name
MUSIC_STRIP_PREFIX=C:/Users\\%USERNAME%\\Music\\Done\\

# - Music folder where we're storing the songs images
SONGS_COVERS_FOLDER=C:/Users/%USERNAME%/Music/Done/img

# - Songs image files path
SONGS_IMAGES_PATH=C:/Users/%USERNAME%/Music/Done/img/{}_image.jpg