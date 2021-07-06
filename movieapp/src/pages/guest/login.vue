<template>
  <q-layout class="bg-blue-grey-1" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
            <q-card flat class="text-blue-grey-14">
              <div class="row items-center">
                <div class="col-md-6 col-sm-12-col-xs-12">
                  <div class="row q-pt-md q-pb-md">
                    <div class="col-md-8 offset-md-2">
                      <q-img src="../../statics/login.svg"></q-img>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 q-mt-md">
                  <q-card-sections>
                    <div class="text-h4">Movie App</div>
                    <div>Login Akun Anda</div>
                  </q-card-sections>
                  <q-form
                    @submit="login"
                  >
                    <q-card-section>
                      <q-input v-model="username" label="Username"/>
                      <q-input type="password" v-model="password" label="Password"/>
                    </q-card-section>
                    <q-card-section>
                      <q-btn class="full-width" type="submit" unelevated color="primary" label="Login"/>
                      <q-btn class="full-width q-mt-md" :to="{ name: 'registerpage'}" flat unelevated color="primary" label="Register"/>
                    </q-card-section>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('/user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('datauser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardadmin' })
          } else {
            this.$router.push({ name: 'homeuser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
