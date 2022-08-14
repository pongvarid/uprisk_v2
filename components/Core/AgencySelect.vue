<template>
<div class="flex flex-col md:flex-row">
    <v-autocomplete @change="agencyChange" v-model="currentAgency" :items="agencies" item-text="name" item-value="id" solo label="หน่วยงาน"></v-autocomplete>
    <v-checkbox v-if="!allCheck" @change="allChange" label="ทั้งหมด" v-model="all"></v-checkbox>  

</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'

import { Auth } from '@/vuexes/auth' 

@Component
export default class YearSelect extends Vue {
    @Prop() private allCheck!: boolean;
    @Prop() private aProperty!: string;
    private currentAgency: any = null
    private agencies: any = Core.agencies
    private user: any = Auth.user
    private all: boolean = false
    
    private async created() {
        this.currentAgency = this.user.agency_id
    }

    private async agencyChange() {
        this.all = false;
        await this.callback()
    }

    private async allChange() {
        if (this.all == true) {
            console.log(this.all)
            this.currentAgency = null
            await this.$emit('allChange', this.currentAgency)
        } else {
            console.log(this.all)
            this.currentAgency = this.user.agency_id 
            await this.agencyChange();
        }

    }

    private async callback() {
        await Auth.changeAgency(this.currentAgency)
        this.$emit('agencyChange', this.currentAgency)
    }

}
</script>

<style lang="scss" scoped>
.aProperty {
    color: gray;
}
</style>
