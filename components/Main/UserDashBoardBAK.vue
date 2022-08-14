<template>
<v-col>

    <div class="flex flex-col md:flex-row " >
        <div class="w-full md:w-3/4">
            <h2 class="text-3xl ">{{user.agency_name}}</h2>
            <p>{{user.first_name}} {{user.last_name}}</p>
        </div>
        <div class="w-full md:w-1/4" v-if="user.is_agency_admin">
            <v-checkbox label="แสดงหน่วยงานทั้งหมด" v-model="allAgency"></v-checkbox>

        </div>
        <div class="w-full md:w-1/4  ml-2" v-if="!allAgency && user.is_agency_admin">
            <v-autocomplete v-model="currentAgency" :items="choices.agencies" item-text="name" item-value="id" solo label="หน่วยงาน"></v-autocomplete>
        </div>
        <div class="w-full md:w-1/4 ml-2">
            <v-select v-model="currentYear" :items="years" item-text="year" item-value="id" return-object solo label="ปีงบประมาณ"></v-select>
          <Core-YearSelect @yearChange="changex"></Core-YearSelect>

        </div>

    </div>
    <div class="flex flex-col md:flex-row" v-if="currentYear && response">
        <div class="w-full md:w-1/4">
            <Core-Menu icon="em em-books" :name="countRisk.all" text="ทั้งหมด"></Core-Menu>
        </div>
        <div class="w-full md:w-1/4">
            <Core-Menu icon="em em-building_construction" :name="countRisk.ing" text="กำลังดำเนินการ"></Core-Menu>
        </div>
        <div class="w-full md:w-1/4">
            <Core-Menu icon="em em-city_sunrise" :name="countRisk.end" text="เสร็จสิ้น"></Core-Menu>
        </div>
        <div class="w-full md:w-1/4">
            <Core-Menu icon="em em-derelict_house_building" :name="countRisk.err" text="ไม่สำเร็จ"></Core-Menu>
        </div>

    </div>
    <div class="flex flex-col md:flex-row" v-if="currentYear  && response">
        <div class="w-full md:w-1/2">
            <RM-List :agency="currentAgency" @reload="backRisk" :risks="risks"></RM-List>
        </div>
        <div class="w-full md:w-1/2">
            <RM-Chart :seriesData="countRisk"></RM-Chart>
        </div>
    </div>

</v-col>
</template>

<script>
import { Auth } from '@/vuexes/auth'
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'

import { Web } from '@/vuexes/web'
import { Risk } from '@/vuexes/risk'
import _ from 'lodash'
export default {
    components: {

    },
    data() {
        return ({
            agencyHave:false,
            allAgency: false,
            choices: Core.choices,
            text: "sdss",
            user: Auth.user,
            years: Core.years,
            currentYear: null,
            risks: [],
            currentAgency: Risk.currentAgency,
            countRisk: {
                all: 0,
                ing: 0,
                end: 0,
                err: 0
            },
            response: false,
        })
    },
    watch: {
        async currentYear(val) {
            await this.reloadRisk(val)
            await Core.setYear(val)
        },
        async currentAgency(val) {
            this.currentAgency = val
            await this.reloadRisk(this.currentYear)
            this.allAgency = false;
        },
        async allAgency(val) {

            await this.reloadRisk(this.currentYear)
            //   this.currentAgency = null
        }
    },
    computed: {
        year() {
            return Core.currentYear;
        },
      xrisks(){
          return CoreRisk.risks
      }

    },
    async created() {

        if (this.user.agency) {
             await Web.switchLoad(true)
            this.currentYear = this.years[0]
            await Core.setYear(this.currentYear)
            await Core.getRMEnv()
            this.currentAgency = this.user.agency_id
            await Risk.setAgency(this.user.agency_id);
            await this.loadRisk(this.currentAgency);
            await this.getCount();
            await Web.switchLoad(false)
            this.response = true;
            this.agencyHave = true
        }else{

        }

    },
    methods: {
      async changex(value){
        console.log(value)
        await CoreRisk.loadCurrentRisk()
      },
        async reloadRisk(val) {
            await Web.switchLoad(true)
            this.response = false
            await Core.setYear(this.currentYear)
            await Core.getRMEnv()
            await this.loadRisk(this.currentAgency);
            await this.getCount();
            await Web.switchLoad(false)
            this.response = true;
        },
        async backRisk(val) {
            await Web.switchLoad(true)
            this.currentYear = this.years[0]
            await Core.setYear(this.currentYear)
            await Core.getRMEnv()

            await this.loadRisk(this.currentAgency);
            await this.getCount();
            await Web.switchLoad(false)
            this.response = true;
        },
        async loadRisk(currentAgency) {
            let agency = ""
            if (!this.allAgency) {
                agency = (currentAgency) ? `&agency=${currentAgency}` : ''
            }

            let year = (this.year.id) ? `year=${this.year.id}` : ''
            this.risks = await Core.getHttp(`/api/risk/?${year}${agency}`)
        },
        async getCount() {
            let all = this.risks.length //  _.filter(this.risks,{status:'กำลังดำเนินงาน'})
            let ing = _.filter(this.risks, { status: 'กำลังดำเนินงาน' })
            let end = _.filter(this.risks, { status: 'ดำเนินการเสร็จสิ้น' })
            let err = _.filter(this.risks, { status: 'ดำเนินการไม่สำเร็จ' })
            this.countRisk = {
                all: all,
                ing: ing.length,
                end: end.length,
                err: err.length
            }
        }
    }

}
</script>
