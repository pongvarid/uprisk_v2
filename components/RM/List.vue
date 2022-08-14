<template>
<div class="  rounded-xl  " v-if="response">
 

    <v-card>
        <v-card-title>
          <span class="w-20 h-20 text-4xl object-cover rounded-full em em-card_index_dividers" aria-role="presentation" aria-label=""></span>   รายการความเสี่ยง
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field> <RM-Create v-if="!isEdit"  @reload="loadRisk" :agency="agency"></RM-Create>
        </v-card-title>
        <v-data-table :headers="headers" :items="risks" :search="search">
            
               <template  v-slot:item.strategy="{item}"> 
                 <ul class="list-disc">
                  <li class="mt-2 mb-2 text-xs" v-for="strategy,i in item.strategy" :key="i">{{strategy.name}}</li> 
                </ul> 
            </template>
            <template  v-slot:item.risk_type="{item}"> 
                 <ul >
                  <li class="mt-2 mb-2 text-xs" v-for="risk_type,i in item.risk_type" :key="i">{{risk_type.name}}</li> 
                </ul> 
            </template>
             <template v-if="!isEdit" v-slot:item.action="{item}"> 
               <div  >
                 <v-btn small @click="$router.push(`/risk?id=${item.id}`)" color="success">จัดการ</v-btn>
               </div>
            </template>
        </v-data-table>
    </v-card>

    

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CoreRisk } from '@/vuexes/core_risk'

@Component
export default class ListRisks extends Vue {
    @Prop() agency!:number;
    @Prop() isEdit!:boolean;
    search: string = ''
    risks: any = []
    headers: any = [
        { text: 'ประเด็นความเสี่ยง:', value: 'name' },
        { text: 'พันธกิจ:', value: 'mission_name' },
        { text: 'ยุทธศาสตร์:', value: 'strategic_name' },
        { text: 'หน่วยงาน', value: 'agency_name' , width:'10%' },
        { text: 'กลยุทธ์', value: 'strategy' ,sortable:false },
        { text: 'ประเภทความเสี่ยง S-O-F-C-E-G:', value: 'risk_type' , sortable:false },
        { text: 'จัดการ',value:'action', sortable:false }
    ]

    response: boolean = false;

    private async created() {
        await this.initialize();
    }

    async initialize()  {
          this.risks = CoreRisk.risks
        this.response = true;
    }

    async loadRisk(val:any){ 
      await this.$emit('loadRisk',val)
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
