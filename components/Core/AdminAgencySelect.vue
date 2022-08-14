<template>
<div class="flex flex-col md:flex-row">
    <v-checkbox disabled @change="allChange" label="ทั้งหมด" v-model="all"></v-checkbox>

</div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'

import { Auth } from '@/vuexes/auth' 

@Component
export default class YearSelect extends Vue {
    @Prop() private aProperty!: string;
    private currentAgency: any = null
    private agencies: any = Core.agencies
    private user: any = Auth.user
    private all: boolean = true
    
    private async created() {
        this.currentAgency = this.user.agency_id
           this.all = true;
        await this.allChange()
    }

    private async agencyChange() {
        this.all = true;
        await this.callback()
    }

    private async allChange() {
        console.log(this.all)
            this.currentAgency = null
            await this.$emit('allChange', this.currentAgency)

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
