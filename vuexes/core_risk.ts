import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import _ from "lodash"
import { Auth } from './auth'
import { Web } from './web'
import { Core } from "@/vuexes/core";


@Module({ generateMutationSetters: true })
class CoreRiskModule extends VuexModule {

  public risks:[] = []
  public async loadCurrentRisk(all:boolean = false,withAnotherAgency:boolean = false,anotherAgencyId:number= 0){
      if(all == true){
        console.log('all')
        this.risks = await Core.getHttp(`/api/risk-full/?year=${Core.currentYear.id}`)
      }else if(withAnotherAgency == true){
        console.log('another')
        this.risks = await Core.getHttp(`/api/risk-full/?year=${Core.currentYear.id}&agency=${anotherAgencyId}`)
      }
      else{
        console.log('current')
        this.risks = await Core.getHttp(`/api/risk-full/?year=${Core.currentYear.id}&agency=${Auth.user.agency_id}`)
      }
  }



}

import store from "@/vuexes"
import moment from "moment";
export const CoreRisk = new CoreRiskModule({ store, name: "CoreRisk" })
