// https://www.w3schools.com/tags/ref_av_dom.asp

/*
    Các tính năng cần thực hiện:

        1. Render songs                     - Done
        2. Scroll top                       - Done
        3. Play / Pause / Seek              - Done
        4. CD rotate                        - Done
        5. Next / Prev                      - Done
        6. Random                           - Done
        7. Loop once / Loop forever         
        8. Next / Repeat when ended         
        9. Active song                      - Done
        10. Scroll active song into view    - Done
        11. Play song when click            - Done
        12. Lưu setting config và load ra   - Done
*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_APP'

const playlist = $('.playlist')
const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const author = $('header p')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const progress = $('#progress')

const playBtn = $('.btn-toggle-play')
const btnPrev = $('.btn-prev')
const btnNext = $('.btn-next')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const btnInfinity = $('.btn-infinity')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isInfinity: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            id: 1,
            title: "Tu Phir Se Aana",
            author: "Raftaar x Salim Merchant x Karma",
            path: "https://docs.google.com/uc?export=download&id=1BXF9GlkjfHAfM3rfP0nvKvop7K43zFh8",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            id: 2,
            title: "Naachne Ka Shaunq",
            author: "Raftaar x Brobha V",
            path:
                "https://docs.google.com/uc?export=download&id=1YIS-DOrgAvVJLGJuyaJEIDnWMajHaeZG",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            id: 3,
            title: "Mantoiyat",
            author: "Raftaar x Nawazuddin Siddiqui",
            path: "https://docs.google.com/uc?export=download&id=13YF1Dez_msLjKvRRs0pw1oSuK_iH6HTM",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            id: 4,
            title: "Aage Chal",
            author: "Raftaar",
            path: "https://docs.google.com/uc?export=download&id=1VHxHLxuDGc8iYjSw7TDX__jHZxagjICB",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            id: 5,
            title: "OK im here",
            author: "Raftaar x kr$na",
            path: "https://docs.google.com/uc?export=download&id=1LaLUEWpF5Z6e9pLaZFaojEPrIcNCIn9C",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/51IK9KFLrKL.jpg"
        },
        {
            id: 6,
            title: "Feeling You",
            author: "Raftaar x Harjas",
            path: "https://docs.google.com/uc?export=download&id=1kC4OK-CMPKfHUbRgB1uRkqX6YBYpaCyd",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
    ],
    setConfig: function(key, value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-id="${song.id}">
                    <div class="thumb"
                        style="background-image: url(${song.image})">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.title}</h3>
                        <p class="author">${song.author}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })

        playlist.innerHTML = htmls.join('')
    }
    ,
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvent: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Đọc về animate: https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        // Xử lý phóng to / thu nhỏ CD
        document.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            // Trường hợp scroll quá nhanh dẫn đến newCdWidth bị âm và không gán được cho cd nên phải xét trường hợp > 0
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        })

        // Xử lý khi click play
        playBtn.addEventListener('click', () => {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        })

        // Khi song được play
        audio.addEventListener('play', () => {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        })

        // Khi song bị pause
        audio.addEventListener('pause', () => {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        })

        // Khi tiến độ bài hát thay đổi
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                let percent = Math.floor(audio.currentTime / audio.duration * 100 * 100) / 100
                progress.value = percent
            }
        })

        // Khi tua bài hát
        progress.addEventListener('input', (e) => {
            const seekTime = Math.floor(audio.duration / 100 * e.target.value * 100) / 100
            audio.currentTime = seekTime
        })

        // Khi bài hát kết thúc
        audio.addEventListener('ended', () => {
            if (_this.isRandom) {
                _this.randomSong()
            } else {
                if (!_this.isRepeat) {
                    btnNext.click()
                }else{
                    _this.isRepeat = !_this.isRepeat
                }
            }
            _this.loadCurrentSong()
            _this.scrollToActiveSong()
        })

        // Khi bật bài tiếp theo
        btnNext.addEventListener('click', () => {
            _this.nextSong()
            _this.loadCurrentSong()
            _this.scrollToActiveSong()
        })
        // Khi trở lại trước đó
        btnPrev.addEventListener('click', () => {
            _this.prevSong()
            _this.loadCurrentSong()
            _this.scrollToActiveSong()
        })

        // Khi bật/tắt chế độ random bài hat
        btnRandom.addEventListener('click', () => {
            _this.isRandom = !_this.isRandom
            btnRandom.classList.toggle('active')
            _this.setConfig('isRandom', _this.isRandom)
            _this.randomSong()
        })

        // Khi bật/tắt chế độ lặp bài hát 1 lần
        btnRepeat.addEventListener('click', () => {
            _this.isRepeat = !_this.isRepeat
            if (_this.isRepeat) {
                _this.handleInfinityRepeat()
            }
            _this.setConfig('isRepeat', _this.isRepeat)
            btnRepeat.classList.toggle('active')
        })

        // Khi bật/tắt chế độ lặp bài hát vô hạn
        btnInfinity.addEventListener('click', () => {
            _this.isInfinity = !_this.isInfinity
            if (_this.isInfinity) {
                _this.handleInfinityRepeat()
            }
            _this.setConfig('isInfinity', _this.isInfinity)
            btnInfinity.classList.toggle('active')
        })

        // Khi bấm vào playlist
        playlist.addEventListener('click', (e) => {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song
                if (songNode) {
                    const songId = parseInt(songNode.dataset.id)
                    const song = _this.songs.find(song => song.id === songId)
                    _this.currentIndex = _this.songs.indexOf(song)
                    _this.loadCurrentSong()
                }

                if (e.target.closest('.option')) {

                }
            }
        })
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.title
        author.textContent = this.currentSong.author
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
        audio.addEventListener('canplaythrough', () => {
            audio.play()
        })
        this.activeSong()
    },
    activeSong: function () {
        let songEarly = $('.song.active')
        let songNow = $(`.song[data-id="${this.currentSong.id}"]`)

        songEarly.classList.remove('active')
        songNow.classList.add('active')
    },
    prevSong: function () {
        if (this.isRandom) {
            this.randomSong()
        } else {
            if (this.currentIndex === 0) {
                this.currentIndex = this.songs.length
            } else {
                this.currentIndex--
            }
        }
    },
    nextSong: function () {
        if (this.isRandom) {
            this.randomSong()
        } else {
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            } else {
                this.currentIndex++
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 500)
    },
    randomSong: function () {
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
        } while (randomIndex === this.currentIndex)

        this.currentIndex = randomIndex
    },
    repeatSong: function () {
        audio.currentTime = 0
        audio.play()
    },
    handleInfinityRepeat: function () {
        if (this.isInfinity) {
            this.isRepeat = false
            console.log('isInfinity', this.isInfinity)
            btnRepeat.classList.remove('active')
        }

        if (this.isRepeat) {
            this.isInfinity = false
            console.log('isRepeat', this.isRepeat)
            btnInfinity.classList.remove('active')
        }
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        this.isInfinity = this.config.isInfinity
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        // Render playlist
        this.render()

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvent()

        // Tải thông tin bài hát đầu tiên
        this.loadCurrentSong()

        // Hiển thị trạng thái ban đầu của button repeat, random, infinity
        btnRandom.classList.toggle('active', this.isRandom)
        btnRepeat.classList.toggle('active', this.isRepeat)
        btnInfinity.classList.toggle('active', this.isInfinity)
    }
}

app.start()