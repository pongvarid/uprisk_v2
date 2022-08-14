import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'

@Module({generateMutationSetters: true})
class RiskModule extends VuexModule {

  public currentRisk:object = {};
  public currentAgency:Number  = 0

  public async setRisk(risk:object){
    this.currentRisk = risk
  }
  public async setAgency(agencyId:Number){
    this.currentAgency = agencyId
  }

}

import store from "@/vuexes"
export const Risk = new RiskModule({store, name: "Risk"})
