<template>
<v-col class="pt-4" v-if="response">
    <v-toolbar flat color="transparent">
        <div class="flex">
            <v-btn @click="$router.go(-1)" text>หน้าแรก /</v-btn>
            <v-btn color="primary" text><span class="truncate w-44">{{ risk.name }} </span> /</v-btn>
        </div>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div class="flex flex-wrap overflow-hidden">

        <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
            <p class="text-sm md:text-xl font-bold">{{ risk.name }}</p>
        </div>

        <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div class="flex float-right ">
                <v-btn class="mr-2" @click="dialog = true" color="primary"><i class="mdi mdi-file-pdf-box text-xl mr-2" aria-role="presentation" aria-label=""></i> <span class="hidden md:inline-block">ส่งออกเป็นไฟล์ PDF</span></v-btn>
                <v-btn dark @click="deleteRisk()" color="red">
                    <v-icon>mdi-delete</v-icon> <span class="hidden md:inline-block">ลบความเสี่ยงนี้</span>
                </v-btn>
            </div>
        </div>

    </div>

    <!-- <v-toolbar flat color="transparent">
      <p class="text-sm md:text-xl font-bold">{{ risk.name }}</p>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" @click="dialog = true" color="primary"
        ><i class="mdi mdi-file-pdf-box text-xl mr-2" aria-role="presentation" aria-label=""></i> ส่งออกเป็นไฟล์ PDF</v-btn
      >

      <v-btn dark @click="deleteRisk()" color="red"
        ><v-icon>mdi-delete</v-icon> ลบความเสี่ยงนี้</v-btn
      >
    </v-toolbar> -->
    <div class="p-4">
        <h3 class="text-xl"><i class="em em-calendar mr-2" aria-role="presentation" aria-label="TEAR-OFF CALENDAR"></i>ปีงบประมาณ {{ year }}</h3>
        <h3 class="ml-8"> พันธกิจ {{ mission }}</h3>
    </div>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>ส่งออกเป็นไฟล์ PDF</v-card-title>
            <v-card-text>
                <!-- <v-alert type="info">
                    ยังเปิดให้บริการ ส่งออกเป็นไฟล์ PDF ในขณะนี้
                </v-alert> -->
                <div class="mt-6">

                 
                    <v-btn @click="generateReport()" block>RM-Plan</v-btn><br />
                     <v-btn @click="generateReport6()" block>RM-6</v-btn><br />
                        <v-btn @click="generateReport12()" block>RM-12</v-btn><br />
                    <!-- <v-btn @click="$router.push(`/report6?id=${risk.id}`)" block>RM-6</v-btn><br /> -->
                    <!-- <v-btn @click="$router.push(`/report12?id=${risk.id}`)" block>RM-12</v-btn> -->

                </div>
            </v-card-text>
        </v-card>
    </v-dialog>

    <div class="flex flex-wrap overflow-hidden">
        <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/3 p-3">
            <Core-Card :path="`/rm1?id=${risk.id}`" head="RM-Plan" subHead="แผนการจัดการ เริ่มต้น"></Core-Card>
        </div>

        <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/3 p-3">
            <Core-Card :path="`/rm6?id=${risk.id}`" icon="em em-notebook_with_decorative_cover" head="RM-6" subHead="แผนการจัดการ รอบ 6 เดือน"></Core-Card>
        </div>

        <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/3 p-3">
            <Core-Card :path="`/rm12?id=${risk.id}`" icon="em em-books" head="RM-12" subHead="แผนการจัดการ รอบ 12 เดือน"></Core-Card>
        </div>
    </div>
</v-col>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Auth } from "@/vuexes/auth";
import { Risk } from "@/vuexes/risk";
import { Web } from "@/vuexes/web";
import { Report } from "@/vuexes/report";
import { Report6 } from "@/vuexes/report6"; 
import { Report12 } from "@/vuexes/report12";
export default {
    data() {
        return {
            core: Core,
            user: Auth.user,
            dialog: false,
            response: false,
            report: Report
        };
    },
    methods: {
        async generateReport() {
            let id = Number(this.$route.query.id)
            await Report.openReport(id)
        },
        async generateReport6() {
            let id = Number(this.$route.query.id)
            await Report6.openReport(id)
        },
          async generateReport12() {
            let id = Number(this.$route.query.id)
            await Report12.openReport(id)
        },
        async loadRisk() {
            let id = Number(this.$route.query.id);
            let risk = await Core.getHttp(`/api/risk/${id}/ `);
            await Risk.setRisk(risk);
        },
        async deleteRisk() {
            let check = await Web.confirm("คุณแน่ใจใช่ไหม");
            if (check) {
                let risk = await Core.deleteHttp(`/api/risk/${this.risk.id}/ `);
                await Web.confirm("ลบข้อมูลความเสี่ยงนี้แล้ว");
                await this.$router.go(-1);
            }
        },
    },
    async created() {
        await this.loadRisk();
        await Report.loadENV()
        this.response = true;
    },
    computed: {
        year() {
            let year = _.find(Core.years, { id: this.risk.year });
            return year.year;
        },
        risk() {
            return Risk.currentRisk;
        },
        mission() {
            let mission = _.find(Core.choices.mission, { id: this.risk.mission });
            return mission.name;
        },
    },
};
</script>
