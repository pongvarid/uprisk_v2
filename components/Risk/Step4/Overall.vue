<template>
<div><br>
    <v-card outlined class="p-6">
        <form @submit.prevent="update(form)" v-if="response">
            <h2 class="text-xl font-bold text-red-500">สรุปการประเมินผลตามมาตรการจัดการความเสี่ยง รอบ {{current_type}} เดือน </h2>
            <p> ระบุภาพรวมการประเมินผลตามมาตรการจัดการความเสี่ยง รอบ {{current_type}} เดือน </p>
            <v-textarea v-if="rm_type == current_type" v-model="form.text" rows="2" outlined label="โปรดระบุข้อมูล"></v-textarea>
            <p v-else>{{form.text}}</p>
            <h2 class="text-xl font-bold text-red-500">ประเมินประสิทธิภาพ ประสิทธิผลของมาตรการจัดการความเสี่ยง รอบ {{current_type}} เดือน</h2>
            <p>ระบุประเมินประสิทธิภาพ ประสิทธิผลของมาตรการจัดการความเสี่ยง รอบ {{current_type}} เดือน ว่ามีความเพียงพอและเหมาะสมหรือไม่ อย่างไร</p>
            <v-textarea v-if="rm_type == current_type" v-model="form.sufficient" rows="2" outlined label="โปรดระบุข้อมูล"></v-textarea>
            <p v-else>{{form.sufficient}}</p>
            <h2 class="text-xl font-bold text-red-500">การปรับปรุง/พัฒนามาตรการจัดการความเสี่ยง </h2>
            <p>ระบุการปรับปรุง/พัฒนามาตรการจัดการความเสี่ยง </p>
            <v-textarea v-if="rm_type == current_type" v-model="form.amend" rows="2" outlined label="โปรดระบุข้อมูล"></v-textarea>
            <p v-else>{{form.amend}}</p>

            <Risk-Step4-File class="mb-6" :risk="risk" :current_type="current_type" :rm_type="rm_type"></Risk-Step4-File>

            <div class="flex" v-if="rm_type == current_type">
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success">บันทึกข้อมูลสรุปการประเมินผลตามมาตรการจัดการความเสี่ยง รอบ {{current_type}} เดือน</v-btn>
            </div>
        </form>

    </v-card>

</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";

export default {
    props: {
        risk: {
            default: null
        },
        readonly: {
            default: false
        },
        rm_type: {
            default: 6
        },
        current_type: {
            default: 6
        }
    },
    data() {
        return ({
            rm: [],
            form: {},
            response: false
        })
    },
    async created() {
        await this.check()

    },
    methods: {
        async check() {
            this.response = false;
            let data = await Core.getHttp(`/api/conclusion/?risk=${this.risk.id}&rm_type=${this.current_type}`)
            await Web.switchLoad(true)
            console.log(data)
            if (data.length === 0) {
                let save = await Core.postHttp(`/api/conclusion/`, { "risk": this.risk.id, "rm_type": this.current_type })
                this.form = save

            } else if (data.length > 0) {
                console.log(data[data.length - 1])
                this.form = data[data.length - 1]

            }
            await Web.switchLoad(false)

            this.response = true;
        },

        async update(form) {
            await Core.putHttpAlert(`/api/conclusion/${form.id}/`, form)
            await this.check();
        },

    }
}
</script>

<style>

</style>
