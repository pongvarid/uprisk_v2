<template>
  <section class="min-h-screen flex items-stretch text-white ">
       <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bghss">
        <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div class="w-full py-6 z-20">
            
            <div class="py-6 space-x-2">
                <h2 class="text-4xl">สมัครสมาชิก</h2> 
            </div>
            <p class="text-gray-100">
              กรอกข้อมูลต่างๆเพื่อลงทะเบียนเข้าใช้งานระบบ
            </p>

                <div v-if="errorReg" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          <div v-if="errorReg.username">
            <v-alert dense v-for="err,index in errorReg.username" :key="index" type="error">
              {{err}}
            </v-alert>
          </div>
          <div v-if="errorReg.email">
            <v-alert dense v-for="err,index in errorReg.email" :key="index" type="error">
              {{err}}
            </v-alert>
          </div>
          <div v-if="errorReg.password">
            <v-alert dense v-for="err,index in errorReg.password" :key="index" type="error">
              {{err}}
            </v-alert>
          </div>
          <div v-if="errorReg.password_confirm">
            <v-alert dense v-for="err,index in errorReg.password_confirm" :key="index" type="error">
              {{err}}
            </v-alert>
          </div>
        </div>
        

             <form @submit.prevent="registerData()" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          <v-text-field   required v-model="formReg.first_name" filled dark label="ชื่อ" prepend-inner-icon="mdi-account-box"></v-text-field>
          <v-text-field   required v-model="formReg.last_name" filled dark label="สกุล" prepend-inner-icon="mdi-account-box"></v-text-field>

          <v-text-field   required v-model="formReg.username" filled dark label="ชื่อผู้ใช้" prepend-inner-icon="mdi-face"></v-text-field>
          <v-text-field type="password" required v-model="formReg.password" filled dark label="รหัสผ่าน" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
          <v-text-field type="password" required v-model="formReg.password_confirm" filled dark label="ยืนยันรหัสผ่าน" prepend-inner-icon="mdi-form-textbox-password"></v-text-field>
          <v-autocomplete prepend-inner-icon="mdi-office-building" filled dark label="สังกัด หน่วยงาน" v-model="formReg.agency" item-value="id" item-text="name" e :items="agencies"></v-autocomplete>
          <v-btn v-if="formReg.password == formReg.password_confirm && formReg.password != ''" dark large color="success" class="w-full" type="submit">ลงทะเบียน</v-btn>
        </form>
         
               <div class="mt-12 sm:w-2/3 w-full px-4 lg:px-0 mx-auto"> 
                  <v-btn @click="$router.go(-1)" outlined dark large  color="" class="w-full mt-2">กลับไปหน้าเข้าสู่ระบบ</v-btn>
            </div>
        </div>
    </div>
   
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

</section>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import { Auth } from '@/vuexes/auth'
import { Core } from '@/vuexes/core'
declare module 'vue/types/options' {
  interface ComponentOptions < V extends Vue > {
    layout ? : string
  }
}
@Component({
  layout: 'root',
})
export default class Root extends Vue {
  errorReg: any = null
  useTel: boolean = true
  formReg: any = {}
  agencies:any = []

  rules:any = [
    (v:string) => !!v || 'กรอกเบอร์โทรศัพท์มือถือ 10 หลัก',
    (v:string) => ( v && v.length >= 10 ) || 'กรุณากรอกเบอร์โทรศัพท์มือถือ 10 หลัก',
    (v:string) => ( v && v.length <= 10 ) || 'เบอร์โทรศัพท์มือถือเกิน 10 หลัก',
  ]
  rulesIDcard:any = [
    (v:string) => !!v || 'กรอกเลขบัตรประชาชน 13 หลัก',
    (v:string) => ( v && v.length >= 13 ) || 'กรุณากรอกเลขบัตรประชาชน 13 หลัก',
    (v:string) => ( v && v.length <= 13 ) || 'เลขบัตรประชาชนเกิน 13 หลัก',
  ]
  async created(){
    this.agencies = await Core.getHttp(`/api/agency/`)
  }
  async registerData() {

    let user = await Core.postHttp(`/accounts/register/`, this.formReg)
    if (user.id) {
      alert('สมัครสมาชิกสำเร็จแล้ว');
      await this.$router.replace('/auth/login')
    } else {
      alert('ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลการสมัครให้ถูกต้อง')
      this.errorReg = user
    }
  }
}
</script>

<style  >
.bgh{
  background-color: #9369ee;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%2363358f'/%3E%3Cstop offset='1' stop-color='%239369ee'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%237b4fbf'/%3E%3Cstop offset='1' stop-color='%239369ee'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
