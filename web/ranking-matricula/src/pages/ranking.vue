<template>
  <q-page class="flex justify-center">
    <div class="col">
      <div class="row justify-center">
        <div class="q-pa-md col col-xs-10 col-sm-10" >
          <q-table
            title="Ranking"
            :data="data"
            :columns="columns"
            row-key="name">

            <div slot="top" class="column items-center fit">
              <div class="row-6 text-blue-10 text-bold"> RANKING </div>
              <div class="row-6">
                <img width=200  src="~assets/ranking.jpg">
              </div>
            </div>

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

<style >

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
        { name: 'name', label: 'Nome', field: 'name_user', sortable: true, align: 'left' },
        { name: 'role', label: 'Cargo', field: 'role', sortable: true, align: 'left' },
        { name: 'quantity', label: 'Quantidade', field: 'count_enroll', align: 'left' },
      ],
      data: []
    }
  },

  mounted() {
    this.getRanking()
  },

  methods: {
    formatOnlyDate(date) {
      let dateFormat = ''
      if (date) {
        dateFormat = moment(date).format('DD/MM/YYYY')
      }
      return dateFormat
    },

    getRanking() {
      HTTP.get('enrollments-ranking', {})
        .then((response) => {
          console.log(response);
          this.data = response.data
          this.data.map((el) => {
            el.name_user = el.Users[0].name
            el.role = el.Users[0].role
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
};
</script>
