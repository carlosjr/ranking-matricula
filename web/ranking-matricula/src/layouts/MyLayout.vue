<template>
  <q-layout view="hHh Lpr lFf" class="bg-blue-10">
    <q-header elevated class="bg-red-7">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title class="text-uppercase text-weight-bold">
          RANKING
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer reveal >
          <q-toolbar class="row justify-center bg-blue-10">
            <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
              <img alt="Wizards logo" src="~assets/logo-buritis.jpeg" style="width:120px; height:100px" class="q-pa-sm">
              <img alt="Wizards logo" src="~assets/logo-orlando.jpeg" style="width:100px; height:100px" class="q-pa-sm">
              <img alt="Wizards logo" src="~assets/logo-vila.jpeg" style="width:120px; height:100px" class="q-pa-sm">
          </q-toolbar>
        </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-red-7 text-h6 text-white"
    >
      <q-list>
        <q-item-label header class="text-h6 text-white text-uppercase text-weight-bold">Menu administrativo</q-item-label>
        <q-item clickable to="/view/enrollment" v-if="util.hasRoles('NIVEL1,NIVEL2')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Matricular</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/view/ranking" v-if="util.hasRoles('NIVEL1,NIVEL2,NIVEL3')">
          <q-item-section avatar>
            <q-icon name="trending_up" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ranking</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/view/students" v-if="util.hasRoles('NIVEL1,NIVEL2')">
          <q-item-section avatar>
            <q-icon name="contacts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Alunos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/view/users" v-if="util.hasRoles('NIVEL1')">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Usuários</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { utils } from '../boot/utilsDev'

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      util: utils
    };
  },
  methods: {
    openURL,

    logout() {
      localStorage.removeItem('user-token')
      this.$router.push('/login')
    }
  },
};
</script>

<style>
  .q-item.q-router-link--active, .q-item--active{
    color: #0D47A1;
  }

  .q-table__title {
    color: #1244a7 !important;
    font-weight: bold;
  }
</style>
