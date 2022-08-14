import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'
import 'moment/locale/th'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Core } from "@/vuexes/core";
@Module({ generateMutationSetters: true })
class Report6Module extends VuexModule {

  public export: boolean = false;
  public riskID: Number = 19
  public docDefinition: any = []
  public courses: any = []
  public effects: any = []
  public controls: any = []
  public kris: any = []
  public risk_cal: any = []
  public risk: any = []
  public year: any = []

  public testText: any = [

  ]
  public maesures:any = []
  public rate0: any = {}
  public rate6: any = {}
  public rate12: any = {}
  public all:any = {}
  public async loadENV() {
    this.risk = await Core.getHttp(`/api/risk-full/${this.riskID}/ `); 
    this.year = Core.currentYear;
    this.courses = await Core.getHttp(
      `/api/cause/?risk=${this.riskID}&risk_type=12 `
    );
    this.effects = await Core.getHttp(
      `/api/effect-full/?risk=${this.riskID}&risk_type=12 `
    );
    this.controls = await Core.getHttp(
      `/api/control/?risk=${this.riskID}&risk_type=12 `
    );
    this.kris = await Core.getHttp(`/api/kri/?risk=${this.riskID}&risk_type=12 `);
    let risk_cal = await Core.getHttp(
      `/api/riskdata/?risk=${this.riskID}&rm_type=6`
    );
    if (risk_cal.length == 1) {
      this.risk_cal = risk_cal[0];
    }

    this.maesures = await Core.getHttp(`/api/maesures/?effect__risk=${this.riskID}&rm_type=6`)
    let all = await Core.getHttp(`/api/overall/?risk=${this.riskID}&rm_type=12`)
    if (all.length > 0) {
      this.all = all[0];
    }
    console.log('risk', this.risk)
    this.rate0 = _.find(this.risk.risk_data, { rm_type: 1 })
    this.rate6 = _.find(this.risk.risk_data, { rm_type: 6 })
    this.rate12 = _.find(this.risk.risk_data, { rm_type: 12 })
  }


  genCause() {
    let txt = ""
    for (let i = 0; i < this.courses.length; i++) {
      txt += "- " + this.courses[i].value + '\n'
    }
    return txt
  }

  genControls() {
    let txt = ""
    for (let i = 0; i < this.controls.length; i++) {
      txt += "- " + this.controls[i].value + '\n'
    }
    return txt
  }

  genDate(dateVal: any) {
    moment.lang("th")
    return "วัน" + moment(dateVal).format('dddd DD MMMM YYYY')
  }
  genDateNow() {
    moment.lang("th")
    return "วัน" + moment().format('dddd DD MMMM YYYY')
  }


  genEffects() {
    let txt = ""
    for (let i = 0; i < this.effects.length; i++) {
      txt += this.effects[i].value.value + '\n'
    }
    return txt
  }

  genKris() {
    let txt = "ดัชนีชี้วัดความเสี่ยง(KRI) \n"
    for (let i = 0; i < this.kris.length; i++) {
      txt += this.kris[i].target + '\n'
    }
    txt += "\n\nดัชนีชี้วัดความสำเร็จ(KPI) \n"
    for (let i = 0; i < this.kris.length; i++) {
      txt += this.kris[i].indicators + '\n'
    }
    return txt
  }
   
  genMaesures() {
    let txt = ""
    for (let i = 0; i < this.maesures.length; i++) {
      txt += '-'+this.maesures[i].result + '\n'
      console.log('sdsds',txt)
    } 
    return txt
  }

  genMaesuresVal() {
    let txt = ""
    for (let i = 0; i < this.maesures.length; i++) {
      txt += '-'+this.maesures[i].value + '\n'
      console.log('sdsds',txt)
    } 
    return txt
  }


