<template>
  <div>
    <v-card outlined class="p-6" >
      <h2 class="text-xl font-bold"> การลงนาม</h2>
      <h2 class="text-base">ยืนยันการบันทึก RM-Plan ({{risk.name}}) เมื่อข้อมูลครบถ้วนแล้ว</h2>
      <div class="flex mt-2">
        <div class="w-1/2">
          <Core-Draw v-if="!risk.sign_img" @getSign="getSign"></Core-Draw>
          <img v-else :src="risk.sign_img" alt="">
          <br>
          <v-text-field v-model="risk.sign_name" outlined dense label="ชื่อ-นามสกุล"></v-text-field>
          <v-text-field   v-model="risk.sign_position" outlined dense  label="ตำแหน่ง รองอธิการบดีที่กำกับดูแล/คณบดี/ผู้อำนวยการ/หัวหน้าหน่วยงาน"></v-text-field>
          <v-text-field  v-model="risk.sign_date" type="date" outlined dense label="วันที่"></v-text-field>


        </div>
        <div class="w-1/2 flex flex-col justify-center  items-center h-auto">
          <i class="em em-triangular_flag_on_post text-6xl" aria-role="presentation" aria-label="TRIANGULAR FLAG ON POST"></i>
        </div>
      </div>
    </v-card>
    <br>

    <v-toolbar   class="p-4 mt-6" flat color="transparent"> <v-spacer></v-spacer>
      <v-btn large color="success" @click="saveRisk()">บันทึกข้อมูล</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import {Core} from "@/vuexes/core";
import {Auth} from '@/vuexes/auth'
import { Web } from "@/vuexes/web";
export default {
  props: {
    risk: {
      default: {}
    },

  },
  data(){
    return ({
      choices:Core.choices,
      user:Auth.user
    })
  },
  computed: {

  },
  methods: {
    async getSign(val){
      this.risk.sign_img = val
    },
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


