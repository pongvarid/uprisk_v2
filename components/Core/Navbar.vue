<template>
<div>

    <v-app-bar dense v-if="response" app flat color="bg-toolbar">
        <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-icon @click="logout()" dark>
            mdi-logout
        </v-icon>

    </v-app-bar>
    <v-navigation-drawer class="bg-navbar " v-if="response" v-model="drawer" fixed app>
        <v-list dense>
            <div class="flex flex-col justify-center mt-6">
                <div class="flex flex-col  w-full items-center justify-center">
                    <img class=" w-40 " src="https://sv1.picz.in.th/images/2021/11/22/6fcqAa.png" alt="">
                    <p class="w-full text-base  text-blue-600 pt-2 text-center w-24">ระบบบริหารจัดการความเสี่ยง
                        <br> <span class="font-thin text-xl text-purple-600">มหาวิทยาลัยพะเยา</span>
                    </p>
                    <hr class="border-2 w-8/12 border-purple-500">
                </div>
            </div>
            <v-subheader>เมนู</v-subheader>
            <v-list-item-group color="primary">
                <v-list-item @click="$router.push('/')">
                    <v-list-item-icon>
                        <i class="em em-books" aria-role="presentation" aria-label="BOOKS"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>หน้าแรก</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/choice')" v-if="user.is_agency_admin">
                    <v-list-item-icon>
                        <i class="em em-card_file_box" aria-role="presentation" aria-label=""></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>จัดการตัวเลือก</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list-item-group>
        </v-list>

    </v-navigation-drawer>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"
import { Auth } from '@/vuexes/auth'
@Component({
    components: {},
})
export default class Layout extends Vue {
    user: any = null
    response: boolean = false;
    drawer: boolean = true
    async created() {
        await Auth.checkToken();
        this.user = await Auth.setUser();
        await this.checkUser();
        this.response = (this.user.id) ? true : false;
        await this.callback();
    }

    async callback() {
        this.$emit('callback', this.response)
    }

    async logout() {
        await Auth.logout();
        await location.reload();
    }
    async checkUser() {
        let user = await Auth.getUser();
        if (!user.id) {
            await this.$router.replace(`/auth/login`)
        }
    }
}
</script>

<style>
.bg-navbar {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.1' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%238A45FF'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%238A45FF'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(95 1000 750) scale(50) translate(-980 -735)'%3E%3Cg fill='%238A45FF'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}

.bg-toolbar{
  background-color: #7055FF;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%237055FF' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23714ff1' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23724ae3' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%237145d6' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%237040c9' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%236e3cbc' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%236b37af' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%236833a3' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23642f97' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23602b8c' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%235c2880' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23572575' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2352226a' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%234c1f60' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23461c56' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23401a4c' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%233a1743' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%2334153A' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
</style>
