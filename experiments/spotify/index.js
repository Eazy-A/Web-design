// Music Library
const library = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        audio: "https://p.scdn.co/mp3-preview/843ec863a72c0b1b96de948df6b6b45d5c8a1964",
        duration: "3:45",
        liked: false
    },
    {
        title: "Save Your Tears",
        artist: "The Weeknd",
        image: "https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be",
        audio: "https://p.scdn.co/mp3-preview/2b6a1b5c9f0d58a3a9a2d34a5e96f9a8a5e5f5e5",
        duration: "3:35",
        liked: true
    },
    {
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        image: "https://i.scdn.co/image/ab67616d00001e02da5a5c3e9f6a2a5d5a5e5f5e",
        audio: "https://p.scdn.co/mp3-preview/1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a",
        duration: "2:21",
        liked: false
    },
    {
        title: "good 4 u",
        artist: "Olivia Rodrigo",
        image: "https://i.scdn.co/image/ab67616d00001e02bbbbbbbbbbbbbbbbbbbbbbbb",
        audio: "https://p.scdn.co/mp3-preview/3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a3a",
        duration: "2:58",
        liked: true
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        image: "https://i.scdn.co/image/ab67616d00001e02cccccccccccccccccccccccc",
        audio: "https://p.scdn.co/mp3-preview/4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a4a",
        duration: "3:23",
        liked: false
    }
];

// Playlists
const playlists = {
    "Recently Played": [
        { title: "Today's Top Hits", description: "Taylor Swift is on top of the Hottest 50!", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "RapCaviar", description: "New music from Drake, Kendrick Lamar and Travis Scott", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "All Out 2010s", description: "The biggest songs of the 2010s", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Rock Classics", description: "Rock legends & epic songs that continue to inspire generations", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Chill Hits", description: "Kick back to the best new and recent chill hits", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Mood Booster", description: "Get happy with today's dose of feel-good songs!", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" }
    ],
    "Made For You": [
        { title: "Discover Weekly", description: "Your weekly mixtape of fresh music", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Daily Mix 1", description: "Made for you based on your listening history", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Release Radar", description: "Catch all the latest music from artists you follow", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Time Capsule", description: "We made you a personalized playlist with songs to take you back", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "On Repeat", description: "Songs you can't stop playing right now", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" },
        { title: "Repeat Rewind", description: "Songs you loved a while ago", image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6" }
    ]
};

// DOM Elements
const audioPlayer = document.getElementById('audio-player');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const playButton = document.getElementById('play-button');
const playIcon = document.getElementById('play-icon');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const shuffleButton = document.getElementById('shuffle-button');
const repeatButton = document.getElementById('repeat-button');
const likeButton = document.getElementById('like-button');
const progressFill = document.getElementById('progress-fill');
const progressTrack = document.getElementById('progress-track');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeFill = document.getElementById('volume-fill');
const volumeBar = document.getElementById('volume-bar');
const volumeIcon = document.getElementById('volume-icon');
const cardsContainer = document.querySelector('.cards-container');
const greeting = document.querySelector('.greeting');

// Player State
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeated = false;
let volume = 0.7;
let progressInterval;

// Initialize Player
function initPlayer() {
    // Set initial volume
    audioPlayer.volume = volume;
    volumeFill.style.width = `${volume * 100}%`;

    // Load first song
    loadSong(currentSongIndex);

    // Set greeting based on time of day
    setGreeting();

    // Render playlists
    renderPlaylists();
}

// Set greeting based on time of day
function setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        greeting.textContent = "Good morning";
    } else if (hour < 18) {
        greeting.textContent = "Good afternoon";
    } else {
        greeting.textContent = "Good evening";
    }
}

// Render playlists
function renderPlaylists() {
    let html = '';

    // Recently Played
    playlists["Recently Played"].forEach(playlist => {
        html += `
                    <div class="card" data-type="playlist">
                        <div class="card-image">
                            <img src="${playlist.image}" alt="Playlist">
                            <div class="play-button">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="card-title">${playlist.title}</div>
                        <div class="card-description">${playlist.description}</div>
                    </div>
                `;
    });

    document.querySelector('.cards-container').innerHTML = html;

    // Made For You (second section)
    html = '';
    playlists["Made For You"].forEach(playlist => {
        html += `
                    <div class="card" data-type="playlist">
                        <div class="card-image">
                            <img src="${playlist.image}" alt="Playlist">
                            <div class="play-button">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="card-title">${playlist.title}</div>
                        <div class="card-description">${playlist.description}</div>
                    </div>
                `;
    });

    document.querySelectorAll('.cards-container')[1].innerHTML = html;
}

// Load song
function loadSong(index) {
    const song = library[index];
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    currentSongImage.src = song.image;
    audioPlayer.src = song.audio;
    durationDisplay.textContent = song.duration;

    // Update like button
    updateLikeButton(song.liked);
}

// Play song
function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playIcon.classList.replace('fa-play', 'fa-pause');

    // Start progress update interval
    progressInterval = setInterval(updateProgress, 1000);
}

