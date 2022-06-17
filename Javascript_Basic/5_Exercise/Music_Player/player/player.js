import Song from "./Song.js";

const PlAYER_STORAGE_KEY = "MUSIC_APP"
const PLAYLIST_STORAGE_KEY = "MUSIC_APP_PLAYLIST"
const WAITING_PLAYLIST_STORAGE_KEY = "MUSIC_APP_WAITING_PLAYLIST"
let adsStep = 5

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const songName = $('.song-content h3')
const songArtist = $('.song-content span')
const cdThumb = $('.song-image img')
const audio = $('#audio')
const playBtn = $('.btn-play-pause-audio')
const progress = $('.audio-progress')
const progressBar = $('.progressbar .bar')
const nextBtn = $('.btn-next-audio')
const prevBtn = $('.btn-prev-audio')
const randomBtn = $('.btn-random-song')
const repeatBtn = $('.btn-loop-song')
const playlist = $('.playlist__list')
playlist.innerHTML = ""
const baseDuration = $('.base-duration')
const trackTime = $('.current-time')
const lyricContent = $('.lyric-content')
const lyricThumbnail = $('.lyric-thumbnail img')
const audioVolume = $('.audio-volume')
const timerSelect = $('#timer-countdown')
const setTimerBtn = $('.btn-set-timer')
const cancelTimerLayout = $('.btn-timer-cancel')
const removeTimer = $('.remove-timer')
const timerLeft = $('.timer-left')
const timerCountDown = $('.timer')
const advertisement = $('#advertisement');

const lyrics = [
    "Hey",
    "She said, 'I really miss the old you'",
    "Then found someone better (whoa)",
    "I really miss the old me (yeah, yeah)",
    "Maybe he was better, oh, oh, oh",
    "But I realize I'm doin' fine",
    "I just start thinkin' crazy when you're on my mind (crazy when you're on my mind, yeah)",
    "You'll be okay and I'll be alright",
    "But I've gotta say",
    "If we're said and done I know, I shouldn't say that",
    "I still care, but I still care",
    "And even when you're movin' on I hope you know that",
    "I'll be there, I'll be there",
    "I'll be there for you",
    "I'll be there for you",
    "Even if you don't want me to",
    "I'll be there for you",
    "Be there for you",
    "I'll be there for you",
    "Even if you don't want me to",
    "I'll be there for you",
    "(Yeah)",
    "I really gotta ask myself (oh)",
    "If I knew you weren't good for me then",
    "Why do I want you back right now? Oh",
    "Like you think I would've asked by now (oh)",
    "I'm in the palm of your hand, and then you don't give a damn",
    "Was it easy to let me go? (Say it)",
    "Say it quick, love my name when you sayin' it",
    "I don't even know why I'm sayin' this",
    "'Cause nothin' I'm sayin' is gonna change this",
    "But I realize I'm doin' fine",
    "I just start thinkin' crazy when you're on my mind",
    "You'll be okay and I'll be alright",
    "But I've gotta say",
    "If we're said and done I know, I shouldn't say that",
    "I still care, but I still care",
    "And even when you're movin' on I hope you know that (I hope you know)",
    "I'll be there, I'll be there",
    "Be there for you",
    "Ooh, ooh",
    "I'll be there for you",
    "Ooh, ooh",
    "Be there for you",
    "I'll be there for you",
    "Even if you don't want me to",
    "I'll be there for you"
]

let songPlaylist = JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)) || []

let newSongs = [
    {
        id: 7,
        title: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://docs.google.com/uc?export=download&id=1BXF9GlkjfHAfM3rfP0nvKvop7K43zFh8",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        duration: 246
    },
    {
        id: 40,
        title: "Ibiza",
        singer: "MBB",
        path: "https://docs.google.com/uc?export=download&id=10wjlQf92ph-EAma7TFqmcIlIegCDNI9G",
        image:
            "https://www.stockbiz.vn/Handlers/GetThumbnail.axd?i=202003270834059375000&w=220",
        duration: 246
    },
    {
        id: 25,
        title: "For You",
        singer: "Why Don't We",
        path: "https://docs.google.com/uc?export=download&id=19Lh7YjzCBrGlNVAADVkiEXwHLzpY2K8b",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/2020/08/06/6/0/8/0/1596669230164_640.jpg",
        duration: 246
    }
]

