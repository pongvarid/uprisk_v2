<template>
  <div>
    <v-card outlined class="p-6">
      <h2 class="text-xl font-bold"> ผู้รับผิดชอบ</h2>
      <h2 class="text-base">ผู้รับผิดชอบการบันทึกข้อมูล RM-Plan นี้</h2>
      <div class="flex mt-2">
        <div class="w-1/2">
          <v-text-field :readonly="readonly" v-model="risk.assign_name" outlined dense label="ผู้รับผิดชอบ"></v-text-field>
          <v-text-field :readonly="readonly" v-model="risk.assign_date" type="date" outlined dense label="กําหนดเสร็จ"></v-text-field>

        </div>
        <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
          <i class="em em-triangular_flag_on_post text-6xl" aria-role="presentation" aria-label="TRIANGULAR FLAG ON POST"></i>
        </div>
      </div>
    </v-card>
    <br>

    <v-toolbar v-if="!readonly" class="p-4 mt-6" flat color="transparent"> <v-spacer></v-spacer>
      <v-btn large color="success" @click="saveRisk()">บันทึกข้อมูล</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import {Core} from "@/vuexes/core";
import { Web } from "@/vuexes/web";

export default {
  props: {
    risk: {
      default: {}
    },
    readonly:{
      default: false
    }

  },
  data(){
    return ({
      choices:Core.choices
    })
  },
  computed: {

  },
  methods: {
    async saveRisk(){
      let risk = await Core.putHttp(`/api/risk/${this.risk.id}/`,this.risk)
      if(risk.id){
         await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
      }
      await this.$emit('reload')
    }
  }
}
</script>


