const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

mongoose.connect('mongodb://127.0.0.1:27017/zettacamp', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

const PlayerSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    age: Number,
    hobbies: Array,
    address: Object
})

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true}, sequence_value: { type: Number, default:0 }
})

const Player = mongoose.model('Player', PlayerSchema) // CREATE A NEW COLLECTION
const Counter = mongoose.model('Counter', CounterSchema)

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 }},
        { new:true, upsert:true}
    )

    return sequenceDocument.sequence_value

}

let players = [
    {
        "name" : "John Doe",
        "age" : 30,
        "gender" : "male",
        "hobbies" : [
            "Reading",
            "Traveling"
        ],
        "address" : {
            "street" : "123 Main St",
            "city" : "New York",
            "country" : "USA"
        }
    },
    {
        "name" : "Jane Smith",
        "age" : 28,
        "gender" : "female",
        "hobbies" : [
            "Hiking",
            "Photography"
        ],
        "address" : {
            "street" : "456 Oak Ave",
            "city" : "Los Angeles",
            "country" : "USA"
        }
    },
    {
        "name" : "David Johnson",
        "age" : 35,
        "gender" : "male",
        "hobbies" : [
            "Cooking",
            "Gardening"
        ],
        "address" : {
            "street" : "789 Elm Blvd",
            "city" : "Chicago",
            "country" : "USA"
        }
    },
    {
        "name" : "David Johnson",
        "age" : 35,
        "gender" : "male",
        "hobbies" : [
            "Cooking",
            "Gardening"
        ],
        "address" : {
            "street" : "789 Elm Blvd",
            "city" : "Chicago",
            "country" : "USA"
        }
    },
    {
        "name" : "Sarah Davis",
        "age" : 22,
        "gender" : "female",
        "hobbies" : [
            "Dancing",
            "Painting"
        ],
        "address" : {
            "street" : "101 Pine Ln",
            "city" : "San Francisco",
            "country" : "USA"
        }
    },
    {
        "name" : "Michael Lee",
        "age" : 27,
        "gender" : "male",
        "hobbies" : [
            "Playing Guitar",
            "Cycling"
        ],
        "address" : {
            "street" : "202 Cedar Dr",
            "city" : "Seattle",
            "country" : "USA"
        }
    },
    {
        "name" : "Amanda Wilson",
        "age" : 29,
        "gender" : "female",
        "hobbies" : [
            "Yoga",
            "Reading"
        ],
        "address" : {
            "street" : "303 Maple Ct",
            "city" : "Boston",
            "country" : "USA"
        }
    },
    {
        "name" : "Robert Brown",
        "age" : 33,
        "gender" : "male",
        "hobbies" : [
            "Playing Soccer",
            "Travelling"
        ],
        "address" : {
            "street" : "404 Birch Pl",
            "city" : "Dallas",
            "country" : "USA"
        }
    },
    {
        "name" : "Emily Taylor",
        "age" : 26,
        "gender" : "female",
        "hobbies" : [
            "Singing",
            "Swimming"
        ],
        "address" : {
            "street" : "505 Walnut Rd",
            "city" : "Miami",
            "country" : "USA"
        }
    },
    {
        "name" : "James Anderson",
        "age" : 31,
        "gender" : "male",
        "hobbies" : [
            "Playing Chess",
            "Writing"
        ],
        "address" : {
            "street" : "606 Fir Ave",
            "city" : "Houston",
            "country" : "USA"
        }
    },
    {
        "name" : "Olivia Jackson",
        "age" : 24,
        "gender" : "female",
        "hobbies" : [
            "Photography",
            "Hiking"
        ],
        "address" : {
            "street" : "707 Pine St",
            "city" : "Phoenix",
            "country" : "USA"
        }
    },
    {
        "name" : "Daniel Evans",
        "age" : 34,
        "gender" : "male",
        "hobbies" : [
            "Playing Piano",
            "Cooking"
        ],
        "address" : {
            "street" : "808 Cedar Blvd",
            "city" : "Atlanta",
            "country" : "USA"
        }
    },
    {
        "name" : "Sophia Martinez",
        "age" : 25,
        "gender" : "female",
        "hobbies" : [
            "Painting",
            "Running"
        ],
        "address" : {
            "street" : "909 Elm Ct",
            "city" : "Denver",
            "country" : "USA"
        }
    },
    {
        "name" : "Matthew Taylor",
        "age" : 32,
        "gender" : "male",
        "hobbies" : [
            "Gaming",
            "Traveling"
        ],
        "address" : {
            "street" : "1010 Birch Rd",
            "city" : "San Diego",
            "country" : "USA"
        }
    },
    {
        "name" : "Matthew Taylor",
        "age" : 32,
        "gender" : "male",
        "hobbies" : [
            "Gaming",
            "Traveling"
        ],
        "address" : {
            "street" : "1010 Birch Rd",
            "city" : "San Diego",
            "country" : "USA"
        }
    },
    {
        "name" : "Isabella Davis",
        "age" : 23,
        "gender" : "female",
        "hobbies" : [
            "Dancing",
            "Reading"
        ],
        "address" : {
            "street" : "111 Pine Dr",
            "city" : "Portland",
            "country" : "USA"
        }
    },
    {
        "name" : "Ethan Clark",
        "age" : 28,
        "gender" : "male",
        "hobbies" : [
            "Playing Guitar",
            "Cycling"
        ],
        "address" : {
            "street" : "1212 Maple Ave",
            "city" : "Minneapolis",
            "country" : "USA"
        }
    },
    {
        "name" : "Mia Rodriguez",
        "age" : 27,
        "gender" : "female",
        "hobbies" : [
            "Yoga",
            "Painting"
        ],
        "address" : {
            "street" : "1313 Cedar Ln",
            "city" : "Las Vegas",
            "country" : "USA"
        }
    },
    {
        "name" : "Ava Taylor",
        "age" : 26,
        "gender" : "female",
        "hobbies" : [
            "Singing",
            "Swimming"
        ],
        "address" : {
            "street" : "1515 Fir Rd",
            "city" : "Philadelphia",
            "country" : "USA"
        }
    },
    {
        "name" : "Noah Johnson",
        "age" : 31,
        "gender" : "male",
        "hobbies" : [
            "Playing Chess",
            "Writing"
        ],
        "address" : {
            "street" : "1616 Pine Ave",
            "city" : "Detroit",
            "country" : "USA"
        }
    },
    {
        "name" : "Emma Smith",
        "age" : 24,
        "gender" : "female",
        "hobbies" : [
            "Photography",
            "Hiking"
        ],
        "address" : {
            "street" : "1717 Cedar St",
            "city" : "Charlotte",
            "country" : "USA"
        }
    },
    {
        "name" : "Benjamin Williams",
        "age" : 33,
        "gender" : "male",
        "hobbies" : [
            "Playing Tennis",
            "Reading"
        ],
        "address" : {
            "street" : "1818 Walnut Blvd",
            "city" : "Austin",
            "country" : "USA"
        }
    }    
]

