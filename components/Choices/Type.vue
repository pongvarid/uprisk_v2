<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/3">
        <h2 class="mt-4 text-xl">ประเภทความเสี่ยง ที่มหาวิทยาลัยกำหนด</h2>
        <div v-for="(up,index) in upChoices" :key="index">
          <Core-Menu2 color="purple" icon="em em-classical_building text-xl" :name="up.name" text=""></Core-Menu2>
        </div>
      </div>
      <div class="w-full md:w-2/3">
        <h2 class="mt-4 text-xl">ประเภทความเสี่ยง ของหน่วยงาน {{user.agency_name}}</h2><br>
        <form @submit.prevent="saveData()" class="flex">
          <v-text-field required v-model="form.name" dense outlined label="ประเภทความเสี่ยง"></v-text-field>
          <v-btn type="submit" color="success"  class="ml-2"> + เพิ่ม</v-btn>
        </form>
        <div v-for="(ag,index) in agencyChoices" :key="index">
          <Core-Menu2 :btn="true" @back="deleteData(ag.id)" icon="em em-classical_building text-xl" :name="ag.name" text=""></Core-Menu2>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
import { Web } from "@/vuexes/web";
import _ from 'lodash'
export default {
  name: "risktype",
  data(){
    return({
      core:Core,
      user:Auth.user,
      upChoices:[],
      agencyChoices:[],
      test:"ssss",

      form:{}
    })
  },
  methods:{
    async loadData(){
      this.upChoices = _.filter(Core.choices.risktype,{agency:21})
      this.agencyChoices = _.filter(Core.choices.risktype,{agency:this.user.agency_id})
    },
    async saveData(){
      this.form.agency = this.user.agency_id
      let save = await Core.postHttp(`/api/risktype/`,this.form)
      if(save.id){
        this.form ={}
        await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
        await Core.getRMEnv();
        await this.loadData();
      }
    },
    async deleteData(id){
      let data = await Core.deleteHttp(`/api/risktype/${id}/`)
      await Core.getRMEnv();
      await this.loadData();
    }
  },
  async created() {
    await this.loadData();
  }

}
</script>

<style scoped>

</style>
