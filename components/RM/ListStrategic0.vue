<template>
<div class="  rounded-xl  " v-if="response">

    <v-card>
        <v-card-title>
            <span class="w-20 h-20 text-4xl object-cover rounded-full em em-card_index_dividers" aria-role="presentation" aria-label=""></span> รายการความเสี่ยง
            <v-spacer></v-spacer>
            <v-btn outlined @click="$router.push('/exportall0')" color="success"><i class="em em-printer mr-2" aria-role="presentation" aria-label=""></i> Print</v-btn>
        </v-card-title>
        <v-card-text> 
            <v-expansion-panels v-model="panel" multiple >
                <v-expansion-panel v-for="strategic,i in strategics" :key="i">
                    <v-expansion-panel-header>
                        {{strategic.name}} <span class="ml-4">({{(strategic.risks).length}} ประเด็น)</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <!-- <div class="ml-4" v-for="risk,risk_in in strategic.risks" :key="risk_in">
                            {{risk.agency_name}} {{risk.name}}
                        </div> -->
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field> 
                        <v-data-table :headers="headers" :items="strategic.risks" :search="search" :items-per-page="20">
                            <template v-slot:item.number="{ item, index, headers }">
                                <tr> {{index+1}} </tr>
                            </template>
                            <template v-slot:item.strategy="{item}">
                                <ul class="list-disc">
                                    <li class="mt-2 mb-2 text-xs" v-for="strategy,i in item.strategy" :key="i">{{strategy.name}}</li>
                                </ul>
                            </template>
                            <template v-slot:item.risk_type="{item}">
                                <ul>
                                    <li class="mt-2 mb-2 text-xs" v-for="risk_type,i in item.risk_type" :key="i">{{risk_type.name}}</li>
                                </ul>
                            </template>
                              <template v-slot:item.risk_type="{item}">
                                <ul>
                                    <li class="mt-2 mb-2 text-xs" v-for="risk_type,i in item.risk_type" :key="i">{{risk_type.name}}</li>
                                </ul>
                            </template>
                            <template v-slot:item.rate_full0="{item}">
                                <div class="w-full h-full flex justify-center items-center text-center" :style="`background:${getRiskColorBG(item.rate0)}`">
                                   {{item.rate_full0}}
                                </div>
                            </template>
                             <template v-slot:item.rate_full6="{item}">
                                <div class="w-full h-full flex justify-center items-center text-center" :style="`background:${getRiskColorBG(item.rate6)}`">
                                   {{item.rate_full6}}
                                </div>
                            </template>
                             <template v-slot:item.rate_full12="{item}">
                                <div class="w-full h-full flex justify-center items-center text-center" :style="`background:${getRiskColorBG(item.rate12)}`">
                                   {{item.rate_full12}}
                                </div>
                            </template>
                        </v-data-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card-text>
    </v-card>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'
import _ from 'lodash'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
@Component
export default class ListRisks extends Vue {
    @Prop() agency!: number;
    @Prop() printMode!: boolean;
    search: string = ''
    risks: any = []
    strategics: any = []
    response: boolean = false;
    panel:any = [0]

    headers: any = [
        { text: 'ลำดับ:', value: 'number', sortable: false },
        { text: 'ประเด็นความเสี่ยง:', value: 'name' },
        { text: 'หน่วยงาน:', value: 'agency_name' },
        { text: 'พันธกิจ:', value: 'mission_name' }, 
        { text: 'กลยุทธ์', value: 'strategy' ,sortable:false },
        { text: 'ประเภทความเสี่ยง S-O-F-C-E-G:', value: 'risk_type' , sortable:false },
        { text: 'RM-Plan (โอกาส x ผลกระทบ)', value: 'rate_full0' , sortable:false },
        { text: 'RM-6 (โอกาส x ผลกระทบ)', value: 'rate_full6' , sortable:false },
        { text: 'RM-12 (โอกาส x ผลกระทบ)', value: 'rate_full12' , sortable:false },
        // { text: 'Export', value: 'action', sortable: false }
    ]

    async getTitle() {
        this.strategics = await Core.getHttp(`/api/strategic-full/?year=${Core.currentYearTxt}`)
        this.strategics = _.sortBy(this.strategics, (o) => { return o.name; })
    }
    private async created() {
        await Web.switchLoad(true)
        await this.initialize();
        await this.getTitle();
         if(this.printMode == true){ 
             
             this.panel = [0,1,2,3,4,5]
            console.log([Array(this.strategics).keys()].map((k, i) => i))
        }
        await Web.switchLoad(false)
    }

    async initialize() {
        this.risks = CoreRisk.risks
        this.response = true;
       
    }

    async loadRisk(val: any) {
        await this.$emit('loadRisk', val)
    }

    getRiskColorBG(value:any) {
            if (value == 'ต่ำ' || value == 'น้อย') {
                return "#ccffcc";
            } else if (value == 'ปานกลาง') {
                return "#ffffcc";
            } else if (value == 'สูง') {
                return "#ffc299";
            } else if (value == 'สูงมาก') {
                return "#ffcccc";
            } else {
                return "white";
            }
        }

    // get risks() {
    //     return 
    // }
}
</script>

<style lang="scss" scoped>
.aProperty {
    color: gray;
}
</style>
