const router = require('express').Router()
const places = require('../models/places.js')


//GET /places
router.get('/', (req, res) => {
    res.render('places/index', { places })
} ) 

router.get('/new', (req, res) => {
    res.render('places/new')
})

router.get('/', (req, res) => {
    res.send('GET /places')
})

router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.pic) {
        //Default image if one is not provided
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.cit) {
        req.body.city = 'Anytown'
    }
    if(!req.body.state) {
        req.body.state = 'USA'
    }
    places.push(req.body)
    places.redirect('/places')
    res.send('POST/places')
})

router.get('/:id/edit', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    }
    else if (!places[id]) {
        res.render('error404')
    }
    else {
        res.render('places/edit', { place: places[id] })
    }
    res.render('places/edit')
})

module.exports = router 