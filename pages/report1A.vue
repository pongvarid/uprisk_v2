<template>
  <div class="p-6 bg-white h-screen">
    <center>
      <h2 class="ff text-base font-bold">
        แบบการกำหนดหลักเกณฑ์การประเมิน ระดับโอกาส x ระดับผลกระทบ ของความเสี่ยง
      </h2>
    </center>
    <br /><br />
    <div class="flex justify-center items-center">
      <span class="ff font-bold">ชื่อความเสี่ยง</span>
      <v-text-field
        height="30"
        readonly
        class="ml-2 ff text-base"
        v-model="risk.name"
      ></v-text-field>
    </div>
    <div class="flex items-center">
      <span class="ff font-bold">ดัชนีชี้วัดความเสี่ยง (KRIs) </span>
      <v-text-field
        readonly
        class="ml-2 ff text-base"
        v-model="riskType"
      ></v-text-field>
    </div>
    <div class="flex justify-center items-center">
      <span class="ff font-bold">ดัชนีชี้วัดความสำเร็จ (KPIs) </span>
      <v-select
        readonly
        class="ml-2 ff text-base"
        v-model="risk.mission"
        multiple
        :items="choices.mission"
        item-text="name"
        item-value="id"
      ></v-select>
    </div>

    <table class="w-full ff">
      <tbody class="w-full">
        <tr class="w-full">
          <td rowspan="2">ระดับโอกาส x ระดับผลกระทบ = ระดับความเสี่ยง</td>
          <td>ระดับความเสี่ยงรอบแผน (ณ 1 ต.ค.)</td>
          <td>ระดับความเสี่ยงรอบ 6 เดือน (ณ 31 มี.ค.)</td>
          <td>ระดับความเสี่ยงรอบ 12 เดือน (ณ 30 ก.ย.)</td>
        </tr>
        <tr>
          <td>ระดับความเสี่ยงรอบแผน (ณ 1 ต.ค.)</td>
          <td>ะดับความเสี่ยงรอบ 6 เดือน (ณ 31 มี.ค.)</td>
          <td>ะดับความเสี่ยงรอบ 12 เดือน (ณ 30 ก.ย.)</td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <center>
      <h2 class="ff text-base font-bold">
        หลักเกณฑ์การะประเมินระดับโอกาส x ระดับผลกระทบของความเสี่ยงที่กำหนด
      </h2>
    </center>
    <br />
    <table class="w-full ff">
      <tbody class="w-full">
        <tr class="w-full">
          <td>
            ระดับคะแนนความรุนแรง <br />
            <span class="caption">(ระดับ 1-5 จากน้อยไปมากตามลำดับ)</span>
          </td>
          <td>
            โอกาสที่จะเกิดความเสี่ยง (Likelihood : L) <br />
            <span class="caption">(ระดับ 1-5 จากน้อยไปมากตามลำดับ)</span>
          </td>
          <td>
            ผลกระทบของความเสี่ยง (Impact : I) <br />
            <span class="caption">(ระดับ 1-5 จากน้อยไปมากตามลำดับ)</span>
          </td>
        </tr>
        <tr>
          <td>ระดับความเสี่ยงรอบแผน (ณ 1 ต.ค.)</td>
          <td>ะดับความเสี่ยงรอบ 6 เดือน (ณ 31 มี.ค.)</td>
          <td>ะดับความเสี่ยงรอบ 12 เดือน (ณ 30 ก.ย.)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";

import { Auth } from "@/vuexes/auth";
import _ from "lodash";
export default {
  name: "report1",

  async created() {
    await this.loadRisk();
    await this.loadENV();
  },
  data() {
    return {
      web: Web,
      core: Core,
      dialog: true,
      id: null,
      risk: {},
      choices: Core.choices,
      user: Auth.user,
      year: {},
      courses: [],
      effects: [],
      controls: [],
      kris: [],
      risk_cal: {},
    };
  },
  methods: {
    async loadRisk() {
      this.id = this.$route.query.id;
      this.risk = await Core.getHttp(`/api/risk/${this.id}/ `);
      this.year = _.find(Core.years, { id: this.risk.year });
    },

    async loadENV() {
      this.courses = await Core.getHttp(
        `/api/cause/?risk=${this.id}&risk_type=1 `
      );
      this.effects = await Core.getHttp(
        `/api/effect/?risk=${this.id}&risk_type=1 `
      );
      this.controls = await Core.getHttp(
        `/api/control/?risk=${this.id}&risk_type=1 `
      );
      this.kris = await Core.getHttp(`/api/kri/?risk=${this.id}&risk_type=1 `);
      let risk_cal = await Core.getHttp(
        `/api/riskdata/?risk=${this.risk.id}&rm_type=1`
      );
      if (risk_cal.length == 1) {
        this.risk_cal = risk_cal[0];
      }
    },
  },
  computed: {
    riskType() {
      let filtered_ids = _.filter(this.choices.risktype, (p) => {
        return _.includes(this.risk.risk_type, p.id);
      });
      let responseText = "";
      filtered_ids.forEach((riskType, index) => {
        responseText += riskType.name + ",";
      });
      return responseText;
    },
  },
};
</script>

<style  >
@import url("https://fonts.googleapis.com/css2?family=Niramit&display=swap");
.ff {
  font-family: "Niramit", sans-serif !important;
  line-height: 25px !important;
}
.v-select >>> input {
  font-family: "Niramit", sans-serif !important;
  line-height: 25px !important;
}

.ff * {
  font-family: "Niramit", sans-serif !important;
  line-height: 25px !important;
}
.ff2 * {
  font-family: "Niramit", sans-serif !important;
  line-height: 25px !important;
  font-size: 12px !important;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  font-family: "Niramit", sans-serif !important;
  font-weight: bold;
  font-size: 12px !important;
}

th,
td {
  padding: 15px;
  text-align: left;
  font-family: "Niramit", sans-serif !important;
  font-size: 12px !important;
}
</style>
