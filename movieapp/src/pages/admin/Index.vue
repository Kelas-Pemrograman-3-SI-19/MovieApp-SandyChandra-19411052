<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue">

            </div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Transaksi</div>
              <div>Data transaksi pembelian dan pemesanan</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="bg-grey-2">
        <q-table
          :rows="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="judulfilm" :props="props">
                {{ props.row.datamovie[0].judulfilm }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="namalengkap" :props="props">
                {{ props.row.datauser[0].namalengkap }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="warning" class="q-pa-sm">
                  Belum di Konfirmasi
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="green" class="q-pa-sm">
                  Sedang Dalam Pengiriman ke-{{ props.row.datauser[0].namalengkap }}
                </q-badge>
                <q-badge v-else color="blue" class="q-pa-sm">
                  Diterima Oleh {{ props.row.datauser[0].namalengkap }}
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" @click="openDetail(props.row)" unelevated color="accent"/>
                <q-btn :disable="props.row.status !== 1 " label="Confirmation" @click="confirm(props.row._id)" class="q-ml-sm" unelevated color="green"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detail Order</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-caption">
                Nama Pembeli
              </div>
              <div class="text-weight-bold">
                {{ activeData.datauser[0].namalengkap }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Judul Film
              </div>
              <div class="text-weight-bold">
                {{ activeData.datamovie[0].judulfilm }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Harga
              </div>
              <div class="text-weight-bold">
                {{ activeData.harga }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Jumlah
              </div>
              <div class="text-weight-bold">
                {{ activeData.jumlah }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Total
              </div>
              <div class="text-weight-bold">
                {{ activeData.total }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="text-h6 q-mt-md">Bukti Pembayaran</div>
            <q-img :src="`${$baseImageURL}/${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'judulfilm', align: 'left', label: 'Nama Film', field: 'judulfilm', sortable: true },
        { name: 'harga', align: 'center', label: 'Harga', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Jumlah', field: 'jumlah', sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
        { name: 'namalengkap', align: 'center', label: 'Nama', field: 'namalengkap', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/order/getallorder')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda yakin Mengkonfirmasi Order?',
        cancel: true,
        color: 'accent',
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/konfirmasiorder/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}

</script>
<style scoped>
.left {
  width: 5px;
  height: 100%;
  background-color: #008c75;
}
</style>
