// Initially, selecting all the components
const musicPlayer = document.querySelector('.music-player');
const song = musicPlayer.querySelector('audio');
const albumArt = musicPlayer.querySelector('.song-art img');
const prevBtn = musicPlayer.querySelector('.backward-btn');
const playPauseBtn = musicPlayer.querySelector('.play-pause-btn');
const playPauseIcon = musicPlayer.querySelector('.play-pause-btn i');
const nextBtn = musicPlayer.querySelector('.forward-btn');
const currentTime = musicPlayer.querySelector('.current-time');
const durationTime = musicPlayer.querySelector('.duration-time');
const progressContain = musicPlayer.querySelector('.progress-bar-contain');
const progressBar = progressContain.querySelector('.progress-bar');

// Storing all our songs as an array of objects
const songs = [
    {
        songName: 'Ocean',
        artistName: 'David Davis',
        songImg: 'ocean.jpg',
        songSrc: 'David_Davis_-_Ocean.mp3'
    },
    {
        songName: 'Attention',
        artistName: 'Charlie Puth',
        songImg: 'Attention.png',
        songSrc: 'Attention.mp3'
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
        songImg: 'Believer.jpg',
        songSrc: 'Imagine Dragons - Believer.mp3'
    }
];

// Assuming our song is not playing initially
let playing = false;
// And by default the player is at first song
let songPosition = 0;

// Play function to play the song
const playSong = () => {
    playing = true; // Now the song is playing
    albumArt.classList.add('spin'); // Spin the album art when the song is playing
    playPauseIcon.classList.replace('fa-play','fa-pause'); // Changing the play btn icon according to the condition
    song.play(); // Play the song
};

// Pause function to pause the song
const pauseSong = () => {
    playing = false; // Now the song is paused
    albumArt.classList.remove('spin'); // Removing the spin when the song is paused
    playPauseIcon.classList.replace('fa-pause','fa-play');
    song.pause(); //Pause the song
};

// Adding functionality to the play/pause btn
playPauseBtn.addEventListener('click',(e) => {
    !playing ? playSong() : pauseSong(); // Toggling the play/pause function
});

// Function to play the next song
const nextSong = () => {

    if(songPosition == songs.length - 1) // If last song is playing
    {
        // back to the first song
        songPosition = 0;
    }
    else
    {
        // Incrementing the song's position by 1
        songPosition++
    }

    // Set all the resources required for the song
    setSong(songPosition);
    // console.log(`${songs[songPosition].songName} by ${songs[songPosition].artistName}`);
}

// Function to play the previous song
const prevSong = () => {

    if(songPosition == 0) // If first song is playing
    {
        // Jump to the last song
        songPosition = songs.length - 1;
    }
    else
    {
        // Decrementing the song's position by 1
        songPosition--;
    }

    // Set all the resources required for the song
    setSong(songPosition);
    // console.log(`${songs[songPosition].songName} by ${songs[songPosition].artistName}`);
}

// Function to set the resources for the song
const setSong = (songPosition) => {
    // Play the song according to the position
    albumArt.src = `img/${songs[songPosition].songImg}`; // Song's img
    song.src = `songs/${songs[songPosition].songSrc}`; // Song's source

    playSong(); // Play the song
}

// Adding functionalities to prev and next btn
nextBtn.addEventListener('click',(e) => {
    nextSong();
});
prevBtn.addEventListener('click',(e) => {
    prevSong();
});

// Let's work with the timings and the progress bar
song.addEventListener('timeupdate',(e) => {
    // Timings

    // Now fetching the song's current time and the duration time
    let rawCurrentTime = song.currentTime;
    let rawDurationTime = song.duration;

    // Converting these time data into standard time
    currentMin = Math.floor(rawCurrentTime / 60);
    currentSec = Math.floor(rawCurrentTime % 60);

    durationMin = Math.floor(rawDurationTime / 60);
    durationSec = Math.floor(rawDurationTime % 60);

    
    if(currentSec < 10)
    {
        currentSec = `0${currentSec}`;
    }
    if(durationSec < 10)
    {
        durationSec = `0${durationSec}`;
    }
    
    if(rawDurationTime) 
    {
        // If we get the audio properties

        let current = `${currentMin}:${currentSec}`;
        let duration = `${durationMin}:${durationSec}`;

        // Appending the timing data in the player
        currentTime.innerHTML = current;
        durationTime.innerHTML = duration;
    }

    // Progress bar
    
    // Calculating the percentage width for our progress bar from current time and duration
    let progressWidth = (rawCurrentTime/rawDurationTime)*100;
    progressBar.style.width = `${progressWidth}%`;
});


