<template>
<div>
    <v-card outlined class="p-6">
        <br />
        <h2 class="font-bold">
            <i class="em em-control_knobs mr-2" aria-role="presentation" aria-label=""></i>การควบคุมที่มีอยู่ในปัจจุบัน {{rm_type}}
        </h2>
        <form @submit.prevent="saveControl()" class="flex mt-4">
            <v-text-field required v-model="controlForm.value" dense outlined label="ระบุการควบคุม"></v-text-field>
            <v-btn type="submit" color="warning" class="ml-2"> + เพิ่ม</v-btn>
        </form>

        <v-timeline align-top dense v-if="response">
            <v-timeline-item large v-for="(control, i) in controls" :key="i" color="purple" small>
                <template v-slot:icon class="p-4">
                    <span class="text-xl text-white">{{ i + 1 }}</span>
                </template>
                <!----Form Mode----------------------------------------------------------------------------------->
                <Core-RMTitle :rm_type="control.rm_type" />
                <div v-if="control.rm_type == Number(rm_type)">
                    <v-textarea rows="2" v-model="control.value" dense outlined label="ระบุการควบคุม"></v-textarea>
                    <div class="flex">
                        <v-spacer></v-spacer>
                        <v-btn @click="editControl(control)" small outlined dark color="primary">บันทึกข้อมูลการแก้ไข</v-btn>
                        <v-btn class="ml-2" @click="deleteControl(control.id)" small outlined dark color="red">ลบ</v-btn>
                    </div>
                </div>
                <!----Read Mode----------------------------------------------------------------------------------->
                <div v-else>
                    <p>{{control.value}}</p>
                </div>

                <div class="  mt-2" v-if="control.rm_type != Number(rm_type)  ">

                    <v-select v-model="control.status" outlined dense :items="['ดำเนินการเสร็จสิ้น','อยู่ระหว่างดำเนินการ','ยังไม่ได้ดำเนินการ','ยกเลิกการดำเนินการ']" label="การติดตามผล"></v-select>
                    <v-text-field class="ml-1" outlined dense v-if="control.status != 'ดำเนินการเสร็จสิ้น'   " v-model="control.ect" label="เหตุผล"></v-text-field>
                    <v-textarea outlined rows="2" label="ผลการดำเนินงาน" v-if="control.rm_type != rm_type" name="name" id="id" v-model="control.result"></v-textarea>

                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-btn @click="editControl(control)" small outlined dark color="primary">บันทึกข้อมูลการติดตามผล</v-btn>
                    </v-toolbar>

                </div>

            </v-timeline-item>
        </v-timeline>
    </v-card>

    <Risk-Step3-Overall v-if="rm_type >= 6 && rm_type < 12" :risk="risk" :current_type="6" :rm_type="rm_type" class="mt-6" />
    <Risk-Step3-Overall v-if="rm_type >= 12" :risk="risk" :current_type="12" :rm_type="rm_type" class="mt-6" />

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
            controlForm: {},
            controls: [],
            response: false,
        };
    },
    computed: {},
    methods: {
        filter(data, fill) {
            return _.filter(data, fill);
        },
        async saveControl() {
            this.controlForm.rm_type = this.rm_type
            let control = await Core.postHttpAlert(`/api/control/`, this.controlForm);
            if (control.id) {
                await this.loadControl();
                await this.setDefault();
            }
        },
        async loadControl() {
            this.controls = await Core.getHttp(
                `/api/control/?risk=${this.risk.id}`
            );
            
            this.controls =  _.filter(this.controls,(r)=>{return r.rm_type <= this.rm_type})

            console.log(this.controls)
        },
        async deleteControl(id) {
            await Core.deleteHttpAlert(`/api/control/${id}/`);
            await this.loadControl();
        },
        async editControl(control) {
            await Core.putHttpAlert(`/api/control/${control.id}/`, control);
            await this.loadControl();
        },

        async setDefault() {
            this.controlForm = Object.assign({}, this.defaultForm);
        },
    },
    async created() {
        await Web.switchLoad(true)
        await this.setDefault();
        await this.loadControl();
        this.response = true;
        await Web.switchLoad(false)
    },
};
</script>

<style>

</style>