// Pause song
function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playIcon.classList.replace('fa-pause', 'fa-play');

    // Clear progress interval
    clearInterval(progressInterval);
}

// Update progress bar
function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Update time display
    currentTimeDisplay.textContent = formatTime(currentTime);
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Set progress when clicked on progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Set volume when clicked on volume bar
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    volume = clickX / width;
    audioPlayer.volume = volume;
    volumeFill.style.width = `${volume * 100}%`;

    // Update volume icon
    if (volume === 0) {
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
}

// Toggle mute
function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        volumeFill.style.width = '0%';
        volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        audioPlayer.volume = volume;
        volumeFill.style.width = `${volume * 100}%`;
        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = library.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > library.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleButton.style.color = isShuffled ? '#1db954' : '#b3b3b3';

    if (isShuffled) {
        // Shuffle the library array (Fisher-Yates algorithm)
        for (let i = library.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [library[i], library[j]] = [library[j], library[i]];
        }
        currentSongIndex = 0;
    } else {
        // Restore original order (in a real app, you'd need to track original order)
        library.sort((a, b) => a.title.localeCompare(b.title));
        currentSongIndex = library.findIndex(song => song.title === currentSongTitle.textContent);
    }
}

// Toggle repeat
function toggleRepeat() {
    isRepeated = !isRepeated;
    repeatButton.style.color = isRepeated ? '#1db954' : '#b3b3b3';
    audioPlayer.loop = isRepeated;
}

// Toggle like
function toggleLike() {
    const currentSong = library.find(song => song.title === currentSongTitle.textContent);
    if (currentSong) {
        currentSong.liked = !currentSong.liked;
        updateLikeButton(currentSong.liked);
    }
}

// Update like button
function updateLikeButton(liked) {
    const icon = likeButton.querySelector('i');
    if (liked) {
        icon.classList.replace('far', 'fas');
        icon.style.color = '#1db954';
    } else {
        icon.classList.replace('fas', 'far');
        icon.style.color = '#b3b3b3';
    }
}

// Event Listeners
playButton.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
shuffleButton.addEventListener('click', toggleShuffle);
repeatButton.addEventListener('click', toggleRepeat);
likeButton.addEventListener('click', toggleLike);

progressTrack.addEventListener('click', setProgress);
volumeBar.addEventListener('click', setVolume);
volumeIcon.addEventListener('click', toggleMute);

// Song ended
audioPlayer.addEventListener('ended', () => {
    if (!isRepeated) {
        nextSong();
    }
});

// Card click handlers (play playlist)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        // In a real app, this would load the playlist songs
        // For demo, we'll just play a random song from our library
        const randomIndex = Math.floor(Math.random() * library.length);
        currentSongIndex = randomIndex;
        loadSong(currentSongIndex);
        playSong();
    }
});

// Initialize the player
initPlayer();