  public async openReport(rmId: Number) {
    await this.loadENV();
    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
    this.riskID = rmId;
    this.export = true;
    (<any>pdfMake).fonts = {
      Roboto: {
        normal:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
        bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
        italics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
        bolditalics:
          "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
      },
      THSarabun: {
        normal: "https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew-webfont.ttf",
        bold: "https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bold-webfont.ttf",
        italics: "https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_italic-webfont.ttf",
        bolditalics: "https://cdn.jsdelivr.net/npm/font-th-sarabun-new@1.0.0/fonts/THSarabunNew_bolditalic-webfont.ttf",
      },
    };
    this.docDefinition = {
      pageSize: "A2",
      pageMargins: [40, 25, 40, 25],
      pageOrientation: "landscape",
      defaultStyle: {
        font: "THSarabun",
        fontSize: 13,
      },
      watermark: { text: 'มหาวิทยาลัยพะเยา', color: 'grey', opacity: 0.1, bold: true, italics: false },
      // header: function (currentPage: any, pageCount: any, pageSize: any) {
      //   return [
      //     { text: (currentPage % 2) ? '(RM-Plan)' : '(หลักเกณฑ์การประเมินระดับโอกาส x ระดับผลกระทบ)', fontSize: 12, alignment: 'right', margin: [5, 5, 5, 5] },
      //   ]
      // },
      info: {
        title: 'RM-12',
      },
      content: [
        // header 1 
        { text: "(RM-12)", fontSize: 12, bold: true, alignment: 'right', margin: [0, 10, 10, 5], },
        { text: "แผนบริหารจัดการความเสี่ยงและควบคุมภายใน (RM-12) รอบ 12 เดือน  ประจำปีงบประมาณ พ.ศ. " + this.year.year, fontSize: 16, bold: true, alignment: 'center' },
        { text: "ชื่อหน่วยงาน " + this.risk.agency_name, fontSize: 16, alignment: 'center' },
        {
          style: 'tableOne',
          table: {
            body: [
              [{ text: "ชื่อความเสี่ยง" },
              {
                text: this.risk.name,
                border: [false, false, false, true]
              }],
              [{ text: "พันธกิจมหาวิทยาลัย " },
              {
                text: this.risk.mission.name,
                border: [false, false, false, true]
              }],
              [{ text: "ยุทธศาสตร์มหาวิทยาลัย " },
              {
                text: this.risk.strategic_name,
                border: [false, false, false, true]
              }],
              [{ text: "กลยุทธ์" },
              {
                text: (_.map(this.risk.strategy, 'name')).toString(),
                border: [false, false, false, true]
              }],
              [{ text: "เป้าประสงค์/เป้าหมาย" },
              {
                text: this.risk.point,
                border: [false, false, false, true]
              }],
              [{ text: "ประเภทความเสี่ยง " },
              {
                text: (_.map(this.risk.risk_type, 'name')).toString(),
                border: [false, false, false, true]
              }],

            ]
          },
          layout: {
            defaultBorder: false,
            hLineWidth: function (i: any, node: any) {
              return 1;
            },
            hLineColor: function (i: any, node: any) {
              return 'black';
            },
            hLineStyle: function (i: any, node: any) {
              return { dash: { length: 10, space: 4 } };
            },
          }
        },
        {
          style: 'tableTwo',
          widths: [100, 100, 100, 100, 100, 100],
          table: {
            body: [
              [{ text: "ระดับความเสี่ยงหลังการบริหารจัดการ ที่คงเหลือหลังการจัดการความเสี่ยง รอบ 6 เดือน", alignment: 'center', fontSize: 9 },
              { text: 'การบริหารจัดการความเสี่ยง', alignment: 'center', fontSize: 9 },
              { text: 'ผลการดำเนินงาน รอบ 12 เดือน', alignment: 'center', fontSize: 9 },
              { text: 'สรุปผลการบริหารความเสี่ยง และการควบคุมภายใน \n รอบ 12 เดือน (ภาพรวม)', alignment: 'center', fontSize: 9 },
              { text: 'การประเมินผลตามดัชนีชี้วัด\n (KRI) และ (KPI)\n รอบ 12 เดือน', alignment: 'center', fontSize: 9 },
              { text: 'ระดับความเสี่ยงหลังการบริหารจัดการ ที่คงเหลือหลังการจัดการความเสี่ยง รอบ 12 เดือน', alignment: 'center', fontSize: 9 },
              ],
              [{ text: this.risk.rate_full6, fontSize: 9 }, 
                { text: this.genMaesuresVal(), fontSize: 9 }, 
                { text: this.genMaesures(), fontSize: 9 }, 
                 { text: `สรุปการประเมินผลตามมาตรการจัดการความเสี่ยง \n -${this.all.text} \n\nประเมินประสิทธิภาพ ประสิทธิผลของมาตรการจัดการความเสี่ยง \n - ${this.all.sufficient} \n\n การปรับปรุง/พัฒนามาตรการจัดการความเสี่ยง\n -${this.all.amend}`, fontSize: 9 }, 
               
                 { text: this.genKris(), fontSize: 9 }, 
                 { text: this.risk.rate_full12, fontSize: 9 }]
         

            ]
          },
          layout: {
            defaultBorder: true,
          }
        },
        {

          text: "ลายมือชื่อ .............................................", fontSize: 12, alignment: 'right',
          margin: [550, 50, 0, 10]
        },
        {
          text: "(" + this.risk.sign_name + ")", fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 10]
        },
        {
          text: "ตำแหน่ง  " + this.risk.sign_position, fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 5]
        },
        {
          text: this.genDateNow(), fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 5], pageBreak: 'after'
        },
        // (หลักเกณฑ์การประเมินระดับโอกาส x ระดับผลกระทบ)
        // header 2

