const router = require('express').Router()
const db = require('../models')
const places = require('../models/places.js')

router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id)
    .populate('comments')
    .then(place => {
        console.log(place.comments)
        res.render('places/show', { place })
    })
    .catch(err => {
        console.log(err)
        res.render('error404')
    })
})

router.post ('/', (req, res) => {
    db.Place.create(req.body)
    .then(() => {
        res.redirect('/places')
    })
    .catch(err => {
        if (err && err.name == 'ValidationError') {
            let message = 'Validation Error: '
            for (var field in err.errors) {
                message += `${field} was ${err.errors[field].value}.`
                message +=`${err.errors[field].message}`
            }
            console.log('Validation error message', message)
            res.render('places/new', { messsage })
        }
        else {
            res.render('error404')
        }
        console.log('err', err)
        res.render('error404')
    })
})

router.post('/:id/comment', (req, res) => {
    console.log(req.body)
    if (req.body.rant) {
        req.body.rant = true
    }
    else {
        req.body.rant = false
    }
    req.body.rant = req.body.rant ? true : false
    res.send ('GET /places/:id/comment stub')
})

router.post('/:id/comment', (req, res) => {
    console.log(req.body)
    db.Place.findById(req.params.id)
    .then (place => {
        db.Comment.create(req.body)
        .then(comment => {
             place.comments.push(comment.id)
             place.save()
             .then(() => {
                res.redirect(`/places/${req.params.id}`)
             })
        })
        .catch(err => {
            res.render('error404')
        })
    })
    .catch(err => {
        res.render('error404')
    })
})

//GET /places
router.get('/', (req, res) => {
    res.render('places/index', { places })
} ) 

router.get('/new', (req, res) => {
    res.render('places/new')
})

router.get('/', (req, res) => {
    res.send('GET /places stub')
})

router.get('/:id/edit', (req, res) => {
    db.Place.findById(req.params.id)
    .then(place => {
        res.render('places/edit', { place })
    })
    .catch(err => {
        res.render('error404')
    })
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
})

router.get('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    }
    else if (places[id]) {
        res.render('error404')
    }
    else {
    res.render('places/show', { place: places[id], id })
    }
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
    res.send('POST/places stub')
})

router.put('/:id', (req, res) => {
    db.Place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.redirect(`/places/${req.params.id}`)
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})

router.put('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    }
    else if (!places[id]) {
        res.render('error404')
    }
    else {
        //Dig into req.body and make sure data is valid
       
        if(!req.body.city) {
            req.body.city='Anytown'
        }
        if(!req.body.state) {
            req.body.state='USA'
        }
    } 
    
        places[id] = req.body
        res.redirect(`/places/${id}`)
    
})

router.delete('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNan(id)) {
        res.render('error404')
    }
    else if (!places[id]) {
        res.render('error404')
    }
    else {
        places.splice(id, 1)
        res.redirect('/places')
    }
})

router.delete('/:id', (req, res) => {
    res.send('DELETE /places/:id STUB')
})

router.delete('/:id', (req, res) => {
    db.Place.findByIdAndDelete(req.params.id)
    .then(place => {
        res.redirect('/places')
    })
    .catch(err => {
        console.log('err', err)
        res.render('error404')
    })
})

module.exports = router 