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
              <div class="text-h6">Data User</div>
              <div>Data Pelanggan Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
        title="Treats"
        :rows="data"
        :columns="columns"
        flat
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="namalengkap" :props="props">
              {{ props.row.namalengkap }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
        { name: 'namalengkap', align: 'left', label: 'Nama Lengkap', field: 'namalengkap', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('user/getalluser')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
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
