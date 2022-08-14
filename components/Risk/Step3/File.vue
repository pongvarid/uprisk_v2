<template>
<div><br>
    <v-card outlined class="p-6">
        <v-file-input  v-if="rm_type == current_type" :clearable="false" class="w-1/2" @change="updateFile()" v-model="file" label="แนบไฟล์" show-size outlined dense></v-file-input>
        <div v-for="file,i in listFile" :key="i">
            <v-toolbar flat>
                <a :href="`${url}/${file.file}`" target="_blank" rel="noopener noreferrer">{{file.file}}</a>
                <v-spacer></v-spacer>
                <v-btn  v-if="rm_type == current_type" outlined dark @click="removeFile(file.id)" color="red">ลบ</v-btn>
            </v-toolbar>
        </div> 
    </v-card>

</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";

export default {
    props: {
        risk: {
            default: null
        },
        readonly: {
            default: false
        },
        rm_type: {
            default: 6
        },
        current_type: {
            default: 6
        }
    },
    data() {
        return ({
            url: Core.url,
            rm: [],
            file: null,
            listFile: [],
            response: false
        })
    },
    async created() {
        await this.check()

    },
    methods: {
        async check() {
            this.response = false;
            await Web.switchLoad(true)
            this.listFile = await Core.getHttp(`/api/overall-file/?risk=${this.risk.id}&rm_type=${this.current_type}`)
            await Web.switchLoad(false)
            this.response = true;
        },

        async removeFile(id){
            await Core.deleteHttpAlert(`/api/overall-file/${id}/`)
            await this.check();
        },

        async updateFile() {
            await Web.switchLoad(true)
            let formData = new FormData()
            formData.append("risk", this.risk.id)
            formData.append("rm_type", this.current_type)
            formData.append("file", this.file, this.file.name)
            let data = await Core.postHttpAlert(`/api/overall-file/`, formData)
            this.file = null
            await Web.switchLoad(false)
            await this.check();
        },

    }
}
</script>

<style>

</style>
