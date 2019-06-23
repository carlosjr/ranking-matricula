<template>
  <q-layout class="bg-blue-10">
    <div class="row justify-center">
      <img alt="Wizards logo" src="~assets/logo-wizards2.png" style="width:250px; height:250px">
    </div>
    <div class="row justify-center" style="min-width: 200px;">
        <q-card class="text-blue col-8 col-sm-4 col-xs-4">
          <q-card-section>
            <div class="text-h6 text-blue-10">Login</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <q-input rounded filled v-model="user.email" label="Email"/>
              <q-input type="password" square filled v-model="user.password" label="Senha"/>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat class="text-blue-10" @click="authenticate">ENTRAR</q-btn>
          </q-card-actions>
        </q-card>
      <div>
      </div>
    </div>
    <div class="row justify-center bg-blue-10">
            <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
              <img alt="Wizards logo" src="~assets/logo-buritis.jpeg" style="width:160px; height:150px" class="q-pa-sm">
              <img alt="Wizards logo" src="~assets/logo-orlando.jpeg" style="width:160px; height:150px" class="q-pa-sm">
              <img alt="Wizards logo" src="~assets/logo-vila.jpeg" style="width:160px; height:150px" class="q-pa-sm">
      </div>
  </q-layout>
</template>

<script>
import { HTTP } from '../boot/axios';

export default {
  name: 'MyLayout',
  data() {
    return {
      user: {}
    };
  },

  mounted() {
    // this.user.email = localStorage.getItem('user-login')
  },

  methods: {
    authenticate() {
      HTTP.post('token', this.user)
        .then((response) => {
          console.log(response);
          this.data = response.data;
          localStorage.setItem('user-token', response.data.token)
          localStorage.setItem('user-login', this.user.email)
          localStorage.setItem('user-id', response.data.id_user)
          localStorage.setItem('user-role', response.data.role)
          this.$router.push('/view')
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
};
</script>

<style>
  .q-item.q-router-link--active, .q-item--active{
    color: #0D47A1;
  }
</style>
