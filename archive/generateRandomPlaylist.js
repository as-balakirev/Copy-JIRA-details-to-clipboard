function Album (name, artist, released) {
    this.name = name;
    this.artist = artist;
    this.released = released;
    this[Symbol.toPrimitive] = function (hint) {
        return `${artist} - ${name} - ${released}`;
    };
}


/**
 * @param {Album} album - takes an object as a parameter
 */
function Song (name, length, album) {
    this.name = name;
    this.length = length;
    this.album = album;
    this[Symbol.toPrimitive] = function (hint) {
        return `${name} - ${length} - ${album}`;
    };
}


function Playlist (songs) {
    this.songs = songs || [];
    this.oneAlbum = function(albumIndex) {
        return this.songs.filter(item => item.album.name == 'albumName' + albumIndex);
    }
    this.numberOfAlbums = function() {
        let counter = 1;
        let albumsArray = this.songs.map(item => item.album.name);
/*       for (let i = 0; i < this.songs.length; i++) {
            albumsArray.push(this.songs[i].album.name);
        }*/
        albumsArray.sort(((a, b) => a > b ? 1 : -1));
        let albumValue = albumsArray[0];
        for (let i = 0; i < albumsArray.length; i++ ){
            if (albumValue == albumsArray[i]) {
                continue;
            }
            albumValue = albumsArray[i];
            counter++;
        }
        return counter;
    }
}


/**
 * @param {number} numberOfAlbums - any 
 * @param {Playlist} playlist 
 */
function generateSongs(numberOfAlbums, playlist) {
    for (let i = 0; i < numberOfAlbums; i++) {
        let albumName = new Album('albumName' + i, 'artist' + i, 2000 + +i);
        for (let x = 0; x < 11; x++) {
            let song = new Song('songName' + x, (3.11 + x/100).toFixed(2), albumName);
            playlist.songs.push(song);
        }
    }
}


/**
 * @param {number} numberOfAlbums - should be updated to be a playlist method
 * @param {Playlist} playlist - object playlist with ALL songs 
 */
function getRandomPlaylist(playlist) {
    let randomPlaylist = [];
    for (let i = 0; i < playlist.numberOfAlbums(); i++) {  //playlist.numberOfAlbums() instead of numberOfAlbums
        let album = playlist.oneAlbum(i);
        for (let x = 0; x < 4; x++) {
            let index = Math.round(Math.random() * (album.length - 1));
            randomPlaylist.push(album[index]);
            album.splice(index, 1);
        }
    }
    return randomPlaylist;
}


let playlist = new Playlist();
generateSongs(16, playlist);
console.log(getRandomPlaylist(playlist));

