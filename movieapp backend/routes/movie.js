const router = require('express').Router()
const uploadSettings = require('../uploadConfig')
const MovieController = require('../controler/movie')
const fields = uploadSettings.upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSettings.ceknull(req.files['image'])

    const  data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    MovieController.insertMovie(data)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get('/getall', (req, res) => {
    MovieController.getallmovie()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
    MovieController.getById(req.params.id)
        .then(result => res.json(result))
        .catch((err) => res.json(err))
})

router.put('/edit/:id', fields,(req, res) => {
    const imageName = uploadSettings.ceknull(req.files['image'])

    let data = JSON.parse(req.body.data)
    let changeImage = false
    if (imageName) {
        changeImage = true
        data = Object.assign(data, {
            image: imageName,
            oldImage: data.image
        })
    }

    MovieController.edit(data, req.params.id, changeImage)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
    MovieController.delete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

module.exports = router