        { text: "(หลักเกณฑ์การประเมินระดับโอกาส x ระดับผลกระทบ)", fontSize: 12, bold: true, margin: [0, 10, 10, 5], alignment: 'right' },
        { text: "การกำหนดหลักเกณฑ์การประเมิน ระดับโอกาส x ระดับผลกระทบ ของความเสี่ยง", fontSize: 16, bold: true, alignment: 'center' },
        {
          style: 'tableOne',
          table: {
            widths: [100, '*'],
            margin: [5, 0, 0, 0],
            body: [
              [{
                text: " ชื่อความเสี่ยง  : ",
                border: [false, true, true, true],
              },
              {
                text: this.risk.name,
                border: [false, true, false, true]
              }],
            ]
          },
          layout: {
            defaultBorder: false,
            hLineWidth: function (i: any, node: any) {
              return 1;
            },
            vLineWidth: function (i: any, node: any) {
              return 1;
            },
            hLineColor: function (i: any, node: any) {
              return 'black';
            },
            vLineColor: function (i: any, node: any) {
              return 'black';
            },
            hLineStyle: function (i: any, node: any) {
              return { dash: { length: 10, space: 4 } };
            },
            vLineStyle: function (i: any, node: any) {
              return { dash: { length: 10, space: 4 } };
            },
          }
        },
        {
          style: 'tableOne',
          table: {
            body: [
              [{
                text: "",
                border: [false, false, false, false]

              }, {
                text: "ระดับความเสี่ยงรอบแผน  (ณ 1 ต.ค.) ",
                fillColor: '#d7e1f7',
                alignment: 'center'
              },
              {
                text: "ระดับความเสี่ยงรอบ 6 เดือน  (ณ 31 มี.ค.)",
                fillColor: '#d7e1f7',
                alignment: 'center'
              },
              {
                text: "ระดับความเสี่ยงรอบ 12 เดือน  (ณ 30 ก.ย.)", fillColor: '#d7e1f7',
                alignment: 'center'
              }],
              [{
                text: "ระดับโอกาส x ระดับผลกระทบ = ระดับความเสี่ยง", fillColor: '#d7e1f7',
                alignment: 'center'

              }, {
                text: this.risk.rate_full0,

              },
              {
                text: this.risk.rate_full6,
              },
              {
                text: this.risk.rate_full12,
              }],
            ]
          },
          layout: {
            defaultBorder: true
          }
        },
        { text: "หลักเกณฑ์การประเมินระดับโอกาส x ระดับผลกระทบของความเสี่ยงที่กำหนด  ", fontSize: 16, alignment: 'left', margin: [150, 10, 0, 5] },
        {
          style: 'tableOne',
          table: {
            widths: ['*', '*', '*'],
            body: [
              [{
                text: "ระดับคะแนนความรุนแรง\n(ระดับ 1-5 จากน้อยไปมากตามลำดับ)",
                fillColor: '#d7e1f7',
                alignment: 'center'
              }, {
                text: "โอกาสที่จะเกิดความเสี่ยง (Likelihood : L)\n(ระดับ 1-5 จากน้อยไปมากตามลำดับ)",
                fillColor: '#d7e1f7',
                alignment: 'center'
              },
              {
                text: "ผลกระทบของความเสี่ยง (Impact : I)\n(ระดับ 1-5 จากน้อยไปมากตามลำดับ)",
                fillColor: '#d7e1f7',
                alignment: 'center'
              }],
              [{
                text: "5",
                alignment: 'center'

              },
              {
                text: this.rate12.l5,
              },
              {
                text: this.rate12.i5,
              }], [{
                text: "4",
                alignment: 'center'

              },
              {
                text: this.rate12.l4,
              },
              {
                text: this.rate12.i4,
              }], [{
                text: "3",
                alignment: 'center'
              },
              {
                text: this.rate12.l3,
              },
              {
                text: this.rate12.i3,
              }], [{
                text: "2",
                alignment: 'center'

              },
              {
                text: this.rate12.l2,
              },
              {
                text: this.rate12.i2,
              }], [{
                text: "1",
                alignment: 'center'
              },
              {
                text: this.rate12.l1,
              },
              {
                text: this.rate12.i1,
              }],
            ]
          },
          layout: {
            defaultBorder: true
          }
        },
        { text: `ผลการประเมิน : ${this.rate12.xresult}`, fontSize: 12, margin: [30, 10, 20, 5] },
        {

          text: "ลายมือชื่อ .............................................", fontSize: 12, alignment: 'right',
          margin: [550, 50, 0, 10]
        },
        {
          text: "(" + this.risk.sign_name + ")", fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 10]
        },
        {
          text: "ตำแหน่ง  " + this.risk.sign_position, fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 5]
        },
        {
          text: this.genDateNow(), fontSize: 12, alignment: 'right',
          margin: [550, 0, 0, 5],
        },
        // หมายเหตุ
        {
          margin: [20, 15, 0, 5],
          text: [
            { text: 'หมายเหตุ', fontSize: 12, decoration: 'underline', bold: true, },
            ' : ',
            'ให้ทุกส่วนงานกำหนดหลักเกณฑ์ในการประเมินระดับโอกาสที่จะเกิดความเสี่ยงและระดับผลกระทบของความเสี่ยงที่กำหนดตามบริบท เพื่อใช้เป็นหลักเกณฑ์ในการประเมินติดตามระดับความเสี่ยงของส่วนงาน \n',
            {
              text: 'ทั้งในรอบแผน รอบ 6 เดือน และรอบ 12 เดือน ให้เชื่อมโยงสัมพันธ์กันอย่างต่อเนื่อง เป็นระบบ พร้อมทั้งให้แนบหลักเกณฑ์ดังกล่าวประกอบความเสี่ยงแต่ละประเด็นรายงานผลแก่มหาวิทยาลัยทุกครั้ง',
            },

          ]
        },
        {
          text: '(ระดับความเสี่ยง = ระดับโอกาส x ระดับผลกระทบ)  โดยระดับความเสี่ยง 1-2 = ความรุนแรงน้อย (สีเขียว) , ระดับความเสี่ยง 3-6 = ความรุนแรงปานกลาง (สีเหลือง) , ระดับความเสี่ยง 7-12 = ความรุนแรงสูง (สีส้ม) , ระดับความเสี่ยง 13-25 = ความรุนแรงสูงมาก (สีแดง)',
          fontSize: 9, alignment: 'center'
        },

      ],
      styles: {
        tableOne: {
          margin: [40, 5, 40, 15],
          fontSize: 13,
          alignment: 'left'
        },
        tableTwo: {
          margin: [0, 0, 0, 0],
          fontSize: 13,
          alignment: 'left'
        }
      },
    };
    pdfMake.createPdf(this.docDefinition, this.docDefinition).open();

  }

}

import store from "@/vuexes"
export const Report12 = new Report6Module({ store, name: "Report12" })
