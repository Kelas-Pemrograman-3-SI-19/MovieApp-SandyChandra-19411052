const orderModel = require('../model/order')
const { requestResponse } = require('../config')
const objectId  = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject) => {
        try {
            orderModel.create(data)
                .then(() => resolve(requestResponse.sukses('Berhasil Memproses Transaksi')))
                .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.getAllOrder = () =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "idFilm",
                    foreignField: "_id",
                    as: "datamovie"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "datauser"
                }
            }
        ]).then(res => {
            resolve(requestResponse.sukseswithdata(res))
        }).catch(err => reject(requestResponse.serverError))
    })

exports.getOrderByUser = (id) =>
    new Promise((resolve, reject) => {
            orderModel.aggregate([
                {
                    $match: {
                        idUser: objectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "movies",
                        localField: "idFilm",
                        foreignField: "_id",
                        as: "datamovie"
                    }
                }
            ]).then(res => {
                resolve(requestResponse.sukseswithdata(res))
            }).catch(err => reject(requestResponse.serverError))
    })

exports.konfirmasiOrder = (id) =>
    new Promise((resolve, reject) => {
        try {
            orderModel.updateOne({
                    _id: objectId (id)
                },
                {
                    status: 2
                }).then(() => resolve(requestResponse.sukses('Order Confirmation is Successful')))
                .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.terimaBarang = (id) =>
    new Promise((resolve, reject) => {
        try {
            orderModel.updateOne({
                    _id: objectId (id)
                },
                {
                    status: 3
                }).then(() => resolve(requestResponse.sukses('You Have Received Your Order')))
                .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })
