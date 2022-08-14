<template>
  <div class="bg-white" style="z-index:999;">
    <v-dialog v-model="dialog" fullscreen persistent >
      <div class="p-6 bg-white h-screen">

        <center>
          <h2 class="ff text-base  font-bold">แผนการจัดการความเสี่ยงและควบคุมภายใน (RM-12) รอบ 12 เดือน </h2>
          <h2 class="ff text-base  font-bold">ประจำปีงบประมาณ {{year.year}}</h2>
        </center><br>
        <center>
          <h2 class="ff text-base "><span class="ff font-bold">ชื่อหน่วยงาน </span> {{user.agency_name}}</h2>
        </center><br><br>

        <div class="flex justify-center items-center">
          <span class="ff font-bold">ชื่อความเสี่ยง</span>
          <v-text-field readonly  class="ml-2 ff text-base " v-model="risk.name"></v-text-field>
        </div>
        <div class="flex  items-center">
          <span class="ff font-bold">ประเภทความเสี่ยง</span>
          <v-text-field readonly  class="ml-2 ff text-base " v-model="riskType"></v-text-field>

        </div>
        <div class="flex justify-center items-center">
          <span class="ff font-bold ">การบริหารจัดการความเสี่ยงตามพันธกิจ</span>
          <v-select readonly class="ml-2 ff text-base " v-model="risk.mission" multiple :items="choices.mission" item-text="name" item-value="id"></v-select>
        </div>

        <div class="flex justify-center items-center">
          <span class="ff font-bold">ยุทธศาสตร์</span>
          <v-select readonly class="ml-2 ff text-base " v-model="risk.strategic" multiple :items="choices.strategic" item-text="name" item-value="id"></v-select>
        </div>
        <div class="flex justify-center items-center">
          <span class="ff font-bold">ค่าเป้าหมาย</span>
          <v-text-field readonly class="ml-2 ff text-base " v-model="risk.point" item-text="name" item-value="id"></v-text-field>
        </div>
        <div class="flex justify-center items-center">
          <span class="ff font-bold">กลยุทธ์</span>
          <v-select readonly class="ml-2 ff text-base " v-model="risk.strategy" multiple  item-text="name" item-value="id" :items="choices.strategy"></v-select>
        </div>

        <table class="w-full ff">
          <tbody class="w-full">
          <tr class="w-full">
            <td>สาเหตุ </td>
            <td>การดำเนินการจัดการความเสี่ยง (รอบ 12 เดือน)</td>
            <td>ผลการดำเนินงาน (รอบ 12 เดือน)</td>
            <td>ระดับความเสี่ยง (รอบ 6 เดือน)</td>
            <td>ระดับความเสี่ยง (รอบ 12 เดือน)</td>
          </tr>
          <tr class="w-full">

            <td style="width:15%;">

              <h2 class="font-bold underline">RM-Plan</h2>
              <div class="pl-4">
                <h2 class="font-bold underline">ภายใน</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 1 && data.rm_type == 1">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div><br>
                <h2 class="font-bold underline">ภายนอก</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 2 && data.rm_type == 1">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div>
              </div>
              <h2 class="font-bold underline">RM-6</h2>
              <div class="pl-4">
                <h2 class="font-bold underline">ภายใน</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 1 && data.rm_type == 6">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div><br>
                <h2 class="font-bold underline">ภายนอก</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 2 && data.rm_type == 6">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div>
              </div>
              <h2 class="font-bold underline">RM-12</h2>
              <div class="pl-4">
                <h2 class="font-bold underline">ภายใน</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 1 && data.rm_type == 12">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div><br>
                <h2 class="font-bold underline">ภายนอก</h2>
                <div v-for="(data,i) in courses" :key="i" v-if="data.type == 2 && data.rm_type == 12">
                  <h2 class="pl-2">- {{data.value}}</h2>
                </div>
              </div>

            </td>
            <td>
              <div v-for="(data,i) in effects" :key="i"  >
                <h2 class="font-bold underline" > {{data.value}} ({{data.status}})</h2>
                <h2 class="font-bold pl-4" > มาตรการ</h2>
                <div v-for="(data_in,i) in JSON.parse(data.maesure)" :key="i">
                  <h2 class="pl-4">- {{data_in}}</h2>
                </div>

              </div>
              <!--          <span class="ff" v-for="d,i in risk.effect_risk" :key="i">{{d}}</span> -->
            </td>
            <td>

              <div v-for="(data,i) in kris" :key="i"  >
                <h2 class="pl-2 underline">{{data.indicators}}</h2>
                <h2 class="pl-4">รายงานผล :  {{data.report}}</h2>
                <h2 class="pl-4">เป้าหมาย :  {{data.target}}</h2>
                <h2 class="pl-4" :class="(data.status)?'text-red-600':'text-green-600'">{{ (data.status)?'ความเสี่ยงสูง':'ความเสี่ยงต่ำ'}}</h2>
              </div>
            </td>
            <td style="width:15%;">
              {{risk_cal6.chance}} x {{risk_cal6.result}} = {{risk_cal6.xscore}}
              <p>ระดับความเสี่ยง : {{risk_cal6.xrate}}</p>
            </td>
            <td style="width:15%;">
              {{risk_cal12.chance}} x {{risk_cal12.result}} = {{risk_cal12.xscore}}
              <p>ระดับความเสี่ยง : {{risk_cal12.xrate}}</p>
            </td>



          </tr>
          </tbody>
        </table>
        <div><br>
          <h3 class="ff text-xl font-bold underline">ผลการดำเนินการ : {{risk.status}}</h3>
        </div>
        <div class="flex flex-row justify-center items-center">
          <div class="w-3/4"></div>
          <div class="w-1/4"><br><br>
            <img :src="risk.sign_img12" alt="">
            <h2 class="ff">ลายมือชื่อ...................................</h2>
            <h2 class="ff">({{risk.sign_name12}})</h2>
            <h2 class="ff">ตำแหน่ง{{risk.sign_position12}}</h2>
            <h2 class="ff">{{core.convertDate(risk.sign_date12)}}</h2>
          </div>
        </div>
        <v-btn @click="printing()">Print</v-btn>
        <br><br><br><br><br><br>
      </div>

    </v-dialog>
  </div>

