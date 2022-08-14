<template>
<div>
    <v-card outlined class="p-6">
        <h2 class="text-xl font-bold text-red-500"> ผลกระทบของความเสี่ยงและมาตรการจัดการความเสี่ยง </h2>

        <form @submit.prevent="saveEffect()" class="p-4">
            <div class="flex">
                <v-select dense outlined v-model="form.value" label="ระบุผลกระทบ" :items="choices.effects" item-text="value" item-value="id"></v-select>
            </div>
            <div class="w-full" v-if="form.value == choices.effect_other_id">
                <v-text-field v-model="form.value_other" required dense outlined label="ผลกระทบอื่นๆ"></v-text-field>
            </div>
            <div class="flex">
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success"> + เพิ่มผลกระทบของความเสี่ยงและมาตรการจัดการความเสี่ยง
                </v-btn>

            </div>

        </form>

        <div class="flex mt-2">
            <div class="w-3/4"> <br>

                <v-timeline align-top dense>
                    <v-timeline-item v-for="(effect,i) in effects" :key="i" color="purple" large>
                        <template v-slot:icon class="p-4">
                            <span class="text-xl text-white">{{ i + 1 }}</span> 
                        </template>
                           <Core-RMTitle :rm_type="effect.rm_type" />
                        <div class="flex">
                          
                            <v-select label="ผลกระทบ" dense outlined v-model="effect.value" :items="choices.effects" item-text="value" item-value="id"></v-select>
                            <v-text-field readonly v-if="effect.value == choices.effect_other_id" v-model="effect.value_other" required dense outlined label="ผลกระทบอื่นๆ"></v-text-field>

                            <v-btn class="ml-2" @click="editEffect(effect)" outlined dark color="warning">บันทึกข้อมูลการแก้ไข</v-btn>
                            <v-btn class="ml-1" @click="deleteEffect(effect.id)" outlined dark color="red">ลบ</v-btn>
                        </div>

                        <span class="font-bold">มาตรกรจัดการความเสี่ยง</span>
                        <Risk-Step4-Manage :number="i + 1" :rm_type="rm_type" :effect="effect.id"></Risk-Step4-Manage>
                        <br>
                    </v-timeline-item>
                </v-timeline>
            </div>
            <!-- <div class="w-1/2 flex flex-col justify-center items-center h-auto">
                <i class="em em-chart_with_upwards_trend text-6xl" aria-role="presentation" aria-label="CHART WITH UPWARDS TREND"></i>
            </div> -->
        </div>
    </v-card>
    <Risk-Step4-Overall v-if="rm_type >= 6 && rm_type < 12"   :risk="risk" :current_type="6" :rm_type="rm_type" class="mt-6" />
    <Risk-Step4-Overall v-if="rm_type >= 12"   :risk="risk" :current_type="12" :rm_type="rm_type" class="mt-6" />
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";
import _ from 'lodash'

export default {
    name: "Step2A",
    props: {
        risk: {
            default: {}
        },
        rm_type: {
            default: 6
        }
    },
    data() {
        return ({
            dialog: false,
            choices: Core.choices,
            defaultForm: {
                rm_type: this.rm_type,
                risk: this.risk.id
            },
            form: {},

            effects: [],
            maesure: '',
            maesureResponse: true,
            maesureView: true
        })
    },
    methods: {
        async addMaesure() {
            if (this.form.maesure) {
                this.form.maesure.push(this.maesure)
            } else {
                this.form.maesure = []
                this.form.maesure.push(this.maesure)
            }
            this.maesure = ''
        },
        async removeMaesure(value) {
            this.maesureResponse = false;
            let arr = this.form.maesure
            arr = arr.filter(item => item !== value)
            this.form.maesure = arr
            console.log(this.form.maesure);
            this.maesureResponse = true;
        },
        async loadEffect() {
            this.effects = await Core.getHttp(`/api/effect/?risk=${this.risk.id}`)
            this.effects = await _.sortBy(this.effects, ['value'])

            this.effects =  _.filter(this.effects,(r)=>{return r.rm_type <= this.rm_type})


        },
        async saveEffect() {
            let effect = null
            this.form.rm_type = this.rm_type
            this.form.maesure = JSON.stringify(this.form.maesure)
            if (!this.form.id) {
                effect = await Core.postHttpAlert(`/api/effect/`, this.form)
            } else {
                effect = await Core.putHttpAlert(`/api/effect/${this.form.id}/`, this.form)
            }

            if (effect.id) {
                this.form = {}
                await this.setDefault();
                await this.loadEffect();
                this.dialog = false
                this.maesureView = true;
            }
        },
        async deleteEffect(id) {
            await Core.deleteHttpAlert(`/api/effect/${id}/`)
            await this.loadEffect();
        },
        async editEffect(effect) {

            this.form = effect
            await this.saveEffect();

        },
        async setDefault() {
            this.form = Object.assign({}, this.defaultForm)
        },
        strToArr(data) {
            return JSON.parse(data);
        }

    },
    async created() {
        await Web.switchLoad(true)
        await this.setDefault();
        await this.loadEffect();
        await Web.switchLoad(false)
    }
}
</script>

<style>

</style>
