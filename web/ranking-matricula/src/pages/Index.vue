<template>
  <q-page class="flex flex-center">
    <div class="col q-pa-md">
      <div class="row justify-center">
        <img alt="Wizards logo" src="~assets/logo-wizards2.png" style="width:250px; height:250px">
      </div>
      <div class="row justify-center">
        <q-card class="text-blue col-6 col-sm-6 col-xs-10">
          <q-card-section>
            <div class="text-h6 text-blue-10">Matrícula</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <q-input rounded filled v-model="user.name" label="Nome"/>
              <q-input square filled v-model="user.email" label="Email"/>
              <q-input
                square
                filled
                v-model="user.dt_birth"
                label="Data de Nascimento"
              />
              <q-input square filled v-model="user.cpf" label="CPF"/>
              <q-select square filled v-model="user.level" :options="levels" label="Nível"/>
              <q-input square filled v-model="user.value_paid" label="Valor pago"/>
            </div>
          </q-card-section>

          <q-separator dark/>

          <q-card-actions>
            <q-btn flat class="text-blue-10" @click="saveEnrollment">Salvar</q-btn>
            <q-btn flat class="text-blue-10">Pesquisar</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import moment from "moment";
import { TheMask } from "vue-the-mask";
import { HTTP } from "../boot/axios";
import { utils } from "../boot/utilsDev";

export default {
  components: { TheMask },

  name: "PageIndex",

  data() {
    return {
      user: {},
      levels: ["INICIANTE", "INTERMEDIÁRIO", "AVANÇADO"],
      dataNascimento: ''
    };
  },

  watch: {
    dataNascimento: {
      handler: (val) => {
        this.mascaraData(val) // call it in the context of your component object
      },
      deep: true
    }
  },

  methods: {
    saveEnrollment() {
      console.log(this.user.dt_birth, moment(this.user.dt_birth, "DD/MM/YYYY"));

      this.user.id_user = localStorage.getItem("user-id");
      this.user.dt_birth = moment(this.user.dt_birth, "DD/MM/YYYY");

      HTTP.post("enrollments", this.user)
        .then((response) => {
          console.log(response);
          this.user = {};
          utils.notify.success("Matricula cadastrada!");
          this.$router.push("/view/ranking");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    mascaraData(val) {
      let pass = val.value;
      let expr = /[0123456789]/;

      for (let i = 0; i < pass.length; i++) {
        // charAt -> retorna o caractere posicionado no índice especificado
        let lchar = val.value.charAt(i);
        let nchar = val.value.charAt(i + 1);

        if (i === 0) {
          // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
          // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
          // instStr.search(expReg);
          if (lchar.search(expr) !== 0 || lchar > 3) {
            val.value = "";
          }
        } else if (i === 1) {
          if (lchar.search(expr) !== 0) {
            // substring(indice1,indice2)
            // indice1, indice2 -> será usado para delimitar a string
            const tst1 = val.value.substring(0, i);
            val.value = tst1;
            continue;
          }

          if (nchar !== '/' && nchar !== "") {
            const tst1 = val.value.substring(0, i + 1)
            let tst2;
            if (nchar.search(expr) !== 0) {
              tst2 = val.value.substring(i + 2, pass.length)
            } else {
              tst2 = val.value.substring(i + 1, pass.length)
            }
            val.value = tst1 + '/' + tst2;
          }
        } else if (i === 4) {
          if (lchar.search(expr) !== 0) {
            const tst1 = val.value.substring(0, i);
            val.value = tst1;
            continue;
          }

          if (nchar !== '/' && nchar !== "") {
            const tst1 = val.value.substring(0, i + 1);
            let tst2 = ''
            if (nchar.search(expr) !== 0) {
              tst2 = val.value.substring(i + 2, pass.length);
            } else {
              tst2 = val.value.substring(i + 1, pass.length);
            }
            val.value = tst1 + '/' + tst2;
          }
        }

        if (i >= 6) {
          if (lchar.search(expr) !== 0) {
            let tst1 = val.value.substring(0, i);
            val.value = tst1;
          }
        }
      }

      if (pass.length > 10) {
        val.value = val.value.substring(0, 10)
      }
      return true
    }
  }
};
</script>