</template>

<script>
import {Core} from "@/vuexes/core";
import {Web} from "@/vuexes/web";

import {Auth} from "@/vuexes/auth";
import _ from 'lodash'
export default {
  name: "report1",

  async created(){

    await this.loadRisk();
    await this.loadENV();
  },
  data(){
    return ({
      web:Web,
      core:Core,
      dialog:true,
      id:null,
      risk:{},
      choices:Core.choices,
      user:Auth.user,
      year:{},
      courses:[],
      effects:[],
      controls:[],
      kris:[],
      risk_cal:{},
      risk_cal6:{},
      risk_cal12:{}

    })
  },
  methods:{
    async printing(){
      window.print();
    },
    async loadRisk(){
      this.id = this.$route.query.id
      this.risk = await Core.getHttp(`/api/risk/${this.id}/ `)
      this.year = _.find(Core.years,{id:this.risk.year})
    },

    async loadENV(){
      this.courses = await Core.getHttp(`/api/cause/?risk=${this.id}  `)
      this.effects = await Core.getHttp(`/api/effect/?risk=${this.id}&risk_type=12 `)
      this.controls = await Core.getHttp(`/api/control/?risk=${this.id}&risk_type=12 `)
      this.kris = await Core.getHttp(`/api/kri/?risk=${this.id}&risk_type=12 `)
      let risk_cal = await Core.getHttp(`/api/riskdata/?risk=${this.risk.id}&rm_type=1`)
      let risk_cal6 = await Core.getHttp(`/api/riskdata/?risk=${this.risk.id}&rm_type=6`)
      let risk_cal12 = await Core.getHttp(`/api/riskdata/?risk=${this.risk.id}&rm_type=12`)
      if(risk_cal.length == 1){
        this.risk_cal = risk_cal[0]
      }
      if(risk_cal6.length == 1){
        this.risk_cal6 = risk_cal6[0]
      }
      if(risk_cal12.length == 1){
        this.risk_cal12 = risk_cal12[0]
      }
    }
  },
  computed:{
    riskType(){
      let filtered_ids = _.filter(this.choices.risktype, (p)=>{
        return _.includes(this.risk.risk_type, p.id);
      });
      let responseText = ''
      filtered_ids.forEach((riskType, index) => {
        responseText+= riskType.name+","
      })
      return responseText
    }
  }

}
</script>

<style  >
@import url('https://fonts.googleapis.com/css2?family=Niramit&display=swap');
.ff{
  font-family: 'Niramit', sans-serif !important;
}
.v-select >>> input  {
  font-family: 'Niramit', sans-serif !important;
}

.ff * {
  font-family: 'Niramit', sans-serif !important;

}
.ff2 * {
  font-family: 'Niramit', sans-serif !important;
  font-size: 12px !important;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  font-family: 'Niramit', sans-serif !important;
  font-weight: bold;
  font-size: 12px !important;
}

th,
td {
  padding: 15px;
  text-align: left;
  font-family: 'Niramit', sans-serif !important;
  font-size: 12px !important;
}


</style>
