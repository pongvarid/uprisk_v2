<template>
<div>
    <v-card outlined class="m-6 p-6">
        <h2 class="text-xl font-bold">ดัชนีชี้วัด</h2>

        <form @submit.prevent="saveKri()" class="flex">
            <v-text-field required outlined dense v-model="form.indicators" label="ดัชนีชี้วัดความเสี่ยง Key Risk Indicator (KRI)" id="id"></v-text-field>
            <v-text-field required outlined class="  ml-2 mr-2" dense v-model="form.target" label="ดัชนีชี้วัดความสำเร็จ (KPIs)" id="id"></v-text-field>
            <v-btn type="submit" color="warning"> + เพิ่ม</v-btn>
        </form>

        <div class="w-full">
            <v-timeline dense v-for="(kri, iex) in kris" :key="iex"> 
                <v-timeline-item color="purple" large>
                    <template v-slot:icon class="p-4">
                        <span class="text-xl text-white">{{ iex + 1 }}</span>
                    </template>
                    <div class="p-4 w-full"> 
                      
                        <!-- <h2 v-if="kri.rm_type!= 1" class="font-bold text-base text-blue-600">(มาตรกรจัดการความเสี่ยงรอบ {{kri.rm_type}} เดือน)</h2>
                        <h2 v-else class="font-bold text-base text-blue-600">(มาตรกรจัดการความเสี่ยงรอบแผน)</h2>   -->
                        <Core-RMTitle :rm_type="kri.rm_type" />
                        <h2 class="font-bold"><br>
                            <v-textarea :readonly="kri.rm_type != rm_type" rows="2" label="ดัชนีชี้วัดความเสี่ยง Key Risk Indicator (KRI)" outlined v-model="kri.indicators"></v-textarea>

                        </h2>
                        <div>
                            <v-textarea :readonly="kri.rm_type != rm_type" rows="2" outlined v-model="kri.target" label="ดัชนีชี้วัดความสำเร็จ (KPIs)" id="id"></v-textarea>

                        </div>

                        <div class="flex " v-if="kri.rm_type == rm_type">
                            <v-spacer></v-spacer>
                            <v-btn @click="updateKri(kri)" small outlined dark color="warning">บันทึกข้อมูลการแก้ไข</v-btn>
                            <v-btn class="ml-2" @click="deleteKri(kri.id)" small outlined dark color="red">ลบ</v-btn>
                        </div> <br>

                        <div>
                            <form @submit.prevent="updateKri(kri)" v-if="kri.rm_type != rm_type">
                                <v-textarea required v-model="kri.report" dense outlined label="ดัชนีชี้วัดความสำเร็จ (KPI)"></v-textarea>
                                <v-select dark :class="!kri.status ? 'green  ' : 'red'" dense outlined v-model="kri.status" item-text="name" item-value="val" :items="[
                        { name: 'ความเสี่ยงสูง', val: true },
                        { name: 'ความเสี่ยงต่ำ', val: false },
                      ]"></v-select>
                                <v-toolbar flat color="transparent">
                                   
                                    <v-spacer></v-spacer>
                                    <v-btn type="submit" color="success">บันทึก</v-btn>
                                </v-toolbar>
                            </form>
                        </div>
                    </div>
                </v-timeline-item>
            </v-timeline>
        </div>

    </v-card>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";
import _ from 'lodash'
export default {
    props: {
        risk: {
            default: {},
        },
        rm_type: {
            default: 1
        }
    },
    data() {
        return {
            choices: Core.choices,
            defaultForm: {
                rm_type: this.rm_type,
                risk: this.risk.id,
            },
            kris: [],
            form: {},
        };
    },
    computed: {},
    methods: {
        async loadKri() {
            this.kris = await Core.getHttp(
                `/api/kri/?risk=${this.risk.id}`
            );
            // this.kris = _.sortBy(this.kris, 'rm_type')
        },
        async saveKri() {
            // this.form.maesure = JSON.stringify(this.form.maesure)
            this.form.rm_type = this.rm_type
            let kri = await Core.postHttpAlert(`/api/kri/`, this.form)
            if (kri.id) {
                this.form = {}
                await this.setDefault();
                await this.loadKri();
            }
        },
        async updateKri(data) {
            // this.form.maesure = JSON.stringify(this.form.maesure)
            let kri = await Core.putHttpAlert(`/api/kri/${data.id}/`, data);
            if (kri.id) {
                await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
                await this.setDefault();
                await this.loadKri();
            }
        },
        async deleteKri(id) {
            await Core.deleteHttpAlert(`/api/kri/${id}/`);
            await this.loadKri();
        },
        async setDefault() {
            this.form = Object.assign({}, this.defaultForm);
        },
    },
    async created() {
        await this.setDefault();
        await this.loadKri();
    },
};
</script>
