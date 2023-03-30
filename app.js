const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')


const app = {
    currentIndex: 0,
    isplaying: false,
    songs: [
        {
            name: 'Only You',
            singer: 'The Flying Pickets',
            path: './Music/1.mp3',
            img:  './MusicIMG/1.jpg',
        },
        {
            name: 'Forget Him',
            singer: 'Shirley Kwan',
            path: './Music/2.mp3',
            img:  './MusicIMG/2.jpg',
        },
        {
            name: 'Thinking About You',
            singer: 'Wong',
            path: './Music/3.mp3',
            img:  './MusicIMG/3.jpg',
        },
        {
            name: 'Elegy To The Void',
            singer: 'Beach House',
            path: './Music/4.mp3',
            img:  './MusicIMG/4.jpg',
        },
        {
            name: 'Things In Life',
            singer: 'Dennis Brown',
            path: './Music/5.mp3',
            img:  './MusicIMG/5.jpg',
        },
        {
            name: 'California Dreamin\' ',
            singer: 'The Flying Pickets',
            path: './Music/6.mp3',
            img:  './MusicIMG/6.jpg',
        },
        {
            name: 'Killer Song',
            singer: 'Ming',
            path: './Music/7.mp3',
            img:  './MusicIMG/7.jpg',
        },
        {
            name: 'Broque 1992',
            singer: 'Michael Glasso',
            path: './Music/8.mp3',
            img:  './MusicIMG/8.jpg',
        },
    ],
    // render video ra giao diện
    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    //định nghĩa 
    defineProperties : function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    // Hàm xử lý 
    handleEvents: function(){
        const cdWidth = cd.offsetWidth
        const _this = this 
        const indexChange = _this.currentIndex

        //Quay CD
        const cdThumbAnimate = cdThumb.animate([
            { transform:'rotate(360deg)'}
        ], {
                duration: 25000,
                iterations : Infinity,
        })

        cdThumbAnimate.pause()


        // Thu nhỏ phóng to CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            if(newCdWidth < 0 ){
            cd.style.width = 0;
            } else {
            cd.style.width = newCdWidth + 'px'
            cd.style.opacity = newCdWidth/cdWidth
            }
            
         }

         // Nút play
         playBtn.onclick = function(){
            if(_this.isplaying){
                audio.pause()
            } else {
                audio.play()
            }
         }


         //Trạng thái khi đang play
         audio.onplay = function(){
            player.classList.add('playing')
            _this.isplaying= true
            _this.progress
            cdThumbAnimate.play()

         }

         //Trạng thái khi đang pause
         audio.onpause = function(){
            player.classList.remove('playing')
            _this.isplaying= false
            cdThumbAnimate.pause() 
        }

        // Cập nhật thời gian cho thanh progress
         audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = progressPercent
            }
            

            if(audio.duration === audio.currentTime){
                _this.nextSong()
                audio.play()
            }
        
        }

        // Seek 
        progress.onclick = function(e){
            const newTime = e.target.value / 100 * audio.duration
            audio.currentTime = newTime 
        }

        //Next song
        nextBtn.onclick = function(){
            _this.nextSong()
            audio.play()

        } 

        //Prev song
        prevBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        } 
        
        

        btnRepeat.onclick = function(){
            btnRepeat.classList.add('active')
        } 
        
       
    },

    // Tải bài hát hiện tại
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },

    // Xử lý next song
    nextSong: function(){
        this.currentIndex++
          if(this.currentIndex === this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    //Xử lý prev song
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0 ){
            this.currentIndex = this.songs.length  - 1 
        }
        this.loadCurrentSong()
    },



    // Hàm chạy ứng dụng
    start:function(){
        this.handleEvents()

        this.defineProperties()

        this.render()

        this.loadCurrentSong()
    },
}

app.start()



