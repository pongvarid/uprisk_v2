<template>
<div>
    <div id="chart" v-if="response" class="flex flex-col md:flex-row justify-center items-center">

        <div v-if="!col" class="w-full md:w-1/2">  
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
        <div class="w-full " :class="(col)?``:`md:w-1/2 md:pl-10`" >
            <CoreChart-StrategicTable :strategics="strategics" :series="series" :type="type"></CoreChart-StrategicTable>
          
        </div>
    </div>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'
import _ from 'lodash'
export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        type: { default: 1 },
        col: { default: false }
    },
    data: () => {
        return ({
            response: false,
            series: [{
                name: 'ความเสี่ยงน้อย',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'ความเสี่ยงปานกลาง',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'ความเสี่ยงสูง',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'ความเสี่ยงสูงมาก',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, ],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: '100%'
                },
                 colors:['#80ff00', '#ffff00', '#ff8040','#ff3c3c'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['ยุทธศาสตร์ที่ 1', 'ยุทธศาสตร์ที่ 2', 'ยุทธศาสตร์ที่ 3', 'ยุทธศาสตร์ที่ 4', 'ยุทธศาสตร์ที่ 5', 'ยุทธศาสตร์ที่ 6'],
                    title: {
                        text: 'ระดับความเสี่ยง (โอกาส x ผลกระทบ)'
                    }
                },
                yaxis: {
                    title: {
                        text: 'ประเด็นความเสี่ยง'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + " ประเด็น"
                        }
                    }
                }
            },
            strategics: [],
            titles: []

        })
    },
    watch: {
        async type() {
            this.response = false; 
            await this.initialize();
            this.response = true;
        }
    },
    async created() {
        this.response = false;
        await this.initialize();
        this.response = true;
    },
    methods: {
        async initialize() {
            await this.getTitle();
            await this.getData();
        },
        async getTitle() {
            this.strategics = await Core.getHttp(`/api/strategic/?year=${Core.currentYearTxt}`)
            this.strategics = _.sortBy(this.strategics, (o) => { return o.name; })
        },
        async getData() {
            this.titles = []
            for (let i = 0; i < this.strategics.length; i++) {
                this.titles.push(`ยุทธศาสตร์ที่ ${i+1}`)
                let raw = _.filter(CoreRisk.risks, (r) => { return (r.strategic_name == this.strategics[i].name) })
                let countAll = (raw).length
                this.strategics[i].fullname = `ยุทธศาสตร์ที่ ${this.strategics[i].name}`
                this.strategics[i].allcount = countAll
                this.strategics[i].raw = raw
            }
            this.chartOptions.xaxis.categories = this.titles

            let seriesSet = ['น้อย', 'ปานกลาง', 'สูง', 'สูงมาก'];
            let serises = []
            for (let i = 0; i < seriesSet.length; i++) {
                let data = []
                for (let j = 0; j < this.strategics.length; j++) {
                    let filter = this.filter(this.strategics[j].raw, seriesSet[i])
                    data.push(filter)
                }
                serises.push({
                    name: `ความเสี่ยง${seriesSet[i]}`,
                    data: data
                })
            }
            this.series = serises

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

    }
}
</script>

<style>

</style>
