<template>
    <v-select v-model="currentYear" :items="years" item-text="year" item-value="id" return-object solo label="ปีงบประมาณ"></v-select>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import {Core} from '@/vuexes/core'
import {CoreRisk} from '@/vuexes/core_risk'

import {Auth} from '@/vuexes/auth'

@Component
export default class YearSelect extends Vue {
    @Prop() private aProperty!: string;
    private currentYear:any = Core.currentYear
    private years:any = Core.years
    private user:any =  Auth.user


    @Watch('currentYear')
    private async yearChange(newVal:{},oldVal:{}){
      await Core.setYear(newVal)
      await this.callback()
    }


    private async callback(){
      this.$emit('yearChange',this.currentYear)
    }



}

</script>

<style scoped lang="scss">
.aProperty {
    color: gray;
}
</style>
