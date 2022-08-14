<template>
<div>
    <div v-if="response">
        <center>
            <h2 class="text-2xl m-2 font-semibold">-สรุปแผนการบริหารจัดการความเสี่ยงและควบคุมภายใน-</h2>
        </center>
        <center>
            <h2 class="text-xl m-2 font-semibold">ปีงบประมาณ พ.ศ. {{year}}</h2>
        </center>
        <RM-ChartRiskType></RM-ChartRiskType>

        <div class=" p-2 mt-4" v-if="fullviewChartStrategic">
            <v-card-title primary-title>
                ความเสี่ยงแต่ละยุทธศาสตร์
                <v-spacer></v-spacer>
                <v-btn @click="fullviewChartStrategic=false" color="success" outlined small>
                    <v-icon>mdi-eye</v-icon> ดูแบบย่อ
                </v-btn>
            </v-card-title>
            <div class="w-full flex flex-col md:flex-row flex-wrap">
                <div class="w-1/3 p-2">
                    <center>RM-Plan</center>
                    <RM-ChartStrategic :type="0" :col="true"></RM-ChartStrategic>
                </div>
                <div class="w-1/3 p-2">
                    <center>RM-6</center>
                    <RM-ChartStrategic :type="6" :col="true"></RM-ChartStrategic>
                </div>
                <div class="w-1/3 p-2">
                    <center>RM-12</center>
                    <RM-ChartStrategic :type="12" :col="true"></RM-ChartStrategic>
                </div>
            </div>

        </div>

        <div class="w-full mt-4">
            <div v-if="!fullviewChartStrategic">
                <v-card-title primary-title>
                    ความเสี่ยงแต่ละยุทธศาสตร์
                    <v-spacer></v-spacer>
                    <v-btn @click="fullviewChartStrategic=true" color="success" outlined small>
                        <v-icon>mdi-eye</v-icon> ดูแบบเต็ม
                    </v-btn>
                </v-card-title>
                <v-btn :outlined="tab == 0" @click="tab=0" color="primary">RM-Plan</v-btn>
                <v-btn :outlined="tab == 6" @click="tab=6" color="primary">RM-6</v-btn>
                <v-btn :outlined="tab == 12" @click="tab=12" color="primary">RM-12</v-btn>
                <RM-ChartStrategic :type="tab"></RM-ChartStrategic>

            </div>
            <RM-ListStrategic0 :printMode="true" class="mt-4" :agency="agency" @loadRisk="agencyChange" />

            <!-- <RM-ListAll class="mt-4" :agency="agency" @loadRisk="agencyChange" /> -->

        </div>

        <center class="mt-6"><v-btn @click="print()" outlined color="success">Print</v-btn></center>
    </div>

</div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
import _ from 'lodash'
export default {
    layout(context) {
        return 'blank'
    },
    data: () => {
        return ({
            fullviewChartStrategic: true,
            user: Auth.user,
            agency: Auth.user.agency_id,
            response: false,
            tab: 0,
            year:Core.currentYearTxt
        })
    },
    async created() {
        await this.initialize();
  
    },
    methods: {
        async initialize() {
            await Web.switchLoad(true)
            this.response = false;
            await CoreRisk.loadCurrentRisk(true)
            this.response = true;
            await Web.switchLoad(false) 
        },
        async print(){
            await window.print();
        },
        async agencyChange(val) {
            await Web.switchLoad(true)
            this.response = false;
            console.log(val);
            this.agency = val
            await CoreRisk.loadCurrentRisk(false, true, val)
            this.response = true;
            await Web.switchLoad(false)
        },
        async allChange(val) {
            await Web.switchLoad(true)
            this.response = false;
            console.log(val);
            this.agency = val
            await CoreRisk.loadCurrentRisk(true)
            this.response = true;
            await Web.switchLoad(false)
        }

    }
}
</script>

<style>

</style>
