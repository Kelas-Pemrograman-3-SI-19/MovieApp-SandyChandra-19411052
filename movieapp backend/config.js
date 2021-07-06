const requestResponse = {
    gagal: (pesan) => {
        return{
            sukses: false,
            pesan: pesan
        }
    },
    sukses: (pesan) => {
        return{
            sukses: true,
            pesan: pesan
        }
    },
    serverError: {
        sukses: false,
        pesan: 'Terjadi Kesalahan Pada Server Kami'
    },
    sukseslogin: (data) => {
        return {
            sukses: true,
            pesan: 'nerhasil login',
            data: data
        }
    },
    sukseswithdata: (data) => {
        return {
            sukses: true,
            pesan: 'Berhasil Memuat Data',
            data: data
        }
    }
}
module.exports = { requestResponse }
