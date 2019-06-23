<template>
  <q-page class="flex justify-center">
    <div class="col">
      <div class="row justify-center">
        <div class="q-pa-md col col-xs-10 col-sm-10">
          <q-table
            title="Alunos"
            :data="data"
            :columns="columns"
            row-key="name">

             <q-tr slot="header" slot-scope="props">

              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-blue-10">
                {{ col.label }}
              </q-th>
            </q-tr>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>

import moment from 'moment'
import { HTTP } from '../boot/axios'

export default {
  name: 'PageIndex',

  data() {
    return {
      columns:
      [
        { name: 'name', label: 'Nome', field: 'name', sortable: true, align: 'left' },
        { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
        { name: 'email', label: 'Email', field: 'email', align: 'left' },
        { name: 'dt_birth', label: 'Data Nascimento', field: 'dt_birth', format: val => `${this.formatOnlyDate(val)}`, align: 'left' },
        { name: 'dt_created', label: 'Data Cadastro', field: 'createdAt', format: val => `${this.formatOnlyDate(val)}`, align: 'left' }
      ],
      data: []
    }
  },

  mounted() {
    this.getEnrollments();
  },

  methods: {
    formatOnlyDate(date) {
      let dateFormat = ''
      if (date) {
        dateFormat = moment(date).format('DD/MM/YYYY')
      }
      return dateFormat
    },

    getEnrollments() {
      HTTP.get('enrollments', {})
        .then((response) => {
          console.log(response);
          this.data = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
};
</script>
