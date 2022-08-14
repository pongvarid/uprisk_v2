<template>
<div>
    <v-btn color="primary" @click="dialog = true">สร้าง</v-btn>
    <v-dialog v-model="dialog" v-if="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title>สร้างความเสี่ยง
                <v-spacer></v-spacer>
                <v-btn dark small color="red" @click="loadForm && (dialog = false)">
                    <v-icon>mdi-close</v-icon> ยกเลิก
                </v-btn>
            </v-card-title>
            <v-card-text>
                <form ref="formRisk" @submit.prevent="saveRisk()" class="mt-4">
                    <v-textarea rows="2" required v-model="form.name" outlined label="หัวข้อความเสี่ยง"></v-textarea>
                    <v-select required :items="env.mission" item-value="id" item-text="name" v-model="form.mission" outlined label="พันธกิจ"></v-select>
                    <v-btn color="success" large block type="submit">สร้าง</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Auth } from "@/vuexes/auth";
import { Risk } from "@/vuexes/risk";
import { Web } from "@/vuexes/web";

export default {
    props: {
        agency: {
            default: Auth.user.agency_id,
        },
    },

    data() {
        return {
            user: Auth.user,
            dialog: false,
            defautForm: {
                year: Core.currentYear.id,
                agency: this.agency,
                user: Auth.user.id,
            },
            form: {},
        };
    },
    methods: {
        async loadForm() {
            this.form = Object.assign({}, this.defautForm);
        },
        async saveRisk() {
            let risk = await Core.postHttp(`/api/risk/`, this.form);
            if (risk.id) {
                await Web.alert("บันทึกข้อมูลสำเร็จ", "success", "");
                this.dialog = false;
                this.form = {};
                await this.loadForm();
                await Risk.setAgency(this.agency);
                await this.$emit("reload",this.agency);
            }
        },
    },
    async created() {
        await this.loadForm();
    },
    computed: {
        year() {
            return Core.currentYear;
        },
        env() {
            return Core.choices;
        },
    },
};
</script>
