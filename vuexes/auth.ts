
import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import _ from "lodash"
import {Core} from '@/vuexes/core'
import axios from  '@/plugins/axios'
@Module({generateMutationSetters: true})
class AuthModule extends VuexModule {
  private  token:any =  localStorage.getItem('token')
  public user:any = null

  public async setUser(){
    let user = await Core.getHttp(`/accounts/profile/`)
    // let allUser = await Core.getHttp(`/api/user/${user.id}/`)
    if(user.agency){
      user["agency_id"] = user.agency.id
      user["agency_name"] = user.agency.name
    }
    await Core.getYears();
    this.user = user;
    return user;
  }

   public async changeAgency(agencyId:number){
     let agencies = Core.agencies
     let change = _.find(agencies,(ag:any)=>{return (ag.id == agencyId)})
     this.user.agency = change
     this.user.agency_id = change.id
     this.user.agency_name = change.name
   }

  public async getUser(){
    let user = await Core.getHttp(`/accounts/profile/`)
    return user;
  }

  public async login(form:any){
    await this.reToken();
    let user = await Core.postHttp(`/auth/login/`, form)
    if(user.key){
      let key = user.key
      console.log(key);
      await this.storeToken(key)
      await this.storeTokenToStorage(key)
      //  await window.location.replace("/");
      return key
    }else{
      //alert('ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบข้อมูลให้ถูกต้อง')
      return false;
    }
  }

  public async reToken(){
    axios.defaults.headers.common['Authorization'] = '';
  }

  public async storeToken(token:any){
    console.log(token);
    axios.defaults.headers.common['Authorization'] = (token != null )?`Token ${token}`:'';
  }

  public async storeTokenToStorage(token:any){
    localStorage.setItem('token',token )
  }

  public async checkToken(){
    if(this.token != null){
      await this.storeToken(this.token);
    }
  }

  public async checkUser(){
    // if(!this.user.id){
    //   await window.location.replace("/auth/login");
    // }
  }


  public async logout(){
    localStorage.clear();
    return await Core.postHttp('/auth/logout/',{})
  }

}

import store from "@/vuexes"
export const Auth = new AuthModule({store, name: "Auth"})
