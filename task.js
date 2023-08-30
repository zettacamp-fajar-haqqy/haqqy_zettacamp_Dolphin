let songs = [
    {
        title : "Closer",
        artist : "The Chainsmokers",
        duration : 205,
        genre : "Electropop" 
    },
    {
        title : "Blank Space",
        artist : "Taylor Swift",
        duration : 213,
        genre : "Country Pop" 
    },
    {
        title : "Roses",
        artist : "The Chainsmokers",
        duration : 191,
        genre : "Electropop" 
    },
    {
        title : "Love Story",
        artist : "Taylor Swift",
        duration : 208,
        genre : "Country Pop" 
    },
    {
        title : "Always",
        artist : "Bon Jovi",
        duration : 150,
        genre : "Rock" 
    },
    {
        title : "It's My Live",
        artist : "Bon Jovi",
        duration : 200,
        genre : "Country Pop" 
    },
    {
        title : "Cardigan",
        artist : "Taylor Swift",
        duration : 206,
        genre : "Rock" 
    },
    {
        title : "Don't Let Me Down",
        artist : "The Chainsmokers",
        duration : 200,
        genre : "Pop" 
    },
    {
        title : "History",
        artist : "Rich Brian",
        duration : 155,
        genre : "Hiphop" 
    },
    {
        title : "Kataomoi",
        artist : "Aimer",
        duration : 248,
        genre : "Pop" 
    },
    {
        title : "Heartache",
        artist : "ONE OK ROCK",
        duration : 200,
        genre : "Rock" 
    },
    {
        title : "Ref:rain",
        artist : "Aimer",
        duration : 250,
        genre : "Pop" 
    },
    {
        title : "Kid",
        artist : "Rich Brian",
        duration : 145,
        genre : "Hiphop" 
    },
    {
        title : "Stand Out Fit In",
        artist : "ONE OK ROCK",
        duration : 229,
        genre : "Rock" 
    },
    {
        title : "Brave Shine",
        artist : "Aimer",
        duration : 300,
        genre : "Pop" 
    },
    {
        title : "We Don't Talk Anymore",
        artist : "Charlie Puth",
        duration : 225,
        genre : "Hiphop" 
    },
    {
        title : "100 Degrees",
        artist : "Rich Brian",
        duration : 180,
        genre : "Hiphop" 
    },
    {
        title : "The Beginning",
        artist : "ONE OK ROCK",
        duration : 257,
        genre : "Rock" 
    },
    {
        title : "Radio",
        artist : "Lana Del Rey",
        duration : 200,
        genre : "Indie" 
    },
    {
        title : "Love In The Dark",
        artist : "Adele",
        duration : 215,
        genre : "Hiphop" 
    },
    {
        title : "Summertime Sadness",
        artist : "Lana Del Rey",
        duration : 234,
        genre : "Indie" 
    },
]

/* ALGORITMA UNTUK TASK 2 & 3 

1. Membuat array kosong untuk menyimpan lagu berdasarkan artist atau genre
2. Membuat Set() baru untuk mengecek apakah sebuah lagu sudah terdapat di array yang sudah dibuat
3. Apabila sebuah lagu belum terdapat pada Set() maka akan dibuatkan array baru untuk menampung lagu yang memiliki 
4. Kemudian dilakukan pengecekan terhadap masing-masing lagu pada array songs
5. Apabila terdapat kesamaan artist/genre maka lagu tersebut ditampung ke array arr (array yang baru saja dibuat)
6. Setelah semua lagu dicek maka array arr akan dipush atau dimasukkan ke array group
7. Keterangan artist/genre lagu akan dimasukkan ke Set() supaya lagu yang memiliki artist/genre yang sama akan diskip
8. Setelah semua proses selesai, maka akan ditampilkan array group yang berisi array lagu berdasarkan artist/genre
*/


function groupArtist(songs) {
    const group = [];
    const artistSet = new Set();

    for (let x = 0; x < songs.length; x++) {
        const song = songs[x];
        if (!artistSet.has(song.artist)) {
            const sameArtist = [`${song.artist}'s Song.`];
            for (let y = 0; y < songs.length; y++) {
                const item = songs[y];
                if (song.artist === item.artist) {
                    sameArtist.push(item);
                }
            }
            group.push(sameArtist);
            artistSet.add(song.artist);
        }
    }

    return group;
}

