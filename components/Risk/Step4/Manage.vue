<template>
<div class="w-full   p-4">
    <form @submit.prevent="create()" class="flex">
        <v-text-field v-if="!readonly" v-model="form.value" required dense outlined label="มาตรกรจัดการความเสี่ยง"></v-text-field>
        <v-btn v-if="!readonly" class="ml-2" type="submit" color="success">เพิ่มมาตรการ</v-btn>

    </form>

    <v-timeline align-top dense>
        <v-timeline-item large v-for="(maesure,i) in maesures" :key="i" color="blue">
            <template v-slot:icon class="p-4">
                <span class="text-xl text-white">{{number}}.{{ i + 1 }}</span>
            </template>
            <div>
                <h2 v-if="maesure.rm_type!= 1" class="font-bold text-base text-blue-600">(มาตรกรจัดการความเสี่ยงรอบ {{rm_type}} เดือน)</h2>
                <h2 v-else class="font-bold text-base text-blue-600">(มาตรกรจัดการความเสี่ยงรอบแผน)</h2>
                <v-textarea rows="2"  :readonly="(maesure.rm_type != rm_type)" name="name" id="id" v-model="maesure.value"></v-textarea>
                <v-textarea outlined rows="2" label="ผลการดำเนินงาน" v-if="maesure.rm_type != rm_type" name="name" id="id" v-model="maesure.result"></v-textarea>
                <div class="  mt-2" v-if="maesure.rm_type != rm_type">
  
                    <v-select   v-model="maesure.status"  outlined dense :items="['ดำเนินการเสร็จสิ้น','อยู่ระหว่างดำเนินการ','ยังไม่ได้ดำเนินการ','ยกเลิกการดำเนินการ']" label="การติดตามผล"></v-select>
                    <v-text-field class="ml-1"  outlined dense  v-if="maesure.status != 'ดำเนินการเสร็จสิ้น'  " v-model="maesure.ect" label="เหตุผล" ></v-text-field>
    
                </div>
                <div class="flex">
                    <v-spacer></v-spacer>
                    <v-btn v-if="maesure.rm_type != rm_type" @click="update(maesure)" small color="success">บันทึกผลการดำเนินงาน</v-btn>

                    <v-btn v-if="!readonly && maesure.rm_type == rm_type" @click="update(maesure)" small outlined color="primary">บันทึกการแก้ไขมาตรกรจัดการความเสี่ยง</v-btn>
                    <v-btn v-if="!readonly && maesure.rm_type == rm_type" @click="remove(maesure.id)" class="ml-1" small outlined color="red">ลบ</v-btn>
                </div>
            </div>
        </v-timeline-item>
    </v-timeline>

</div>
</template>

<script>
import { Core } from "@/vuexes/core";
export default {
    props: {
        effect: {
            default: null
        },
        readonly: {
            default: false
        },
        rm_type: {
            default: 1
        },
        number:{
            default:1
        }
    },
    data() {
        return ({
            maesures: [],
            form: {},
            response: false
        })
    },
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            this.response = false;
            this.form = {}
            this.maesures = await Core.getHttp(`/api/maesures/?effect=${this.effect}`)
            this.response = true;
        },
        async create() {
            this.form.effect = this.effect
            this.form.rm_type = this.rm_type
            await Core.postHttpAlert(`/api/maesures/`, this.form)
            await this.run();
        },
        async update(maesure) {
            await Core.putHttpAlert(`/api/maesures/${maesure.id}/`, maesure)
            await this.run();
        },
        async remove(id) {
            await Core.deleteHttpAlert(`/api/maesures/${id}/`)
            await this.run();
        },
  
    }
}
</script>

<style>

</style>
