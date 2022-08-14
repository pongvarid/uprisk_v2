<template>
<div class="step6">

    <v-tabs v-model="tab" color="primary" slider-color="primary">
        <v-tab>
            ภาพรวม
        </v-tab>
        <v-tab-item>
            <v-card outlined class="m-6 p-6">
                  <h2 class="text-xl font-bold">
            ระดับความเสี่ยง = ระดับโอกาส x ระดับผลกระทบ
        </h2>
                <table style="width: 100%;" border="1" cellpadding="2">
                    <tbody v-if='response'>
                        <tr>
                            <td>ระดับ</td>
                            <td>ระดับโอกาส</td>
                            <td>ระดับผลกระทบ</td>
                            <td>ระดับความเสี่ยง</td>

                        </tr>
                        <tr  >
                            <td>รอบแผน</td>
                            <td v-if="rm1 ">{{rm1.chance}}</td>
                            <td v-if="rm1 ">{{rm1.result}}</td>
                            <td v-if="rm1  ">{{rm1.xscore}}</td>
                            <td v-else>
                                <v-btn @click="tab=1" color="success">เพิ่มข้อมูล</v-btn>
                            </td>

                        </tr>

                        <tr  v-if="rm_type > 1" >
                            <td>รอบ 6 เดือน</td>
                            <td v-if="rm6 && rm_type != 1  ">{{rm6.chance}}</td>
                            <td v-if="rm6 && rm_type != 1  ">{{rm6.result}}</td>
                            <td v-if="rm6 && rm_type != 1  ">{{rm6.xscore}}</td>
                            <td v-else>
                                <v-btn @click="tab=2" color="success">เพิ่มข้อมูล</v-btn>
                            </td>
                        </tr>
                        <tr v-if="rm_type == 12">
                            <td>รอบ 12 เดือน</td>
                            <td v-if="rm12 && rm_type != 6 && rm_type != 1">{{rm12.chance}}</td>
                            <td v-if="rm12 && rm_type != 6 && rm_type != 1">{{rm12.result}}</td>
                            <td v-if="rm12 && rm_type != 6 && rm_type != 1">{{rm12.xscore}}</td>
                            <td v-else>
                                <v-btn @click="tab=3" color="success">เพิ่มข้อมูล</v-btn>
                            </td>
                        </tr>

                        <tr v-if="rm_type == 12 && rm6">
                            <td>คงเดิม/ลดลง/เพิ่มขึ้นจากแผน (รอบ 6 เดือน)</td>
                            <td>
                                {{rm6.chance_up}}

                            </td>
                            <td> {{rm6.result_up}} </td>
                            <td>{{rm6.xscore_up}} </td>
                            <!-- <td></td> -->
                        </tr>

                        <tr v-if="rm_type != 1 && formData">
                            <td>คงเดิม/ลดลง/เพิ่มขึ้นจากแผน (รอบ {{rm_type}} เดือน)</td>
                            <td>
                                <v-text-field outlined dense v-model="formData.chance_up" label="เหตุผล"></v-text-field>
                            </td>
                            <td>
                                <v-text-field outlined dense v-model="formData.result_up" label="เหตุผล"></v-text-field>
                            </td>
                            <td>
                                <v-text-field outlined dense v-model="formData.xscore_up" label="เหตุผล"></v-text-field>
                            </td>
                            <!-- <td></td> -->
                        </tr>
                    </tbody>
                </table>
                <v-toolbar flat v-if="formData && (rm_type == 6 || rm_type == 12 )">
                    <v-spacer></v-spacer>
                    <v-btn @click="saveData()" color="success">บันทึกข้อมูล</v-btn>
                </v-toolbar>
            </v-card>
        </v-tab-item>
        <v-tab>
            (RM-Plan)
        </v-tab>
        <v-tab-item >
            <Risk-Step6-Table :rm_type="1" :risk="risk" @reload="reload"></Risk-Step6-Table>
        </v-tab-item>
        <v-tab v-if="rm_type > 1  ">
            (RM-6)
        </v-tab>
        <v-tab-item>
            <Risk-Step6-Table :rm_type="6" :risk="risk" @reload="reload"></Risk-Step6-Table>
        </v-tab-item>
        <v-tab v-if="rm_type>6  ">
            (RM-12)
        </v-tab>
        <v-tab-item>
            <Risk-Step6-Table :rm_type="12" :risk="risk" @reload="reload"></Risk-Step6-Table>
        </v-tab-item>
    </v-tabs>

    <!-- <Risk-Step6-Table :risk="risk"></Risk-Step6-Table> -->

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
        readonly: { default: false },
        rm_type: {
            default: 1
        }
    },
    data() {
        return {
            choices: Core.choices,
            form: {},
            formData: {},
            editMode: false,
            rm1: null,
            rm6: null,
            rm12: null,
            tab: 0,
            response: false
        };
    },
    computed: {
        finishStep() {
            return (
                this.form.i1 &&
                this.form.i2 &&
                this.form.i3 &&
                this.form.i4 &&
                this.form.i5 &&
                this.form.l1 &&
                this.form.l2 &&
                this.form.l3 &&
                this.form.l4 &&
                this.form.l5
            );
        },
    },
    methods: {
        async reload(val) {
            await this.loadData();
            this.tab = 0
        },
        async loadData() {
            this.response = false;
            let data = await Core.getHttp(
                `/api/riskdata/?risk=${this.risk.id}`
            );
            this.rm1 = await _.find(data, { rm_type: 1 })
            this.rm6 = await _.find(data, { rm_type: 6 })
            this.rm12 = await _.find(data, { rm_type: 12 })
            if (this.rm_type == 1) {this.tab = 1}
            if (this.rm_type == 6) {
            
                this.formData = this.rm6
            } else if (this.rm_type == 12) {
                this.formData = this.rm12
            }
            this.response = true;
        },
        async saveData() {
            await Core.putHttpAlert(`/api/riskdata/${this.formData.id}/`, this.formData)

            await this.loadData();
        },
        async setDefault() {
            this.form = Object.assign({}, this.defaultForm);
        },
        async calculateRate() {
            this.form.xscore = this.form.chance * this.form.result;
            console.log(this.form.xscore);
            let data = this.getRiskType(this.form.xscore);
            this.form.xresult = data.detail;
            this.form.xrate = data.rate;
        },
        getRiskType(value) {
            if (value >= 0 && value <= 2) {
                return {
                    rate: "น้อย",
                    detail: "ระดับความเสี่ยงที่หน่วยงานยอมรับได้ ซึ่งอาจดำเนินการควบคุมภายในตามแผนงานที่มีอยู่เพื่อควบคุมหรือลดระดับความเสี่ยงให้หมดไป และป้องกันไม่ให้กลับเพิ่มสูงขึ้น",
                };
            } else if (value >= 3 && value <= 6) {
                return {
                    rate: "ปานกลาง",
                    detail: "ระดับความเสี่ยงที่หน่วยงานสามารถยอมรับได้ แต่ต้องดำเนินการควบคุมภายในตามแผนงาน ที่มีอยู่อย่างต่อเนื่อง เพื่อให้ระดับความเสี่ยงลดน้อยลงและไม่กลับเพิ่มสูงขึ้น",
                };
            } else if (value >= 7 && value <= 12) {
                return {
                    rate: "สูง",
                    detail: "ระดับความเสี่ยงที่หน่วยงานไม่สามารถยอมรับได้ ซึ่งต้องจัดหามาตรการในการป้องกันหรือ ลดความเสี่ยงโดยเร็ว เพื่อให้ระดับความเสี่ยงลดลงอยู่ในระดับที่ยอมรับได้และไม่กลับเพิ่มสูงขึ้น",
                };
            } else if (value >= 13 && value <= 25) {
                return {
                    rate: "สูงมาก",
                    detail: "ระดับความเสี่ยงที่หน่วยงานไม่สามารถยอมรับได้ ซึ่งต้องจัดหามาตรการในการป้องกันหรือ ลดความเสี่ยงอย่างเร่งด่วน เพื่อให้ระดับความเสี่ยงลดลงอยู่ในระดับที่ยอมรับได้และไม่กลับเพิ่มสูงขึ้น",
                };
            } else {
                return {
                    rate: "ไม่ระบุ",
                    detail: "",
                };
            }
        },
        getRiskColorBG(value) {
            if (value >= 0 && value <= 1) {
                return "#ccffcc";
            } else if (value >= 2 && value <= 2.9) {
                return "#ffffcc";
            } else if (value >= 3 && value <= 3.9) {
                return "#ffc299";
            } else if (value >= 4 && value <= 5) {
                return "#ffcccc";
            } else {
                return "#b3ecff";
            }
        },

        getRiskColor(value) {
            if (value >= 0 && value <= 2) {
                return "green";
            } else if (value >= 3 && value <= 6) {
                return "#c0b812";
            } else if (value >= 7 && value <= 12) {
                return "orange";
            } else if (value >= 13 && value <= 25) {
                return "red";
            } else {
                return "blue";
            }
        },
        getRiskPercent(value) {
            return (value / 25) * 100;
        },
    },
    async created() {
        await this.setDefault();
        await this.loadData();
    },
};
</script>

<style>
.step6>table,
td,
th {
    border: 1px solid black;
}

.step6 table>tbody>tr>td {
    padding: 6px;
    font-weight: bold;
}

.step6>table {
    width: 100%;
    border-collapse: collapse;
}
</style>
