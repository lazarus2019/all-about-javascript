class Song {
    constructor(id, title, singer, path, image, duration) {
        this.elements = {}
        this.elements.root = Song.createRoot()
        this.elements.image = this.elements.root.querySelector('.playlist__list-item-image img')
        this.elements.title = this.elements.root.querySelector('.playlist__song-content h3')
        this.elements.singer = this.elements.root.querySelector('.playlist__song-content span')
        this.elements.removeBtn = this.elements.root.querySelector('.remove-song')
        this.elements.songInfo = this.elements.root.querySelector('.song-info-player')
        this.elements.addToLike = this.elements.root.querySelector('.playlist-add-like-btn')

        this.elements.root.dataset.id = id
        this.elements.songInfo.value = id
        this.elements.removeBtn.dataset.id = id
        this.elements.addToLike.dataset.id = id
        this.elements.image.src = image
        this.elements.title.textContent = title
        this.elements.singer.textContent = singer

    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <li class="playlist__list-item">
                <input class="song-info-player" name="songsPlayer" style="display: none">     
        <div class="playlist__item-desc">
            <div class="playlist__list-item-image">
                <img src=""
                alt="">
                </div>
                <div class="playlist__song-content">
                    <h3></h3>
                    <span></span>
                    </div>
                    </div>
                    <button class="btn-dropdown-playlist-menu default-btn" type="button">
                        <i class="las la-braille audio__icon"></i>
                        <div class="dropdown__playlist-item-menu">
                <a onclick="add_to_liked(this)" class="dropdown-song-link favorite-link playlist-add-like-btn" data-favorite="true">
                    <i class="las la-heart"></i>
                    <span>Add to Favorite</span>
                    </a>
                    <a class="dropdown-song-link">
                    <i class="las la-plus small__icon"></i>
                    <span>Add to Playlist</span>
                    </a>
                    <a class="dropdown-song-link share-link" href="abc.com">
                    <i class="las la-share small__icon"></i>
                    <span>Share</span>
                </a>	                
                <a class="dropdown-song-link remove-song">
                    <i class="las la-minus-circle small__icon"></i>
                    <span>Remove Song</span>
                    </a>
                    </div>
                    </button>
                    </li>
                    `).children[0];
    }
}

let songPlaylist = JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)) || []

let songPlaylist = [
    {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://docs.google.com/uc?export=download&id=1BXF9GlkjfHAfM3rfP0nvKvop7K43zFh8",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
            "https://docs.google.com/uc?export=download&id=1YIS-DOrgAvVJLGJuyaJEIDnWMajHaeZG",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://docs.google.com/uc?export=download&id=13YF1Dez_msLjKvRRs0pw1oSuK_iH6HTM",
        image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://docs.google.com/uc?export=download&id=1VHxHLxuDGc8iYjSw7TDX__jHZxagjICB",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
        name: "Damn asdasd",
        singer: "Raftaar x kr$na",
        path: "https://docs.google.com/uc?export=download&id=1LaLUEWpF5Z6e9pLaZFaojEPrIcNCIn9C",
        image:
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://docs.google.com/uc?export=download&id=1kC4OK-CMPKfHUbRgB1uRkqX6YBYpaCyd",
        image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
]

const appPremium = {
    oldIndex: 0,
    currentIndex: 0,
    currentSong: {},
    volume: .5, // [0;1]
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    startTime: 0,
    isCountdown: false,
    secondsTimerLeft: 0,
    timer: setInterval(() => { }, 1000),
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)) || [],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    renderFirstTime: function () {
        songPlaylist.forEach(song => {
            const songEl = new Song(song.id, song.title, song.singer, song.path, song.image, song.duration)
            playlist.appendChild(songEl.elements.root)
        })
        console.log('renderFirstTimeed')
        addEventRemoveSong()
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                this.setConfig('currentIndex', this.currentIndex)
                this.setConfig('currentSong', songPlaylist[this.currentIndex])
                return songPlaylist[this.currentIndex]
            }
        });
    },
    handleEvents: function () {
        const _this = this;

        playBtn.onclick = () => {
            _this.setConfig('isPlaying', !_this.isPlaying)
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        audio.ontimeupdate = () => {
            if (audio.duration) {
                _this.startTime = audio.currentTime
                _this.setConfig('startTime', _this.startTime)
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100 * 100) / 100
                progress.value = progressPercent
                progressBar.style.width = progressPercent + '%';
                trackTime.innerHTML = _this.audioCalTime(audio.currentTime)
            }
        }

        progress.oninput = (e) => {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value * 100) / 100
            audio.currentTime = seekTime
            progressBar.style.width = e.target.value + '%';
        }

        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }

        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                if (!_this.isRandom && _this.currentIndex === (songPlaylist.length - 1)) {
                    _this.findAndSongToWaiting()
                } else {
                    nextBtn.click()
                }
            }
        }

        playlist.onclick = (e) => {
            const songNode = e.target.closest('.playlist__list-item');
            if (songNode && !e.target.closest('.btn-dropdown-playlist-menu')) {
                // if (songNode) {
                // console.log('songnode')
                // audio.src = songNode.dataset.filename
                const id = Number(songNode.dataset.id)
                const currentSong = songPlaylist.find(song => song.id === id)
                _this.currentIndex = songPlaylist.indexOf(currentSong)
                // _this.currentIndex = Number(songNode.dataset.id)
                _this.loadCurrentSong()
                // }

                if (e.target.closest('.btn-dropdown-playlist-menu')) {

                }
            }
        }

        audioVolume.oninput = (e) => {
            const volume = e.target.value / 100
            audio.volume = volume
            _this.setConfig('volume', volume)
        }

        setTimerBtn.onclick = () => {
            clearInterval(_this.timer)
            _this.secondsTimerLeft = timerSelect.value * 60;
            _this.countDownTimer()
            _this.closeTimer()
        }

        cancelTimerLayout.onclick = () => {
            _this.closeTimer()
        }

        removeTimer.onclick = () => {
            _this.removeCountDown()
        }
    },
    audioCalTime: function (time) {
        const duration = Number.parseInt(time)
        if (duration < 3600) {
            return new Date(duration * 1000).toISOString().substr(14, 5)
        } else {
            return new Date(duration * 1000).toISOString().substr(11, 8)
        }
    },
    countDownTimer: function () {
        timerLeft.innerHTML = this.audioCalTime(this.secondsTimerLeft)
        this.setCountdownToStorage(true)
        timerCountDown.classList.add('show')
        this.timer = setInterval(() => {
            this.secondsTimerLeft--
            this.setConfig('secondsTimerLeft', this.secondsTimerLeft)
            timerLeft.innerHTML = this.audioCalTime(this.secondsTimerLeft)
            if (this.secondsTimerLeft == 0) {
                this.removeCountDown()
                this.setCountdownToStorage(false)
                audio.pause()
                this.setConfig('isPlaying', false)
                this.playAlarmTimer()
            }
        }, 1000)
    },
    setCountdownToStorage: function (status) {
        this.isCountdown = status;
        this.setConfig('isCountdown', this.isCountdown)
    },
    playAlarmTimer: function () {

    },
    closeTimer: function () {
        document.querySelector('.set-timer').classList.remove('show')
    },
    removeCountDown: function () {
        this.secondsTimerLeft = 0
        this.setConfig('secondsTimerLeft', this.secondsTimerLeft)
        clearInterval(this.timer)
        timerCountDown.classList.remove('show')
    },
    loadCurrentSong: function () {
        this.activeSong()

        audio.src = this.currentSong.path
        cdThumb.src = this.currentSong.image
        songName.textContent = this.currentSong.title;
        songArtist.textContent = this.currentSong.singer
        baseDuration.innerHTML = this.audioCalTime(this.currentSong.duration)
        if (this.isPlaying) {
            audio.load()
            audio.autoplay = true
        }
        this.renderLyrics()
        lyricThumbnail.src = this.currentSong.image
        document.querySelector('#download-song-url').href = this.currentSong.path
        document.querySelector('.add-to-liked-btn').dataset.id = this.currentSong.id
    },
    activeSong: function () {
        const oldSong = document.querySelector('.playlist__list-item.active')
        if (oldSong) {
            oldSong.classList.remove('active')
        }
        const songActive = document.querySelector(".playlist__list-item[data-id='" + this.currentSong.id + "']")
        if (songActive) {
            songActive.classList.add('active')
        }
    },
    renderLyrics: function () {
        if (this.currentSong.lyrics) {
            let title = "<p>Song: " + this.currentSong.title + " - " + this.currentSong.singer + "</p>"
            let htmls = this.currentSong.lyrics.split("/n").map(line => "<p>" + line + "</p>")

            lyricContent.innerHTML = title + htmls.join('')
        }
    },
    findAndSongToWaiting: function () {
        getWaitingTrack(this.currentSong)
    },
    loadConfig: function () {
        this.currentIndex = this.config.currentIndex || 0
        this.currentSong = this.config.currentSong || songPlaylist[this.currentIndex] || {}

        this.volume = this.config.volume || .5
        audioVolume.value = this.volume * 100
        audio.volume = this.volume

        this.startTime = this.config.startTime || 0
        if (this.startTime != 0) {
            audio.currentTime = this.startTime
        }
        if (songPlaylist.length > 0) {
            this.loadCurrentSong()
        }

        this.isPlaying = this.config.isPlaying || false
        if (this.isPlaying) {
            audio.autoplay = true
        }

        this.isRandom = this.config.isRandom || false
        this.isRepeat = this.config.isRepeat || false
        this.isCountdown = this.config.isCountdown || false
        this.secondsTimerLeft = this.config.secondsTimerLeft || 0
        if (this.secondsTimerLeft != 0 && this.isCountdown) {
            this.countDownTimer()
        }

    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= songPlaylist.length) {
            this.currentIndex = 0
        }
        plusListenForTrack(this.currentSong.id)
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = songPlaylist.length - 1
        }
        plusListenForTrack(this.currentSong.id)
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * songPlaylist.length)
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
        plusListenForTrack(this.currentSong.id)
        this.loadCurrentSong()
    },
    addNewSong: function (songs) {
        if (songs.isArray()) {

        } else {
            if (songPlaylist.indexOf(newSong) === -1) {
                songPlaylist.push(newSong)
                this.updatePlaylist(songPlaylist)
            }
        }

    },
    findSong: function (id) {
        return songPlaylist.find(song => song.id === id) || null
    },
    deleteSong: function (songId) {
        const song = this.findSong(songId)
        if (song) {
            songPlaylist.splice(songs.indexOf(song), 1)
        }
    },
    getPlaylist: function () {

    },
    updatePlaylist: function (playlist) {
        localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlist))
    },
    start: function () {
        this.renderFirstTime()

        this.loadConfig()

        this.defineProperties()

        this.handleEvents()

        // this.loadCurrentSong()

        // this.updatePlaylist(songPlaylist)

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}