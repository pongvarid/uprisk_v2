<template>
<div >
    <div id="chart" v-if="response">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      
    </div>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { Core } from '@/vuexes/core'
import { CoreRisk } from '@/vuexes/core_risk'
import _ from 'lodash'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
export default {
    components: {
        apexchart: VueApexCharts,
    },
    data() {
        return ({
            series: [],

            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                colors:['#008bce', '#8000ff', '#400080'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                        borderRadius: 10,
                    },
                },
                dataLabels: {
                    enabled: false, 
                },

                xaxis: {
                    categories: [],
                },
                yaxis: {
                    title: {
                        text: ' ระดับความเสี่ยง (โอกาส x ผลกระทบ)'
                    },
                    max: 25,
                    min: 0,
                    tickAmount: 6,
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "(โอกาส x ความเสี่ยง) " + val 
                        }
                    }
                },
                annotations: {
                    position: "front",
                    yaxis: [{
                            label: {
                                text: "ต่ำ",
                                borderColor: '#00E396', 
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#00E396',
                                },
                            },
                            y: 0,
                            y2: 2,
                            fillColor: "rgba(71, 255, 47, 0.5)"
                        },
                        {
                            label: {
                                text: "ปานกลาง ",
                                borderColor: '#ffff00', 
                                style: {
                                    fontSize: '14px',
                                    color: '#400000',
                                    background: '#ffff00',
                                },
                            },
                            y: 2.1,
                            y2: 6,
                            fillColor: "rgba(249, 255, 47, 0.5)"
                        },
                        {
                            label: {
                                text: "สูง ",
                                borderColor: '#ff8040', 
                                 offsetY: 20,
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#ff8040',
                                },
                            },
                            y: 6.1,
                            y2: 12,
                            fillColor: "rgba(300,120, 12, 0.5)",

                        },
                        {
                            label: {
                                text: "สูงมาก ",
                                borderColor: '#ff3c3c',
                                     offsetY: 50,  
                                style: {
                                    fontSize: '14px',
                                    color: '#fff',
                                    background: '#ff3c3c',
                                     
                                },
                            },
                            y: 12.1,
                            y2: 25,
                            fillColor: 'rgba(207, 0, 0, 0.5)',

                        }
                    ]
                }

            },

              strategics: [],
            titles: [], 
            raw:[],
            response:false, 
        })
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
              let raw = [];
               let seriesType = [0,6,12] 
            for (let i = 0; i < this.strategics.length; i++) {
                this.titles.push(`ยุทธศาสตร์ที่ ${i+1}`)
                let raw = _.filter(CoreRisk.risks, (r) => { return (r.strategic_name == this.strategics[i].name) })
                let countAll = (raw).length
                this.strategics[i].fullname = `ยุทธศาสตร์ที่ ${this.strategics[i].name}`
                this.strategics[i].allcount = countAll
                //this.strategics[i].raw = raw 
                for (let j=0; j< seriesType.length; j++ ){
                    let up1 = this.filter(raw, 'น้อย',seriesType[j]) 
                    let up2 = this.filter(raw, 'ปานกลาง',seriesType[j]) 
                    let up3 = this.filter(raw, 'สูง',seriesType[j]) 
                    let up4 = this.filter(raw, 'สูงมาก',seriesType[j]) 
                    let all = raw.length
                    let avg = ((up4*4)+(up3*3)+(up2*2)+(up1*1))/all 
                    let rawScore = isNaN(avg)?0:avg
                    let result = (rawScore*25)/4
                    this.strategics[i][`data${seriesType[j]}`] = Number((result).toFixed(2))
                    console.log(`${seriesType[j]} ยุทธศาสตร์ที่ ${i+1}`,up1,up2,up3,up4,all)
                }
                //_.map(raw,(o)=>{return o.rate0}) 
            }
            let series = [{
                name: 'RM-Plan',  type: 'column',
                data: _.map(this.strategics,'data0'), 
            }, {
                name: 'RM-6',
                  type: 'column',
                data: _.map(this.strategics,'data6'), 
            }, {
                name: 'RM-12',  type: 'column',
                data: _.map(this.strategics,'data12'), 
            }  
            ]
            this.series = series
            this.chartOptions.xaxis.categories = this.titles
            console.log(_.map(this.strategics,''));
            let seriesSet = ['น้อย', 'ปานกลาง', 'สูง', 'สูงมาก'];
           
            
         

        },




              filter(obj, check,types) {
            let data = []
            if (types == 0) { 
                data = _.filter(obj, (r) => { return (r.rate0 == check) })
            } else if (types == 6) {
           
                data = _.filter(obj, (r) => { return (r.rate6 == check) })
            } else if (types == 12) {
              
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
