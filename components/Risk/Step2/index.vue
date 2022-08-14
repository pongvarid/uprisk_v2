<template>
<div>
    <v-card outlined class="p-6">
        <h2 class="text-xl font-bold text-red-500">สาเหตุ/ปัจจัยเสี่ยง</h2>
        <div class="flex mt-2">
            <div class="w-full">
                <form @submit.prevent="saveCourse()" class="flex">
                    <v-select required value="1" v-model="courseForm.type" item-value="id" item-text="value" :items="[
                { id: 1, value: 'ปัจจัยภายใน' },
                { id: 2, value: 'ปัจจัยภายนอก' },
              ]" label="ปัจจัยเสี่ยง" class="mr-2" dense outlined></v-select>
                    <v-text-field required v-model="courseForm.value" dense outlined label="ระบุสาเหตุ"></v-text-field>
                    <v-btn type="submit" color="warning" class="ml-2"> + เพิ่ม</v-btn>
                </form>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/2">
                        <h2 class="font-bold">
                            <i class="em em-arrow_heading_down mr-2" aria-role="presentation"></i>ปัจจัยภายใน
                        </h2>
                        <v-timeline align-top dense>
                            <v-timeline-item large v-for="(course, i) in filter(courses, { type: 1 })" :key="i" color="purple" small>
                                <template v-slot:icon class="p-4">
                                    <span class="text-xl text-white">{{ i + 1 }}</span>
                                </template>
                                   <Core-RMTitle :rm_type="course.rm_type" />
                                <v-textarea rows="2" outlined v-model="course.value"></v-textarea>
                                <v-btn @click="editCourse(course)" small outlined dark color="success">บันทึกข้อมูลการแก้ไข</v-btn>
                                <v-btn @click="deleteCourse(course.id)" small outlined dark color="red">ลบ</v-btn>
                            </v-timeline-item>
                        </v-timeline>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h2 class="font-bold">
                            <i class="em em-arrow_heading_up mr-2" aria-role="presentation"></i>ปัจจัยภายนอก
                        </h2>
                        <v-timeline align-top dense>
                            <v-timeline-item large v-for="(course, i) in filter(courses, { type: 2 })" :key="i" color="purple" small>
                                <template v-slot:icon class="p-4">
                                    <span class="text-xl text-white">{{ i + 1 }}</span>
                                </template>
                                  <Core-RMTitle :rm_type="course.rm_type" />
                                <v-textarea rows="2" outlined v-model="course.value"></v-textarea>
                                <v-btn @click="editCourse(course)" small outlined dark color="success">บันทึกข้อมูลการแก้ไข</v-btn>
                                <v-btn @click="deleteCourse(course.id)" small outlined dark color="red">ลบ</v-btn>
                            </v-timeline-item>
                        </v-timeline>
                    </div>
                </div>
            
            </div>
        </div>
    </v-card>
    <br />
 
</div>
</template>

<script>
import { Core } from "@/vuexes/core";
import { Web } from "@/vuexes/web";
export default {
    props: {
        risk: {
            default: {},
        },
        rm_type:{
            default: 1
        }
    },
    data() {
        return {
            choices: Core.choices,
            defaultForm: {
                rm_type: this.rm_type,
                risk: this.risk.id,
            },
            courseForm: {}, 
            courses: [],
   
        };
    },
    computed: {},
    methods: {
        filter(data, fill) {
            return _.filter(data, fill);
        },
        async saveCourse() {
            this.courseForm.rm_type = this.rm_type
            let course = await Core.postHttpAlert(`/api/cause/`, this.courseForm);
            if (course.id) {
                this.courseForm.value = "";
                await this.loadCourse();
            }
        },
        async loadCourse() {
            this.courses = await Core.getHttp(
                `/api/cause/?risk=${this.risk.id}`
            );
        },
        async deleteCourse(id) {
            await Core.deleteHttpAlert(`/api/cause/${id}/`);
            await this.loadCourse();
        },
        async editCourse(course) {
            await Core.putHttpAlert(`/api/cause/${course.id}/`, course);
            await this.loadCourse();
        },
        async setDefault() {
            this.courseForm = Object.assign({}, this.defaultForm);
   
        },
    },
    async created() {
         await Web.switchLoad(true);
        await this.setDefault();
        await this.loadCourse(); 
        await Web.switchLoad(false);
    },
};
</script>
