// Initially, selecting all the components
const musicPlayer = document.querySelector('.music-player');
const song = musicPlayer.querySelector('audio');
const albumArt = musicPlayer.querySelector('.song-art img');
const songDetails = musicPlayer.querySelector('.song-details .lead-2');
const prevBtn = musicPlayer.querySelector('.backward-btn');
const playPauseBtn = musicPlayer.querySelector('.play-pause-btn');
const playPauseIcon = musicPlayer.querySelector('.play-pause-btn i');
const nextBtn = musicPlayer.querySelector('.forward-btn');
const currentTime = musicPlayer.querySelector('.current-time');
const durationTime = musicPlayer.querySelector('.duration-time');
const progressContain = musicPlayer.querySelector('.progress-bar-contain');
const playerCloseBtn = musicPlayer.querySelector('.close-music');
const progressBar = progressContain.querySelector('.progress-bar');

const songsListContain = document.querySelector('.songs-list ul');

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
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
        songImg: 'Believer.jpg',
        songSrc: 'Imagine Dragons - Believer.mp3'
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
        songImg: 'Believer.jpg',
        songSrc: 'Imagine Dragons - Believer.mp3'
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
        songImg: 'Believer.jpg',
        songSrc: 'Imagine Dragons - Believer.mp3'
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
        songImg: 'Believer.jpg',
        songSrc: 'Imagine Dragons - Believer.mp3'
    },
];

// Assuming our song is not playing initially
let playing = false;
// And by default the player is at first song
let songPosition = 0;

// Play function to play the song
const playSong = () => {
    playing = true; // Now the song is playing
    albumArt.classList.add('spin'); // Spin the album art when the song is playing
    songDetails.classList.add('slide'); // Slide the song details when the song is playing
    playPauseIcon.classList.replace('fa-play','fa-pause'); // Changing the play btn icon according to the condition
    song.play(); // Play the song
};

// Pause function to pause the song
const pauseSong = () => {
    playing = false; // Now the song is paused
    albumArt.classList.remove('spin'); // Removing the spin when the song is paused
    songDetails.classList.remove('slide'); // Removing the slide when the song is paused
    playPauseIcon.classList.replace('fa-pause','fa-play'); // Changing the play btn icon according to the condition
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
    songDetails.innerHTML = `${songs[songPosition].songName} - ${songs[songPosition].artistName}`;

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
    let progressWidth = (rawCurrentTime / rawDurationTime) * 100;
    progressBar.style.width = `${progressWidth}%`;
});

// Adding the feature for the user to seek the music forward/backward manually
progressContain.addEventListener('click',(e) => {
    // Fetching the exact width of the progress bar and mouse click position on the bar
    let progressBarWidth = progressContain.clientWidth;
    let progressClickPos = e.offsetX;

    let {duration} = song; // let duration = song.duration;
    
    // Calculating the current time from progress width and click position
    let current = (progressClickPos / progressBarWidth) * duration;

    song.currentTime = current;
    // console.log(current);
    // console.log(e);
}); 

// Play the next song when the song gets ended
song.addEventListener('ended',(e) => {
    nextSong();
});

// Function to play the song which user have selected
const playThisSong = (songSrc,imgSrc,songName,songArtist) => {

    song.src = songSrc; // Set the selected song's img to the player
    albumArt.src = imgSrc; // Set the selected song's source to the player 
    songDetails.innerHTML = `${songName} - ${songArtist}`; // Set the details on the player
    playSong(); // Play the selected song
};

// Appending all the stored songs as array of objects to the interface
// Avoiding hard coded songs list on the interface
// var allSongs = songsListContain.querySelector('ul');
var template = '';
for (let i = 0; i < songs.length; i++) {

    let temp = `<li class="songs">
                        <div class="song-contain">
                            <!-- Audio source for the song -->
                            <audio src="songs/${songs[i].songSrc}">Check yo browser</audio>
                            <!-- Album art of the song -->
                            <div class="album-art">
                                <img src="img/${songs[i].songImg}" alt="song-art">
                            </div>
                            <!-- Details of the song -->
                            <div class="song-details">
                                <h2 class="head-3 name">${songs[i].songName}</h2>
                                <p class="lead-2 semi-med artist">${songs[i].artistName}</p>
                            </div>
                        </div>
                    </li>`; 
    // Now appending the template to the list
    template += temp;
    
}
// Appending songs to the list
songsListContain.innerHTML = template;

// Selecting songs from the songs list
const songsList = songsListContain.querySelectorAll('.songs');

// Now adding the functionality to manually add the music on the player from the songs list
// Fetching each song from the songs list
songsList.forEach((indieSong) => {
    // // Adding functionalities to each song list
    indieSong.addEventListener('click',(e) => {
        // Open the music player as the user hit the song ASAP
        openPlayer();
        let imgSrc = indieSong.querySelector('.album-art img').src; // Album img source
        let songSrc = indieSong.querySelector('audio').src; // Song's source
        let songName = indieSong.querySelector('.song-details .name').textContent; // Get the song's name
        let songArtist = indieSong.querySelector('.song-details .artist').textContent; // Get the song's artist
        playThisSong(songSrc,imgSrc,songName,songArtist); // Calling the function
    });
})

// Function to show the music player
const openPlayer = () => {
    musicPlayer.style.transform = 'translateY(0)';
    musicPlayer.style.opacity = 1;
    musicPlayer.style.pointerEvents = 'all';
}   

// Function to hide the music player
const closePlayer = () => {
    musicPlayer.style.transform = 'translateY(10rem)';
    musicPlayer.style.opacity = 0;
    musicPlayer.style.pointerEvents = 'none';
}   

// Adding functionality to the player's close btn
playerCloseBtn.addEventListener('click',(e) => {
    // Close the music player
    closePlayer();
    // Stop the song
    song.pause();
});
