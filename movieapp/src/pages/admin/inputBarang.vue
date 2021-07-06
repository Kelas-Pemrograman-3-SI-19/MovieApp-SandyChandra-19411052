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
              <div class="text-h6">Input DVD</div>
              <div>Input Data DVD Film Baru</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section class="row">
        <q-form
          @submit="onSubmit()"
          class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
        >
          <q-input
            filled
            v-model="form.judulfilm"
            label="Judul Film"
            hint="Masukan Judul Film"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Silahkan Isi Judul Film']"
          />
          <q-input
            filled
            v-model="form.harga"
            type="number"
            label="Harga Film"
            hint="Masukan Harga Film"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Silahkan Isi Harga Film']"
          />
          <q-input
            filled
            v-model="form.tahun"
            label="tahun Film"
            hint="Masukan Tahun Film"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Silahkan Isi Tahun Film']"
          />
          <q-select
            filled
            v-model="form.genre"
            :options="optiongenre"
            label="Pilih Genre"
          />
          <div class="flex">
            Pilih Rating
            <q-rating
              v-model="form.rating"
              size="2em"
              :max="5"
              class="q-ml-md"
              color="orange"
            />
          </div>
          <q-input
            v-model="form.deskripsi"
            label="Deskripsi"
            filled
            type="textarea"
          />
          <q-file
            color="primary"
            filled
            v-model="image"
            accept=".jpg, image/*"
            label="Upload Gambar">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        judulfilm: null,
        harga: 0,
        tahun: null,
        genre: null,
        rating: 0,
        deskripsi: null
      },
      optiongenre: [
        'Action',
        'Anime',
        'Adventure',
        'Comdey',
        'Drama',
        'Fantasy',
        'Family',
        'Sci-Fi'
      ],
      image: null
    }
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('movie/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
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
