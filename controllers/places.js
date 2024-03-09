const router = require('express').Router()
const React = require('react')


//GET /places
app.get('/', (req, res) => {
    let places = [{
        name: 'H-Thai-ML',
        city: 'Oceanside',
        state: 'WA',
        cuisines: 'Thai, Pan-Asian',
        pic: 'http://placekitten.com/250/250'
    }, {
        name: 'Coding Cat Cafe',
        city: 'Phoenix',
        state: 'AZ',
        cuisines: 'Coffee, Bakery',
        pic: 'http://placekitten.com/250/250'
    }]

    res.render('places/index', { places })
} ) 

router.get('/new', (req, res) => {
    res.render('places/new')
})

router.get('/', (req, res) => {
    res.send('GET /places')
})

module.exports = router 