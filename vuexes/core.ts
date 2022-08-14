import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import { Auth } from './auth'
import { Web } from './web'


@Module({ generateMutationSetters: true })
class CoreModule extends VuexModule {
  //state
  private token: string | null = null;
  public years: any = []
  public currentYear: any = null
  public currentYearTxt:any = ''
  public url:any = axios.defaults.baseURL
  choices: any = {};
  agencies:any = []


  async getHttp(url: string): Promise<any> {
    return await axios.get(url).then((r) => { return r.data }).catch((e) => { return e.response.data })
  }
  async postHttpAlert(url: string, form: object): Promise<any> {
    return await axios.post(url, form).then((r) => {
      Web.alert('เพิ่มข้อมูลสำเร็จ')
      return r.data }).catch((e) => {
        Web.alert('เพิ่มข้อมูลไม่สำเร็จ','error')
      console.log(e)
      return e.response.data
    })

  }
  async postHttp(url: string, form: object): Promise<any> {
    return await axios.post(url, form).then((r) => { return r.data }).catch((e) => {

      return e.response.data
    })
  }
  async putHttp(url: string, form: object): Promise<any> {
    return await axios.put(url, form).then((r) => { return r.data }).catch((e) => { return e.response.data })
  }
  async putHttpAlert(url: string, form: object): Promise<any> {
    let check = await Web.confirm("คุณแน่ใจใช่ไหมที่ต้องการแก้ไขข้อมูล")
    if (check) {
      return await axios.put(url, form).then((r) => {
        Web.alert('แก้ไขข้อมูลสำเร็จ')
        return r.data
      }).catch((e) => {
        Web.alert('แก้ไขข้อมูลไม่สำเร็จ', 'error')
        return e.response.data
      })
    }
  }
  async deleteHttp(url: string): Promise<any> {
    return await axios.delete(url).then((r) => { return r.data }).catch((e) => { return e.response.data })
  }
  async deleteHttpAlert(url: string): Promise<any> {
    let check = await Web.confirm("คุณแน่ใจใช่ไหมที่ต้องการลบข้อมูล")
    if (check) {
      return await axios.delete(url).then((r) => {
        Web.alert('ลบข้อมูลสำเร็จ')
        return r.data
      }).catch((e) => {
        Web.alert('ลบข้อมูลไม่สำเร็จ', 'error')
        return e.response.data
      })
    }
  }



  async getYears() {
    this.years = await this.getHttp(`/api/year/`)
  }
  async setYear(year: any) {
      this.currentYear = year
      this.currentYearTxt = year.year
  }
  async startYear(){
    await this.setYear(this.years[0])
  }


  async getRMEnv() {
    let user = Auth.user;
    let agencies = await Core.getHttp(`/api/agency/`)
    this.agencies = agencies
    await this.startYear()
    let mission = await Core.getHttp(`/api/mission/?year=${this.currentYearTxt}`)
    let strategic = await Core.getHttp(`/api/strategic/?year=${this.currentYearTxt}`)
    let strategy = await Core.getHttp(`/api/strategy/`)
    strategy.map((element:any) => {
      return element.fullname = `(${this.getAgencyName(element.agency)}) `+element.name;
   });
    let risktype = await Core.getHttp(`/api/risktype/?year=${this.currentYearTxt}`)
    let effects = await Core.getHttp(`/api/effects/?year=${this.currentYearTxt}`)
    let effect_other = effects[(effects.length)-1]
    this.choices = {
      "mission": this.getOnlyAgencyAndUniversity(mission),
      "strategic": this.getOnlyAgencyAndUniversity(strategic),
      "strategy": this.getOnlyAgencyAndUniversity(strategy),
      "risktype": this.getOnlyAgencyAndUniversity(risktype),
      "effects": this.getOnlyAgencyAndUniversity(effects),
      "effect_other_id": (effect_other) ? effect_other.id : null,
      "agencies": agencies
    }
  }

  private getOnlyAgencyAndUniversity(data: any) {
    return _.filter(data, (r: any) => { return r.agency == Auth.user.agency_id || r.agency == 21 })
  }

  public fillData(arr: any, key: string, val: any) {
    return _.find(arr, (r) => { return r[key] == val })
  }

  convertDate(date: any) {
    return moment(date).format('DD/MM/YYYY');
  }

  getAgencyName(id:number){
    try {
      let agency = _.find(this.agencies,{id:id})
      return agency.name
    } catch (error:any) {
       return "ไม่มีสังกัดหน่วยงาน"
    }

  }



  async getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }



}

import store from "@/vuexes"
import moment from "moment";
export const Core = new CoreModule({ store, name: "Core" })
