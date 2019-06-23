<template>
  <q-page class="flex flex-center">
    <div class="col q-pa-md">
      <!-- <div class="row justify-center">
        <img alt="Wizards logo" src="~assets/logo-wizards2.png" style="width:250px; height:250px">
      </div> -->
      <div class="row justify-center">
        <div class="q-mb-md col col-xs-10 col-sm-10">
          <q-table
            title="Usuários"
            :data="data"
            :columns="columns"
            row-key="name">

             <q-tr slot="header" slot-scope="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-blue-10">
                {{ col.label }}
              </q-th>
            </q-tr>
            <template slot="body" slot-scope="props" :props="props">
              <q-tr :props="props">
                <q-td key="id" :props="props" >{{ props.row.id}}</q-td>
                <q-td key="name" :props="props" >{{ props.row.name}}</q-td>
                <q-td key="email" :props="props" >{{ props.row.email}}</q-td>
                <q-td key="role" :props="props" >{{ props.row.role}}</q-td>
                <q-td >
                  <q-btn class="cursor-pointer" small flat icon="edit" @click="getUserById(props.row.id)"/>
                  <q-btn class="cursor-pointer" small flat icon="delete" @click="deleteById(props.row.id)"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <q-card class="q-pa-md text-blue col-10">
          <q-card-section>
            <div class="text-h6 text-blue-10">Novo Usuário</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <q-input rounded filled v-model="user.name" label="Nome"/>
              <q-input square filled v-model="user.email" label="Email"/>
              <q-select square filled v-model="user.role" :options="roles" label="Cargo" />
              <q-input type="password" square filled v-model="user.password" label="Senha"/>
              <q-input type="password" square filled v-model="confirmPassword" label="Confirmar senha"/>
            </div>
          </q-card-section>

          <q-separator dark/>

          <q-card-actions>
            <q-btn flat class="text-blue-10" @click="saveUser">Salvar</q-btn>
             <q-btn flat class="text-blue-10" @click="newUser">Novo</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import moment from 'moment';
import { HTTP } from '../boot/axios';
import { utils } from '../boot/utilsDev'

export default {
  name: 'PageIndex',

  data() {
    return {
      user: {},
      confirmPassword: '',
      roles: ['NIVEL1', 'NIVEL2', 'NIVEL3'],
      columns: [
        { name: 'id', label: 'Código', field: 'id', sortable: true, align: 'left' },
        { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
        { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
        { name: 'role', label: 'Cargo', field: 'role', sortable: true, align: 'left' }
      ],
      data: []
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    newUser() {
      this.user = {}
      this.confirmPassword = ''
    },

    saveUser() {
      console.log(this.user.dt_birth, moment(this.user.dt_birth, 'DD/MM/YYYY'))

      if (!this.user.email) {
        utils.notify.warn('Campo Email deve ser preenchido!')
        return
      }

      if (!this.user.password) {
        utils.notify.warn('Campo Senha deve ser preenchido!')
        return
      }

      if (this.confirmPassword !== this.user.password) {
        utils.notify.warn('Campo Senha e Confirmar senha devem ser iguais!')
        return
      }

      this.user.dt_birth = moment(this.user.dt_birth, 'DD/MM/YYYY')

      if (!this.user.id) {
        HTTP.post('users', this.user)
          .then((response) => {
            console.log(response);
            this.user = {}
            this.confirmPassword = ''
            this.getUsers()
            utils.notify.success('Usuário cadastrado!')
          })
          .catch((error) => {
            console.log(error);
            utils.notify.error('Usuário não cadastrado! ' + error)
          })
      } else {
        HTTP.post(`users/update/${this.user.id}`, this.user)
          .then((response) => {
            console.log(response);
            this.user = {}
            this.confirmPassword = ''
            this.getUsers()
            utils.notify.success('Usuário atualizado!')
          })
          .catch((error) => {
            console.log(error);
            utils.notify.error('Usuário não atualizado! ' + error)
          })
      }


    },

    getUsers() {
      HTTP.get('users', {})
        .then((response) => {
          console.log(response);
          this.data = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    },

    getUserById(id) {
      HTTP.get(`users/${id}`, {})
        .then((response) => {
          this.user = response.data || {}
          if (this.user) {
            delete this.user.password
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          utils.notify.error(error)
        })
    },

    deleteById(id) {
      this.$q.dialog({
        dark: true,
        title: 'Atencão',
        message: 'Deseja realmente excluir o usuário?',
        cancel: 'Cancelar',
        persistent: true
      }).onOk(() => {
        HTTP.post(`users/delete/${id}`, {})
          .then((response) => {
            console.log(response)
            this.getUsers()
          })
          .catch((error) => {
            console.log(error)
            utils.notify.error(error)
          })
      }).onCancel(() => {
        console.log('>>>> Cancel')
      })
    }
  }
};
</script>
