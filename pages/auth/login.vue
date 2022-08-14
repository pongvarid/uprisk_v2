<template>
<section class="min-h-screen flex items-stretch text-white ">
    <div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style="background-image: url(https://www.matichon.co.th/wp-content/uploads/2017/07/%E0%B8%A1%E0%B8%9E.3-840x1024.jpg);">
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div class="w-full px-24 z-10">
            <h1 class="text-5xl font-bold text-left tracking-wide">ระบบบริหารจัดการความเสี่ยง</h1>
            <p class="text-3xl my-4">มหาวิทยาลัยพะเยา</p>
        </div>
        <div class="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
            <h2>โดย กองแผนงาน มหาวิทยาลัยพะเยา</h2>
        </div>
    </div>
    <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bghss">
        <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div class="w-full py-6 z-20">
            
            <div class="py-6 space-x-2">
                <h2 class="text-4xl">ลงชื่อเข้าใช้งาน</h2> 
            </div>
            <p class="text-gray-100">
               ท่านสามารถเข้าสู่ระบบได้โดยใช้ ชื่อผู้ใช้ และ รหัสผ่าน
            </p>
            <form  @submit.prevent="login()" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                <v-text-field dark required v-model="form.username" filled label="ชื่อผู้ใช้"   prepend-inner-icon="mdi-badge-account-horizontal"></v-text-field>
                <v-text-field dark required v-model="form.password" filled type="password"   label="รหัสผ่าน"   prepend-inner-icon="mdi-form-textbox-password"></v-text-field> 
                <v-btn type="submit" x-large  color="success" class="w-full">เข้าสู่ระบบ</v-btn>
            
            </form>
            <div class="mt-6 sm:w-2/3 w-full px-4 lg:px-0 mx-auto ">
                *หากยังไม่มีชื่อผู้ใช้และ หรัสผ่าน สามารถลงทะเบียนได้โดย
                  <v-btn @click="$router.push('/auth/register')" outlined dark large  color="" class="w-full mt-2">สมัครสมาชิก</v-btn>
            </div>
               <div class="mt-12 sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
               
                หรือ
                  <v-btn @click="login365()"  x-large   class="w-full mt-2">
                    <img class="w-auto h-8" src="https://www.jqcomputer.com/wp-content/uploads/2019/12/microsoft-logo.png" alt="">
                    <b class="ml-2">เข้าสู่ระบบผ่านทาง Microsoft 365</b>
                  </v-btn>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
import {Auth365} from '@/vuexes/auth365'
export default {
    layout: 'root',
    data: () => ({
        form: {}
    }),
    async created() {
        await this.checkUser();
        await this.callbackFrom365();
        
     
    },
    methods: {
        async login() {
            await Auth.login(this.form);
            let user = await Auth.getUser();
            if (user.id) {
                //await location.reload();
                await this.$router.replace('/')
                await location.reload();
            }
        },
        async checkUser() {
            let user = await Auth.getUser();
            if (user.id) {
                await this.$router.replace('/')
            }
        },

        async login365(){
          await Auth365.login365();
        },

        async callbackFrom365(){
            await Web.switchLoad(true)
            let data = await Auth365.callback()
            await Web.switchLoad(false)

            if(data.status == 'login'){
                this.form = data.form;
                await this.login();
            }else if(data.status == 'register'){
                let form  = data.form;
                let user = await Core.postHttp(`/accounts/register/`, form)
                if(user.id){
                    this.form = data.form;
                    await this.login();
                }
            }else{

            }
          

        }

        
        
    }
}
</script>

<style>
.bghss {
background-color: #3B1357;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%233B1357' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%233a1254' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23381150' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23370f4d' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23350e4a' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23340d47' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23320c44' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23310b40' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%232f0a3d' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%232e093a' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%232c0837' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%232a0834' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23290732' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2327062f' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%2325052c' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23240329' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23220227' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
</style>
