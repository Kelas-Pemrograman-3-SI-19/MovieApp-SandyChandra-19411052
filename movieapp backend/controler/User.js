const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const { requestResponse } = require('../config')

exports.register = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then(user => {
            if (user) {
                resolve(requestResponse.gagal('Username Sudah Terdaftar'))
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {
                    data.password = hash
                    userModel.create(data)
                        .then(() => resolve(requestResponse.sukses('Berhasil Registrasi Akun')))
                        .catch(() => reject(requestResponse.serverError))
                })
            }
        })
    })

exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then((user) => {
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    resolve(requestResponse.sukseslogin(user))
                } else {
                    reject(requestResponse.gagal('Password Salah'))
                }
            } else {
                reject(requestResponse.gagal('Username Tidak Terdaftar'))
            }
        })
    })

exports.getAllUser = () =>
    new Promise(((resolve, reject) => {
        userModel.find({
            level: 2
        }).then(user => {
            resolve(requestResponse.sukseswithdata(user))
        }).catch(() => reject(requestResponse.serverError))
    }))