function groupGenre(songs) {
    const group = [];
    const genreSet = new Set();

    for (let x = 0; x < songs.length; x++) {
        const song = songs[x];
        if (!genreSet.has(song.genre)) {
            const sameGenre = [`These are ${song.genre} songs.`];
            for (let y = 0; y < songs.length; y++) {
                const item = songs[y];
                if (item.genre === song.genre) {
                    sameGenre.push(item);
                }
            }
            group.push(sameGenre);
            genreSet.add(song.genre);
        }
    }

    return group;
}

/* ALGORITMA UNTUK TASK 4

1. Membuat array untuk menyimpan lagu yang akan ditampilkan
2. Membuat array untuk menyimpan angka random yang akan digunakan untuk pemilihan index
3. Membuat variabel baru yang berisi total durasi lagu dari array currDura (array awal)
4. Membuat break point apabila nilai total durasi lagu melebihi 3600 detik atau 1 jam
5. Apabila nilai total durasi lagu masih dibawah 3600 detik atau 1 jam, maka
6. Membuat variabel baru untuk menyimpan angka random
7. Apabila sudah terdapat suatu angka di dalam array usedNumbers, maka
8. Angka random akan digenerate lagi, sampai angka tersebut belum ada di dalam array usedNumbers
9. Apabila ditemukan angka yang belum ada di dalam array usedNumbers, angka tersebut akan dipush ke array usedNumbers
10. Angka random tersebut digunakan sebagai penunjuk lagu array ke berapa yang akan dipush ke currentPlaylist
11. Setelah durasi mendekati 3600 detik atau 1 jam, maka perulangan dihentikan
12. Array currPlaylist akan ditampilkan beserta total durasi semua lagu yang ada di parameter songs, dan total durasi semua lagu yang ada di array currPlaylist
*/


function playlist(songs){

    const currPlaylist = []

    let usedNumbers = []

    for(let x = 0; x < songs.length; x++){

        const currDura = currPlaylist.reduce((totalDura, currentSong) => totalDura + currentSong.duration, 0) 

        if(currDura > 3600){
            currPlaylist.pop()
            break
        }
        
        if(currDura < 3600){

            let randomNumber

            do{
                randomNumber = Math.floor(Math.random() * (songs.length))
            } while(usedNumbers.includes(randomNumber))

            usedNumbers.push(randomNumber)

            currPlaylist.push(songs[randomNumber])
        }
    }

    const checkDuraPLaylist = currPlaylist.reduce((totalDura, currentSong) => totalDura + currentSong.duration, 0)
    const checkDuraAll = songs.reduce((totalDura, currentSong) => totalDura + currentSong.duration, 0)

    console.log(currPlaylist)
    console.log(usedNumbers.sort((a, b) => a -b))
    console.log(songs.length)
    console.log(currPlaylist.length)
    console.log(checkDuraPLaylist)

    return checkDuraAll
}




// console.log(groupArtist(songs))
// console.log(groupGenre(songs))
console.log(playlist(songs))



/* function groupArtist(song) {
    let temp = []

    

    // const checkArtist = new Set()

    for(let x = 0; x < song.length-1; x++){
        // checkArtist.add(song[x])
        
        // console.log(x)

        let arr = []
        
        arr.push(song[x])
    
        
        for(let y = 1; y < song.length; y++){
            
            // console.log(checkArtist)
            // console.log(arr)
            // console.log(song.lastIndexOf(song[x]))
            
            
            // console.log(x)
            
            
            
            if(song[x].artist === song[y].artist){
                console.log(arr)
                // console.log(`${song[x].artist}: ${song[x].title}  x ${song[y].artist}: ${song[y].title}`)
                // const arr = []
                if(!arr.includes(song[y]) && !temp.includes(song[y])){
                    arr.push(song[y])
                    temp.push(arr)
                } else {
                    x++
                }
                // arr.push(arr)
                // x = song.lastIndexOf((song[x]) + 1)

                
                
            }
        }
        
        // checkArtist.add(song[x].artist)

        // console.log(`ini adalah isi dari arr temp`)
        // console.log(temp)

    }
    return temp
} */

