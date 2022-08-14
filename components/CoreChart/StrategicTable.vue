<template>
<div class="shadow-2xl p-2 rounded-xl bg-white  border-r-4 border-t-4 border-purple-400"> 
    <table id="tg-slUZZ" class="w-full border-0 rounded-xl ">
        <thead>
            <tr>
                <th class="tg-j1i3">ยุทธศาสตร์มหาวิทยาลัย</th>
                <th class="tg-ul38 bg-purple-200">ประเด็นความเสี่ยง</th>
                <th class="tg-ul38 bg-c-vh">สูงมาก</th>
                <th class="tg-ul38 bg-c-h">สูง</th>
                <th class="tg-ul38  bg-c-m">ปานกลาง</th>
                <th class="tg-ul38  bg-c-l">ต่ำ</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="strategic,i in strategics" :key="i">
                <td class="w-7/12 h-12 ">{{strategic.fullname}}</td>
                <td class="w-1/12 " :class="(strategic.allcount > 0)?`bg-purple-100`:``">{{strategic.allcount}}</td>
                <td class="w-1/12" :class="(filter(strategic.raw,'สูงมาก') > 0)?`bg-red-100`:`` "  >{{filter(strategic.raw,'สูงมาก')}}</td>
                <td class="w-1/12 " :class="(filter(strategic.raw,'สูง') > 0)?`orange lighten-3`:`` "   >{{filter(strategic.raw,'สูง')}}</td>
                <td class="w-1/12 " :class="(filter(strategic.raw,'ปานกลาง') > 0)?`yellow lighten-4`:`` "   >{{filter(strategic.raw,'ปานกลาง')}}</td>
                <td class="w-1/12 " :class="(filter(strategic.raw,'น้อย') > 0)?`bg-green-100`:`` "   >{{filter(strategic.raw,'น้อย')}}</td>
            </tr>
            <tr class="bg-purple-600 text-white">
                <td class="w-7/12 h-12 pl-4">รวม</td>
                <td class="w-1/12 ">{{sumAll(strategics)}}</td>
                <td class="w-1/12 "> {{sumValue('ความเสี่ยงสูงมาก')}}</td>
                <td class="w-1/12 "> {{sumValue('ความเสี่ยงสูง')}}</td>
                <td class="w-1/12 "> {{sumValue('ความเสี่ยงปานกลาง')}}</td>
                <td class="w-1/12 "> {{sumValue('ความเสี่ยงน้อย')}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    props: {
        strategics: { default: [] },
        series: { default: [] },
        type:{default:0}
    },
    data: () => {
        return ({

        })
    },
    async created() {

    },
 
    methods: {
        async initialize() {

        },
        filter(obj, check) {
            let data = []
            if (this.type == 0) {
                data = _.filter(obj, (r) => { return (r.rate0 == check) })
            } else if (this.type == 6) {
                data = _.filter(obj, (r) => { return (r.rate6 == check) })
            } else if (this.type == 12) {
                data = _.filter(obj, (r) => { return (r.rate12 == check) })
            } else {
                data = []
            } 
            return data.length
        },
          sumAll(obj){
            let sum = _.sumBy(obj, 'allcount'); 
            return sum
        },
        sumValue(check){
            let data = _.find(this.series,(o)=>{return o.name == check})
            console.log(this.series,check,data);
            return    _.sum(data.data,'data')
        }


    }
}
</script>


