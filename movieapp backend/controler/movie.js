const  movieModel = require('../model/movie')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteimage } = require('../uploadconfig')

exports.insertMovie = (data) =>
    new Promise((resolve, reject) => {
        movieModel.create(data)
            .then(() => resolve(requestResponse.sukses('Movie Succesfuly Added')))
            .catch(() => reject(requestResponse.serverError))
    })

exports.getallmovie = () =>
    new Promise((resolve, reject) => {
        movieModel.find({})
            .then(movie => resolve(requestResponse.sukseswithdata(movie)))
            .catch(error => reject(requestResponse.serverError))
    })

exports.getById = (id) =>
    new Promise((resolve, reject) => {
        movieModel.findOne({
            _id: objectId(id)
        }).then(movie => resolve(requestResponse.sukseswithdata(movie)))
            .catch(error => reject(requestResponse.serverError))
    })

exports.edit = (data, id, changeimage) =>
    new Promise((resolve, reject) => {
        movieModel.updateOne({
            _id: objectId(id)
        }, data)
            .then(() =>{
                if (changeimage) {
                    deleteimage(data.oldImage)
                }
                resolve(requestResponse.sukses('Berhasil Edit Data Film'))
            }).catch(() => reject(requestResponse.serverError))
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        movieModel.findOne({
            _id: objectId(id)
        }).then(movie => {
            movieModel.deleteOne({
                _id: objectId(id)
            }).then(() => {
                deleteimage(movie.image)
                resolve(requestResponse.sukses('Berhasil Hapus Film'))
            }).catch(() => reject(requestResponse.serverError))
        })
    })
