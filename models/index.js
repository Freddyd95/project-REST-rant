require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports.Place = require('./places')
module.exports.Comment = require('./comment')

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pic: { type: String, default: 'http://placekitten.com/350/350'},
    cuisines: { type:String, required: true},
    city: { type: String, default: 'Anytown' },
    state: { type: String, default: 'USA' },
    founded: {
        type: Number,
        min: [1673, 'Surely not that old?!'],
        max: [new Date().getFullYear(), 'Hey, this year is in the future!']
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
})

placeSchema.methods.showEstablished = function() {
    return `${this.name} has been serving ${this.city}, ${this.state} since ${this.founded}.`
}

module.exports = mongoose.model('Place', placeSchema)