// CREATE

const addPlayer = async () => {
    return new Promise(async (resolve, reject) => {
        try{
            for(const player of players){
                const newPlayer = new Player({
                    _id: await getNextSequenceValue('playerId'),
                    name: player.name,
                    age: player.age,
                    hobbies: player.hobbies,
                    address: player.address
                })

                await newPlayer.save()

            }

            resolve(`All players added successfully`)

        } catch (err) {
            reject(err)
        }
    })
}

app.get('/addPlayer', async (req, res) => {
    try {
        const addedPlayer = await addPlayer()

        res.json({ addedPlayer: addedPlayer})

    } catch (err){
        res.status(500).send(err)
    }
})

app.post('/player', async (req, res) => {
    try {
        const { name, age, hobbies, address } = req.body

        const newPlayer = new Player({
            _id: await getNextSequenceValue('playerId'),
            name,
            age,
            hobbies,
            address
        })
    
        await newPlayer.save()

        res.send('Player has been added.')

    } catch (err) {
        res.status(500).send(err)
    }
})

// READ

app.get('/player', async (req, res) => {
    try {
        const player = await Player.find()

        res.json(player)

    } catch (err) {
        res.status(500).send(err)
    }
})

// UPDATE

app.put('/player/:id', async (req, res) => {

    try {
        const { id } = req.params

        const { name, age, hobbies, address } = req.body
        
        await Player.findByIdAndUpdate(id, { name, age, hobbies, address }, { new: true})
        
        res.send('Profile player has been updated.')

    } catch (err) {
        res.status(500).send(err)
    }

})

// DELETE

app.delete('/player/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const deletedPlayer = await Player.findByIdAndDelete(id);

        if (!deletedPlayer) {
            return res.status(404).send('Player not found.');
        }

        res.send('Player player has been deleted.');

    } catch (err) {
        res.status(500).send(err)
    }

    
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


