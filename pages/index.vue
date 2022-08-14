<template>
<v-col>
    <br>
    <!-- <pre>{{user.is_staff}}</pre> -->
    <div v-if="agencyHave">
        <v-toolbar flat color="transparent"   >
            <v-spacer></v-spacer>
            <v-btn :outlined="type == 0" @click="type = 0" color="success">ภาพรวมมหาวิทยาลัย</v-btn>
            <v-btn :outlined="type == 1" @click="type = 1" class="ml-4" color="success">ข้อมูลภายในหน่วยงาน</v-btn>
            <v-btn :outlined="type == 2" @click="type = 2" class="ml-4" color="success">ข้อมูลมหาวิทยาลัย</v-btn>
            <v-btn :outlined="type == 3" @click="type = 3" class="ml-4" color="success">ข้อมูลหน่วยงานอื่นๆ</v-btn>
            
        </v-toolbar>
        <Main-AdminDashBoard v-if="type == 0"></Main-AdminDashBoard>
        <Main-UserDashBoard v-else-if="type == 1"></Main-UserDashBoard>
        <Main-UniversityDashBoard v-else-if="type == 2"></Main-UniversityDashBoard>
         <Main-AnotherDashboard v-else-if="type == 3"></Main-AnotherDashboard>
        <Main-UserDashBoard v-else></Main-UserDashBoard>
    </div>
    <div v-else>
        <Main-ChooseAgency></Main-ChooseAgency>
    </div>

</v-col>
</template>

<script>
import { Auth } from '@/vuexes/auth'
import { Core } from '@/vuexes/core'
import _ from 'lodash'
export default {
    components: {

    },
    data() {
        return ({
            agencyHave: false,
            user: Auth.user,
            type: 0
        })
    },
    watch: {

    },
    computed: {
        year() {
            return Core.currentYear;
        },

    },
    async created() {

        if (this.user.agency) {

            this.agencyHave = true
            // if((this.user.is_staff || this.user.is_executive ) || this.user.is_superuser ){
            //     this.type= 0
            // }else{
            //     this.type = 1
            // }
        }
    },
    methods: {

    }

}
</script>
