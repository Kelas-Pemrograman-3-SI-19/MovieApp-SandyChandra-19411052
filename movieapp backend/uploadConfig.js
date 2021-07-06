const multer = require('multer')
const path = require('path')
const MAX_SIZE = 20000000
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../movieapp backend/statics')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname((file.originalname)))
    }
})

const  filefilter = (req, file, cb) => {
            if (file.minetype === 'image/jpeg' || file.minetype === 'image/.pnj') {
                cb(null, true)
            } else {
                cb(null, false)
            }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_SIZE
    }
})

const ceknull = (fileUpload) => {
    if (fileUpload === undefined || fileUpload === null) {
        return null
    } else {
        return fileUpload[0].filename
    }
}

const deleteimage = (image) => {
            fs.unlinkSync(`./statics/${image}`)
}

module.exports = {multer, upload, ceknull, deleteimage}
