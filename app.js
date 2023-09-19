const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

mongoose.connect('mongodb://127.0.0.1:27017/songs', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

const SongSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    artist: String,
    duration: Number,
    genre: String
})

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true}, sequence_value: { type: Number, default:0 }
})

const Song = mongoose.model('Song', SongSchema)
const Counter = mongoose.model('Counter', CounterSchema)

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 }},
        { new:true, upsert:true}
    )

    return sequenceDocument.sequence_value

}

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

// CREATE

const addSong = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            for(const song of songs){
                const newSong = new Song({
                    _id: await getNextSequenceValue('songId'),
                    title: song.title,
                    artist: song.artist,
                    duration: song.duration,
                    genre: song.genre
                })

                await newSong.save()

            }

            resolve(`All songs added successfully`)

        } catch (err) {
            reject(err)
        }
    })
}

app.get('/addSong', async (req, res) => {
    try {
        const addedSong = await addSong()

        res.json({ addedSong: addedSong})

    } catch (err){
        res.status(500).send(err)
    }
})


app.post('/song', async (req, res) => {
    try {
        const { title, artist, duration, genre } = req.body

        const newSong = new Song({
            _id: await getNextSequenceValue('songId'),
            title,
            artist,
            duration,
            genre
        })
    
        await newSong.save()

        res.send('Song has been added.')

    } catch (err) {
        res.status(500).send(err)
    }
})

// READ

app.get('/song', async (req, res) => {
    try {
        const song = await Song.find()

        res.json(song)

    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE

app.put('/song/:id', async (req, res) => {

    try {
        const { id } = req.params.id
        const { title, artist } = req.body
        
        await Song.findByIdAndUpdate(id, { title, artist }, { new: true})
        
        res.send('Song has been updated.')

    } catch (err) {
        res.status(500).send(err)
    }

})

// DELETE

app.delete('/song/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const deletedSong = await Song.findByIdAndDelete(id);

        if (!deletedSong) {
            return res.status(404).send('Song not found.');
        }

        res.send('Song has been deleted.');

    } catch (err) {
        res.status(500).send(err)
    }

    
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


