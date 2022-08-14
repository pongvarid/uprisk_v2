<template>
<v-col class="pt-2" v-if="response">

    <v-toolbar flat color="transparent">
        <div class="flex">
            <v-btn @click="$router.push('/')" text>หน้าแรก /</v-btn>
            <v-btn @click="$router.go(-1)" text><span class="truncate w-44">{{risk.name}} </span>/</v-btn>
            <v-btn color="primary" text>RM-12 /</v-btn>
        </div>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="pl-6">

        <h2 class="text-2xl">รายงานผลการดำเนินงานตามแผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-12) รอบ 12 เดือน </h2>
        <span class=" ">{{risk.name}} </span>
    </div>

    <div class="mt-4 ">
        <v-tabs active-class="xxx" v-model="tab"     background-color="transparent" >
            <v-tab>
                <div class="w-full text-left   text-base"><i class="em em-checkered_flag mr-2" aria-role="presentation" aria-label="CHEQUERED FLAG"></i> กำหนดความเสี่ยง </div>
            </v-tab>
            <v-tab-item  >
                <div class="p-4 bgc" v-if="tab==0">
                    <Risk-Step1 @reload="loadRisk" :risk="risk"></Risk-Step1>
                </div>
            </v-tab-item>

            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-question mr-2" aria-role="presentation" aria-label="BLACK QUESTION MARK ORNAMENT"></i> สาเหตุ/ปัจจัยเสี่ยง
                </div>
            </v-tab>
            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==1">
                    <Risk-Step2 :rm_type="rm_type" :risk="risk"></Risk-Step2>
                </div>
            </v-tab-item>

            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-control_knobs mr-2" aria-role="presentation" aria-label=""></i> การควบคุมที่มีอยู่ในปัจจุบัน</div>
            </v-tab>

            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==2">
                    <Risk-Step3 :rm_type="rm_type" :risk="risk"></Risk-Step3>
                </div>
            </v-tab-item>

            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-juggling mr-2" aria-role="presentation" aria-label="JUGGLING"></i> ผลกระทบ/มาตรการ</div>
            </v-tab>
            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==3">
                    <Risk-Step4 :rm_type="rm_type" :risk="risk"></Risk-Step4>
                </div>
            </v-tab-item>

            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-chart_with_upwards_trend mr-2" aria-role="presentation" aria-label="CHART WITH UPWARDS TREND"></i> ดัชนีชี้วัด</div>
            </v-tab>
            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==4">
                    <Risk-Step5 :rm_type="rm_type" :risk="risk"></Risk-Step5>

                </div>
            </v-tab-item>
            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-bar_chart mr-2" aria-role="presentation" aria-label="BAR CHART"></i> ประเมินระดับความเสี่ยง</div>
            </v-tab>
            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==5">
                    <Risk-Step6 :rm_type="rm_type" :risk="risk"></Risk-Step6>

                </div>
            </v-tab-item>

            <v-tab>
                <div class="w-full text-left text-base">
                    <i class="em em-female-mechanic mr-2" aria-role="presentation" aria-label=""></i> ผู้รับผิดชอบ</div>
            </v-tab>
            <v-tab-item>
                <div class="p-4 bgc" v-if="tab==6">
                    <Risk-Step7 @reload="loadRisk" :rm_type="rm_type" :risk="risk"></Risk-Step7>

                </div>
            </v-tab-item>
            <v-tab v-if="user.is_executive">
                <div class="w-full text-left text-base"> <i class="em em-female-office-worker mr-2" aria-role="presentation" aria-label=""></i>การลงนาม</div>
            </v-tab>
            <v-tab-item v-if="user.is_executive">
                <div class="p-4 bgc" v-if="tab==7">
                    <Risk-Step8 @reload="loadRisk" :risk="risk" :rm_type="rm_type"></Risk-Step8>
                </div>
            </v-tab-item>
        </v-tabs>

    </div>

</v-col>
</template>

<script>
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
import { Risk } from "@/vuexes/risk";
import { Web } from "@/vuexes/web";
export default {
    data() {
        return ({
            tab: 0,
            core: Core,
            user: Auth.user,
            response: false,
            rm_type: 12

        })
    },
    methods: {
        async loadRisk() {
            let id = Number(this.$route.query.id);
            let risk = await Core.getHttp(`/api/risk/${id}/ `)
            await Risk.setRisk(risk)
        }
    },
    async created() {
        await Web.switchLoad(true);
        await this.loadRisk()
        this.response = true;
        await Web.switchLoad(false);
    },
    computed: {
        year() {
            let year = _.find(Core.years, { id: this.risk.year })
            return year.year
        },
        risk() {
            return Risk.currentRisk
        },
        mission() {
            let mission = _.find(Core.choices.mission, { id: this.risk.mission })
            return mission.name
        }
    }
}
</script>

<style>
.xxx {
    color:blueviolet!important;
    font-weight: bold;
background-color: #CEDEFF;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23CEDEFF' stroke-width='0.1' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cuse fill='%23ccdcfc' href='%23s' y='2'/%3E%3Cuse fill='%23ccdcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23cadafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23cadafa' href='%23s'/%3E%3Cuse fill='%23c8d7f7' href='%23s' x='2'/%3E%3Cuse fill='%23c8d7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23c6d5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23c6d5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23c3d3f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23CEDEFF'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23c1d0ef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23A764FF'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23A764FF'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(153 1000 750) scale(34.5) translate(-971.01 -728.26)'%3E%3Cg fill='%23A764FF'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
</style>
