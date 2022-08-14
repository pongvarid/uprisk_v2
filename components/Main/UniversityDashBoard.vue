<template>
<v-col>
    <v-toolbar color="transparent" flat>
        <h2 class="text-3xl">Dashboard</h2>
        <v-spacer></v-spacer>
        <Core-YearSelect @yearChange="initialize"></Core-YearSelect>
        <!-- <Core-AgencySelect v-if="user.is_staff || user.is_superuser" class="ml-4" @allChange="allChange" @agencyChange="agencyChange"></Core-AgencySelect> -->
   
    </v-toolbar>
    <div v-if="response">

        <RM-ChartRiskType></RM-ChartRiskType>

        <div class=" p-2 mt-4" v-if="fullviewChartStrategic">
            <v-card-title primary-title>
                ความเสี่ยงแต่ละยุทธศาสตร์
                <v-spacer></v-spacer>
                <v-btn @click="fullviewChartStrategic=false" color="success" outlined small>
                    <v-icon>mdi-eye</v-icon> ดูแบบย่อ
                </v-btn>
            </v-card-title>
               <div class="w-full">
                <RM-ChartAvg></RM-ChartAvg>
            </div>
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
                    <v-btn  @click="fullviewChartStrategic=true" color="success" outlined small>
                        <v-icon>mdi-eye</v-icon> ดูแบบเต็ม
                    </v-btn>
                </v-card-title>
                <v-btn :outlined="tab == 0" @click="tab=0" color="primary">RM-Plan</v-btn>
                <v-btn :outlined="tab == 6"  @click="tab=6" color="primary">RM-6</v-btn>
                <v-btn :outlined="tab == 12"  @click="tab=12" color="primary">RM-12</v-btn>
                  <RM-ChartStrategic :type="tab"></RM-ChartStrategic>
              
 
            </div>
         
            <RM-List :isEdit="(!user.is_staff || !user.is_superuser)" class="mt-4" :agency="agency" @loadRisk="agencyChange" />

        </div>

    </div>

</v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
@Component
export default class UserDashBoard extends Vue {
    @Prop() private aProperty!: string;

    private fullviewChartStrategic: boolean = false;
    private user: any = Auth.user
    private agency: number = 21
    private response: boolean = false;
        public tab: number = 0
    private async created() {
          
        await this.initialize();
    }
    private async initialize() {
        await Web.switchLoad(true)
        this.response = false;
        await CoreRisk.loadCurrentRisk(false, true, 21)
        this.response = true;
        await Web.switchLoad(false)
    }

    private async agencyChange(val: number) {
        await Web.switchLoad(true)
        this.response = false;
        console.log(val);
        this.agency = val
        await CoreRisk.loadCurrentRisk(false, true, val)
        this.response = true;
        await Web.switchLoad(false)
    }

    private async allChange(val: number) {
        await Web.switchLoad(true)
        this.response = false;
        console.log(val);
        this.agency = val
        await CoreRisk.loadCurrentRisk(false, true, val)
        this.response = true;
        await Web.switchLoad(false)
    }

}
</script>

<style lang="scss" scoped>
.aProperty {
    color: gray;
}
</style>