let waitingPlaylist = [
    {
        id: 40,
        title: "Ibiza",
        singer: "MBB",
        path: "https://docs.google.com/uc?export=download&id=10wjlQf92ph-EAma7TFqmcIlIegCDNI9G",
        image:
            "https://www.stockbiz.vn/Handlers/GetThumbnail.axd?i=202003270834059375000&w=220",
        duration: 246
    },
    {
        id: 25,
        title: "For You",
        singer: "Why Don't We",
        path: "https://docs.google.com/uc?export=download&id=19Lh7YjzCBrGlNVAADVkiEXwHLzpY2K8b",
        image:
            "https://avatar-ex-swe.nixcdn.com/song/2020/08/06/6/0/8/0/1596669230164_640.jpg",
        duration: 246
    },
    {
        id: 8,
        title: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://docs.google.com/uc?export=download&id=1BXF9GlkjfHAfM3rfP0nvKvop7K43zFh8",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        duration: 246
    },
    {
        id: 9,
        title: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://docs.google.com/uc?export=download&id=1BXF9GlkjfHAfM3rfP0nvKvop7K43zFh8",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        duration: 246
    },
    {
        id: 3,
        duration: 130,
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        title: "Feeling You",
        path: "https://docs.google.com/uc?export=download&id=1kC4OK-CMPKfHUbRgB1uRkqX6YBYpaCyd",
        singer: "Raftaar x Harjas"
    },
    {
        id: 4,
        duration: 130,
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        title: "Sax",
        path: "https://docs.google.com/uc?export=download&id=16ELzmbgvkTcU0L8GUngXL8MYcpjYq7oD",
        singer: "Raftaar x Harjas"
    },
    {
        id: 2,
        duration: 130,
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        title: "Smell Like Summer",
        path: "https://docs.google.com/uc?export=download&id=1CEQDcny85bzP8Xvonukm9BMQF0hPsw35",
        singer: "Raftaar x Harjas"
    },
    {
        id: 1,
        duration: 130,
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        title: "Steam Like Gone",
        path: "https://docs.google.com/uc?export=download&id=1CXF1XCQeiLuGvC515vFkKHtYT2JrreQm",
        singer: "Raftaar x Harjas"
    }
]

let isPremium = false;

