<template>
<div> 
    <v-card outlined class="p-6">
        <h2 class="text-base font-bold">กำหนดความเสี่ยง</h2>
        <br />

        <div class="flex mt-2">
            <div class="w-1/2">
                <h2 class="text-xl mb-2">ชื่อความเสี่ยง</h2>
                <v-text-field v-model="risk.name" outlined dense label="ความเสี่ยง"></v-text-field>
                <h2 class="text-xl mb-2">พันธกิจ/ยุทธศาสตร์</h2>
                <v-select v-model="risk.mission" :items="choices.mission" item-text="name" item-value="id" outlined placeholder="เลือกข้อมูล" label="พันธกิจมหาวิทยาลัย"></v-select>

                <v-select v-on:input="limiter" chips v-model="risk.strategic" item-text="name" item-value="id" multiple :items="choices.strategic" outlined placeholder="เลือกข้อมูล" label="ยุทธศาสตร์มหาวิทยาลัย"></v-select>
                <div class="flex">
                    <h2 class="text-xl mb-2">กลยุทธ์</h2>
                    <v-spacer></v-spacer>
                    <v-btn v-if="user.is_agency_admin" small color="primary" @click="$router.push('/choice?tab=2')">เพิ่มตัวเลือกกลยุทธ์ (แอดมิน)</v-btn>
                </div>

                <v-autocomplete chips item-text="fullname" item-value="id" v-model="risk.strategy" multiple :items="strategies" outlined placeholder="เลือกข้อมูล" label="ตัวเลือกกลยุทธ์"></v-autocomplete>

            </div>
            <div class="w-1/2 flex flex-col justify-center items-center h-auto">
                <i class="em em-triangular_flag_on_post text-6xl" aria-role="presentation" aria-label="TRIANGULAR FLAG ON POST"></i>
            </div>
        </div>
    </v-card>
    <br />
    <v-card outlined class="p-6">
        <h2 class="text-xl font-bold">ประเภทความเสี่ยง</h2>

        <div class="flex mt-2">
            <div class="w-10/12">
                <br />
                <v-select chips item-text="name" item-value="id" v-model="risk.risk_type" multiple :items="choices.risktype" outlined label="ประเภทความเสี่ยง (S-O-F-C-E-G)" autocomplete></v-select>
                <h2 class="text-xl mb-2">เป้าประสงค์/เป้าหมาย</h2>
                <v-textarea v-model="risk.point" outlined placeholder="ระบุข้อมูล" label="เป้าประสงค์/เป้าหมาย"></v-textarea>

            </div>
            <div class="w-2/12 flex flex-col justify-center items-center h-auto">
                <i class="em em-triangular_ruler text-6xl" aria-role="presentation" aria-label="TRIANGULAR RULER"></i>
            </div>
        </div>
    </v-card>

    <v-toolbar class="p-4 mt-6" flat color="transparent">
        <v-spacer></v-spacer>
        <v-btn large color="success" @click="saveRisk()">บันทึกข้อมูล</v-btn>
    </v-toolbar>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Auth } from "@/vuexes/auth";
import { Web } from "@/vuexes/web";

export default {
    props: {
        risk: {
            default: {},
        },
    },
    data() {
        return {
            choices: Core.choices,
            user: Auth.user,
            strategies:[]
        };
    },
    computed: {},
    async created() {
        await this.load();
},
    methods: {

        async load(){
            if(this.risk.strategic[0]){
                await this.filterStrategy(this.risk.strategic[0])
            } 
        },
       async  limiter(e) {
             console.log('STATE',e)
            if (e.length > 1) { 
                this.risk.strategic[0] = e[1]
               await this.filterStrategy( e[1])
               this.risk.strategy = []
                console.log(' you can only select two', e)
                e.pop()
            }else if(e.length == 1){
               await this.filterStrategy( e[0])
               this.risk.strategy = []
            }
        },

        async filterStrategy(id){
            let data = _.filter(this.choices.strategy  ,{strategic:id})
            this.strategies  = _.sortBy(data,'name')
        },
        async saveRisk() {
            let risk = await Core.putHttp(`/api/risk/${this.risk.id}/`, this.risk);
            if (risk.id) {
                await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
            }
            await this.$emit("reload");
        },
    },
};
</script>
