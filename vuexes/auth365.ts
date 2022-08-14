
import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import _ from "lodash"
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'

import axios from  '@/plugins/axios'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,OAuthProvider,signInWithRedirect,getRedirectResult,  } from "firebase/auth";

@Module({generateMutationSetters: true})
class Auth365Module extends VuexModule {
    private config: object =  {
        apiKey: "AIzaSyCRyYITpFUU5TNoOU87qlVlipDS_89xGqs",
        authDomain: "plan-up-ac-th.firebaseapp.com",
        projectId: "plan-up-ac-th",
        storageBucket: "plan-up-ac-th.appspot.com",
        messagingSenderId: "296674187732",
        appId: "1:296674187732:web:3aeed305e662f6c23b9e41",
        measurementId: "G-7LH7K4CQL9"
      };
      
    private firebase:any = initializeApp(this.config);
    private analytics:any  = getAnalytics(this.firebase);
    private msTanent: string = `d7cbbb08-47a3-4bd7-8347-5018f2744cfb`
    
    public async login365(){
        const provider = new OAuthProvider('microsoft.com'); 
        provider.setCustomParameters({ tenant: this.msTanent }); 
        provider.addScope('User.Read');
        provider.addScope('profile')
        // provider.addScope(["openid","profile","offline_access","User.Read.All",'Directory.AccessAsUser.All','AdministrativeUnit.ReadWrite.All']); 
        await signInWithRedirect(getAuth(),provider);
    }

    public async callback() {
        let user = await getRedirectResult(getAuth())
            .then(async (result: any) => {
                const credential:any = OAuthProvider.credentialFromResult(result);  
                let response =  {
                    "type": credential.signInMethod,
                    "credential" :credential.accessToken,
                    "user" :  this.makeUserForm(result.user.reloadUserInfo)
                }
               return await this.loginOrRegister(response.user)
            })
            .catch(async (error: any) => {
                console.log(error);
                return false;
            });
        console.log(user);
        return user;
    }

    private makeUserForm(user:any){
        let fullname = (user.displayName).split(' ')
        let response = {
            first_name :  fullname[0],
            last_name : fullname[1],
            email : user.email,
            username:user.email,
            password :btoa(user.localId),
            password_confirm:btoa(user.localId)
        }
       
        return {
            register:response,
            login: {
                username:response.username,
                password :response.password,
                password_confirm:response.password_confirm
            }
        }
    }
    

    private async loginOrRegister(user:any){
     let checkUser = await Core.getHttp(`/api/userfind/?username=${user.register.email}`)
     return {
         'status':(checkUser.length > 0)?'login':'register',
         'form' :(checkUser.length > 0)?user.login:user.register
     } 

    }

 
}

import store from "@/vuexes"
export const Auth365 = new Auth365Module({store, name: "Auth365"})