const app = {
    oldIndex: 0,
    currentIndex: 0,
    currentSong: {},
    volume: .5, // [0;1]
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isAdvertisement: false,
    startTime: 0,
    amount: 0,
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

        // Xử lý khi click play
        playBtn.onclick = () => {
            _this.setConfig('isPlaying', !_this.isPlaying)
            if (!_this.isAdvertisement) {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            } else {
                _this.runAdvertisement()
            }
        }

        // Khi song được play
        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        // Khi song bị pause
        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        // Khi tiến độ bài hát thay đổi
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

        // Xử lý khi tua song
        progress.oninput = (e) => {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value * 100) / 100
            audio.currentTime = seekTime
            progressBar.style.width = e.target.value + '%';
        }

        // Khi next song
        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            if (!_this.isAdvertisement) {
                audio.currentTime = 0
                audio.play()
            }
            // _this.renderFirstTime()
        }

        // Khi prev song
        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            if (!_this.isAdvertisement) {
                audio.currentTime = 0
                audio.play()
            }
            // _this.renderFirstTime()
        }

        // Xử lý random bật tắt
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý phát lặp lại một song
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio ended
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                if (!_this.isRandom && _this.currentIndex === (songPlaylist.length - 1)) {
                    addSongs(waitingPlaylist[0])
                    playSong(waitingPlaylist[0].id)
                } else {
                    nextBtn.click()
                }
            }
        }

        // Xử lý khi advertisement hết
        advertisement.onended = () => {
            _this.isAdvertisement = false
            _this.setConfig('isAdvertisement', _this.isAdvertisement)
            _this.loadSongWithoutAds()
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.playlist__list-item');
            if (songNode && !e.target.closest('.btn-dropdown-playlist-menu')) {
                // Xử lý khi click vào song
                // if (songNode) {
                // console.log('songnode')
                // audio.src = songNode.dataset.filename
                const id = Number(songNode.dataset.id)
                const currentSong = songPlaylist.find(song => song.id === id)
                _this.currentIndex = songPlaylist.indexOf(currentSong)
                // _this.currentIndex = Number(songNode.dataset.id)
                _this.loadCurrentSong()
                // _this.renderFirstTime()
                // }

                // Xử lý khi click vào song option
                if (e.target.closest('.btn-dropdown-playlist-menu')) {

                }
            }
        }

        // Thay đổi âm lượng audio
        audioVolume.oninput = (e) => {
            const volume = e.target.value / 100
            audio.volume = volume
            _this.setConfig('volume', volume)
        }

        // Set timer cho trình phát nhạc
        setTimerBtn.onclick = () => {
            clearInterval(_this.timer)
            _this.secondsTimerLeft = timerSelect.value * 60;
            _this.countDownTimer()
            _this.closeTimer()
        }

        // Tắt trình countdown
        cancelTimerLayout.onclick = () => {
            _this.closeTimer()
        }

        // Xóa timer countdown
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
        $('.set-timer').classList.remove('show')
    },
    removeCountDown: function () {
        this.secondsTimerLeft = 0
        this.setConfig('secondsTimerLeft', this.secondsTimerLeft)
        clearInterval(this.timer)
        timerCountDown.classList.remove('show')
    },
    loadCurrentSong: function () {
        this.activeSong()

        if (this.amount % adsStep === 0 && this.amount !== 0) {
            this.isAdvertisement = true
            this.setConfig('isAdvertisement', this.isAdvertisement)
        }
        if (this.isAdvertisement) {
            this.runAdvertisement()
        } else {
            this.amount++
            this.setConfig('amount', this.amount)
            audio.src = this.currentSong.path
            cdThumb.src = `${this.currentSong.image}`
            songName.textContent = this.currentSong.title;
            songArtist.textContent = this.currentSong.singer
            baseDuration.innerHTML = this.audioCalTime(this.currentSong.duration)
            if (this.isPlaying) {
                audio.load()
                audio.autoplay = true
            }
            this.renderLyrics()
            lyricThumbnail.src = `${this.currentSong.image}`
        }
    },
    loadSongWithoutAds: function () {
        this.activeSong()

        this.amount++
        this.setConfig('amount', this.amount)
        audio.src = this.currentSong.path
        cdThumb.src = `${this.currentSong.image}`
        songName.textContent = this.currentSong.title;
        songArtist.textContent = this.currentSong.singer
        baseDuration.innerHTML = this.audioCalTime(this.currentSong.duration)
        audio.play()
        this.renderLyrics()
        lyricThumbnail.src = `${this.currentSong.image}`
    },
    activeSong: function () {
        const oldSong = $('.playlist__list-item.active')
        if (oldSong) {
            oldSong.classList.remove('active')
        }
        const songActive = $(`.playlist__list-item[data-id='${this.currentSong.id}']`)
        if (songActive) {
            songActive.classList.add('active')
        }
    },
    runAdvertisement: function () {
        audio.autoplay = false
        audio.pause()
        advertisement.load()
        advertisement.autoplay = true
    },
    renderLyrics: function () {
        let htmls = lyrics.map(line => `<p>${line}</p>`)

        lyricContent.innerHTML = htmls.join('')
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

        this.amount = this.config.amount || 0
        this.isAdvertisement = this.config.isAdvertisement || false
        this.isRandom = this.config.isRandom || false
        this.isRepeat = this.config.isRepeat || false
        this.isCountdown = this.config.isCountdown || false
        this.secondsTimerLeft = this.config.secondsTimerLeft || 0
        if (this.secondsTimerLeft != 0 && this.isCountdown) {
            this.countDownTimer()
        }
        this.amount = this.config.amount || 0

    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= songPlaylist.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = songPlaylist.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * songPlaylist.length)
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
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
        //RenderFirstTime playlist
        this.renderFirstTime()

        // Load cấu hình được lưu trong Local Storage
        this.loadConfig()

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        //Tải bài hát đầu tiên vào UI của ứng dụng
        // this.loadCurrentSong()

        // this.updatePlaylist(songPlaylist)

        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

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

        // Xử lý khi click play
        playBtn.onclick = () => {
            _this.setConfig('isPlaying', !_this.isPlaying)
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play
        audio.onplay = () => {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        // Khi song bị pause
        audio.onpause = () => {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        // Khi tiến độ bài hát thay đổi
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

        // Xử lý khi tua song
        progress.oninput = (e) => {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value * 100) / 100
            audio.currentTime = seekTime
            progressBar.style.width = e.target.value + '%';
        }

        // Khi next song
        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
        }

        // Khi prev song
        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
        }

        // Xử lý random bật tắt
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý phát lặp lại một song
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lý next song khi audio ended
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play()
            } else {
                if (!_this.isRandom && _this.currentIndex === (songPlaylist.length - 1)) {
                    addSongs(waitingPlaylist[0])
                    playSong(waitingPlaylist[0].id)
                } else {
                    nextBtn.click()
                }
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.playlist__list-item');
            if (songNode && !e.target.closest('.btn-dropdown-playlist-menu')) {
                // Xử lý khi click vào song
                // if (songNode) {
                // console.log('songnode')
                // audio.src = songNode.dataset.filename
                const id = Number(songNode.dataset.id)
                const currentSong = songPlaylist.find(song => song.id === id)
                _this.currentIndex = songPlaylist.indexOf(currentSong)
                // _this.currentIndex = Number(songNode.dataset.id)
                _this.loadCurrentSong()
                // }

                // Xử lý khi click vào song option
                if (e.target.closest('.btn-dropdown-playlist-menu')) {

                }
            }
        }

        // Thay đổi âm lượng audio
        audioVolume.oninput = (e) => {
            const volume = e.target.value / 100
            audio.volume = volume
            _this.setConfig('volume', volume)
        }

        // Set timer cho trình phát nhạc
        setTimerBtn.onclick = () => {
            clearInterval(_this.timer)
            _this.secondsTimerLeft = timerSelect.value * 60;
            _this.countDownTimer()
            _this.closeTimer()
        }

        // Tắt trình countdown
        cancelTimerLayout.onclick = () => {
            _this.closeTimer()
        }

        // Xóa timer countdown
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
        $('.set-timer').classList.remove('show')
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
        cdThumb.src = `${this.currentSong.image}`
        songName.textContent = this.currentSong.title;
        songArtist.textContent = this.currentSong.singer
        baseDuration.innerHTML = this.audioCalTime(this.currentSong.duration)
        if (this.isPlaying) {
            audio.load()
            audio.autoplay = true
        }
        this.renderLyrics()
        lyricThumbnail.src = `${this.currentSong.image}`
    },
    activeSong: function () {
        const oldSong = $('.playlist__list-item.active')
        if (oldSong) {
            oldSong.classList.remove('active')
        }
        const songActive = $(`.playlist__list-item[data-id='${this.currentSong.id}']`)
        if (songActive) {
            songActive.classList.add('active')
        }
    },
    renderLyrics: function () {
        let htmls = lyrics.map(line => `<p>${line}</p>`)

        lyricContent.innerHTML = htmls.join('')
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
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = songPlaylist.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * songPlaylist.length)
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
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
        //RenderFirstTime playlist
        this.renderFirstTime()

        // Load cấu hình được lưu trong Local Storage
        this.loadConfig()

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        //Tải bài hát đầu tiên vào UI của ứng dụng
        // this.loadCurrentSong()

        // this.updatePlaylist(songPlaylist)

        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

