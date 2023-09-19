const Counter = require('../model/counter')

async function resetId(){
    try {
        const counter = await Counter.findOne()

        if(counter){
            counter.sequence_value = 0

            await counter.save()

            console.log(`Reset ID successfully.`)

        } else {
            console.log(`Counter Document is not found`)
        }

    } catch (error) {
        console.error(error)
    }
}

async function modifiedId(){
    try {
        const result = await Counter.findOneAndUpdate({}, { $inc: { sequence_value: -1 } }, { new: true });

        if(result){

            await result.save()

            console.log(`ID is back to ${result.sequence_value}.`)

        } else {
            console.log(`Counter Document is not found`)
        }

    } catch (error) {
        console.error(error)
    }
}

module.exports = { 
    resetId, 
    modifiedId
}