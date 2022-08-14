<template>
<div>
    <v-card outlined class="m-1 p-6">
        <h2 class="text-xl font-bold">
            ระดับความเสี่ยง = ระดับโอกาส x ระดับผลกระทบ
        </h2>
        
        <!-- <h2>ระดับความเสี่ยงปัจจุบันเทียบกับระดับความเสี่ยงคงเหลือ</h2> -->
        <div class="mt-2 ml-4">
            <div class="w-full">
                <div class="w-full flex flex-row flex-wrap mt-3 p-3">
                    <div class="w-full">
                        <v-alert v-if="Number(this.form.xscore) > 25" dense border="left" type="error">
                            ผลลัพธ์ห้ามเกิน <b>25</b>
                        </v-alert>
                    </div>
                   
                    <v-select :readonly="readonly" 
                        :items="['1','2','3','4','5']"
                         @input="calculateRate" v-model="form.chance" class="w-5/12" outlined dense label="ระดับโอกาส"
                    ></v-select>
                     <h2 class="w-2/12">
                        <center>X</center>
                    </h2>
                     <v-select :readonly="readonly" 
                        :items="['1','2','3','4','5']"
                         @input="calculateRate" v-model="form.result" class="w-5/12" outlined dense label="ระดับผลกระทบ"
                    ></v-select>
                 
                    <div class="w-full flex flex-col justify-center item-center">
                        <h2 class="text-center">
                            ระดับความเสี่ยง = ระดับโอกาส x ระดับผลกระทบ
                        </h2>
                        <h2 class="font-bold" :style="`color:${getRiskColor(Number(this.form.xscore))}`">
                            {{ this.form.xrate }}
                        </h2>
                        <h2 class="text-4xl">
                            {{ this.form.xscore
                }}<span class="text-base text-gray-500">(โอกาส {{ this.form.chance }} x ผลกระทบ
                                {{ this.form.result }})</span>
                        </h2>
                        <v-progress-linear style="width: 100%" striped height="20" :buffer-value="100" :value="getRiskPercent(Number(this.form.xscore))" :color="getRiskColor(Number(this.form.xscore))">
                            <strong v-if="this.form.xscore > 0">{{ Number(this.form.xscore) }} =
                                {{ Number(this.form.chance) }} x
                                {{ Number(this.form.result) }}</strong></v-progress-linear>
                        <h2 :style="`color:${getRiskColor(Number(this.form.xscore))}`">
                            {{ this.form.xresult }}
                        </h2>
                    </div>

                    <div class="mt-3 p-3" v-if="
                form.chance && form.result && Number(this.form.xscore) <= 25
              ">
                        <h2 class="font-semibold">
                            หลักเกณฑ์การประเมินระดับโอกาส x ระดับผลกระทบ ของความเสี่ยง
                        </h2>
                        <br />
                        <div class="flex flex-row flex-wrap">
                            <h2 class="w-4/12">ระดับคะแนนความรุนแรง</h2>
                            <h2 class="w-4/12">ระดับโอกาสที่จะเกิดความเสี่ยง (Likelihood : L)</h2>
                            <h2 class="w-4/12">ระดับผลกระทบของความเสี่ยง (Impact : I)</h2>

                            <v-text-field disabled class="w-3/12" outlined dense label="1"></v-text-field>

                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.chance)
                  )}`" :readonly="readonly" v-model="form.l1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.result)
                  )}`" :readonly="readonly" v-model="form.i1" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>



                            <v-text-field disabled class="w-3/12" outlined dense label="2"></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.chance)
                  )}`" :readonly="readonly" v-model="form.l2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.result)
                  )}`" :readonly="readonly" v-model="form.i2" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>



                            <v-text-field disabled class="w-3/12" outlined dense label="3"></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.chance)
                  )}`" :readonly="readonly" v-model="form.l3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.result)
                  )}`" :readonly="readonly" v-model="form.i3" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>



                            <v-text-field disabled class="w-3/12" outlined dense label="4"></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.chance)
                  )}`" :readonly="readonly" v-model="form.l4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.result)
                  )}`" :readonly="readonly" v-model="form.i4" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>



                            <v-text-field disabled class="w-3/12" outlined dense label="5"></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.chance)
                  )}`" :readonly="readonly" v-model="form.l5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                            <v-text-field :style="`background-color:${getRiskColorBG(
                    Number(this.form.result)
                  )}`" :readonly="readonly" v-model="form.i5" class="w-4/12" outlined dense placeholder="ระบุข้อความ" label=""></v-text-field>
                        </div>
                    </div>
                </div>
            </div>
        </div>

          <v-alert v-if="!finishStep"  type="error" :value="true">
            กรุณาระบุข้อมูลให้ครบถ้วน
        </v-alert>
        <v-card-actions v-if="!readonly">
            <v-spacer></v-spacer>
            <v-btn v-if="finishStep"  color="success" @click="saveData()">บันทึกข้อมูล</v-btn>
          
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";

export default {
    props: {
        risk: {
            default: {},
        },
        readonly: { default: false },
        rm_type:{
            default:1
        }
    },
    data() {
        return {
            choices: Core.choices,
            defaultForm: {
                rm_type: this.rm_type,
                risk: this.risk.id,
            },
            form: {},
            editMode: false,
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
        async loadData() {
            let data = await Core.getHttp(
                `/api/riskdata/?risk=${this.risk.id}&rm_type=${this.rm_type}`
            );
            if (data.length == 1) {
                this.form = data[0];
                this.editMode = true;
            }
        },
        async saveData() {
            if (this.editMode) {
                let data = await Core.putHttp(
                    `/api/riskdata/${this.form.id}/`,
                    this.form
                );
                if (data.id) {
                    await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
                }
            } else {
                let data = await Core.postHttp(`/api/riskdata/`, this.form);
                if (data.id) {
                    await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
                }
            }
            await this.$emit('reload',this.rm_type)
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