if (isPremium) {
    appPremium.start()
} else {
    app.start()
}
function renderSong(data) {
    const song = new Song(data.id, data.title, data.singer, data.path, data.image, data.duration)
    playlist.appendChild(song.elements.root)
}

function updatePlaylist(localKey, data) {
    localStorage.setItem(localKey, JSON.stringify(data))
}

function findSong(songId) {
    return songPlaylist.find(song => song.id === songId) || null
}

function removePlaylist() {
    songPlaylist = []
    updatePlaylist(PLAYLIST_STORAGE_KEY, songPlaylist)
}

function replaceNewPlaylist(playlist) {
    removePlaylist()
    $('.playlist__list').innerHTML = ""
    addSongs(playlist)
    playSong(playlist[0].id)
}

function addSongToWaiting(song) {
    waitingPlaylist[0] = song
    updatePlaylist(WAITING_PLAYLIST_STORAGE_KEY, waitingPlaylist)
}

function addSongs(songs) {
    if (Array.isArray(songs)) {
        songs.forEach(song => {
            checkSongRender(song)
        })
    } else {
        checkSongRender(songs)
    }
}

function checkSongRender(song) {
    const newSong = findSong(song.id);
    if (!newSong) {
        songPlaylist.push(song)
        renderSong(song)
        updatePlaylist(PLAYLIST_STORAGE_KEY, songPlaylist)
    }
}

function deleteSong(songId) {
    const song = findSong(songId)
    if (song) {
        const htmlEl = playlist.querySelector(`.playlist__list-item[data-id='${songId}']`)
        if (htmlEl) {
            htmlEl.remove()
        }
        playlist.splice(songs.indexOf(song), 1)
        updatePlaylist(songPlaylist)
        const songActive = playlist.querySelector('.playlist__list-item.active')
        if (songActive) {
            const currentSong = findSong(songActive.dataset.id)
            if (currentSong) app.currentIndex = songPlaylist.indexOf(currentSong)
        }
    }
}

function playSong(songId) {
    const currentSong = findSong(songId)
    if (isPremium) {
        appPremium.currentIndex = songPlaylist.indexOf(currentSong)

        appPremium.loadCurrentSong()
    } else {
        app.currentIndex = songPlaylist.indexOf(currentSong)

        app.loadCurrentSong()
    }
}

// Save waiting songs
// updatePlaylist(WAITING_PLAYLIST_STORAGE_KEY, waitingPlaylist)

// addSongs(waitingPlaylist)

// TESTING

// const playAudioBtn = $('.play-audio-btn')
// if(playAudioBtn){
//     playAudioBtn.addEventListener('click', ()=>{
//         const currentSong = songPlaylist.find(song => song.id === 3)
//         app.currentIndex = songPlaylist.indexOf(currentSong)
//         app.loadCurrentSong()
//     })
// }

// replaceNewPlaylist(waitingPlaylist)