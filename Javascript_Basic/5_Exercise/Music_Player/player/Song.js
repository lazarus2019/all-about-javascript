export default class Song{
    constructor(id, title, singer, path, image, duration){
        this.elements = {}
        this.elements.root = Song.createRoot()
        this.elements.image = this.elements.root.querySelector('.playlist__list-item-image img')
        this.elements.title = this.elements.root.querySelector('.playlist__song-content h3')
        this.elements.singer = this.elements.root.querySelector('.playlist__song-content span')

        this.elements.root.dataset.id = id
        // this.elements.image.src = `resources/image/${image}`
        this.elements.image.src = image
        this.elements.title.textContent = title
        this.elements.singer.textContent = singer

    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <li class="playlist__list-item">
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
                    <button class="btn-dropdown-playlist-menu default-btn">
                        <i class="las la-braille audio__icon"></i>
                        <div class="dropdown__playlist-item-menu">
                <a class="dropdown-song-link favorite-link" data-favorite="true">
                    <i class="las la-heart"></i>
                    <span>Favorite</span>
                    </a>
                    <a class="dropdown-song-link">
                    <i class="las la-plus small__icon"></i>
                    <span>Add to Playlist</span>
                    </a>
                    <a class="dropdown-song-link share-link" href="abc.com">
                    <i class="las la-share small__icon"></i>
                    <span>Share</span>
                </a>
                <a class="dropdown-song-link" href="#">
                    <i class="las la-info-circle small__icon"></i>
                    <span>Song Info</span>
                    </a>
                    </div>
                    </button>
                    </li>
                    `).children[0];
    }
}