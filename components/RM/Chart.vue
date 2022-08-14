<template>
  <div class="bg-white m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4">
    <div class="flex ">
       <i class="em em-bar_chart text-xl" aria-role="presentation" aria-label="BAR CHART"></i>
      <div class="pl-4">
        <h4 class="text-xl">กราฟความเสี่ยง</h4>
      </div>
    </div>

    <div id="chart" v-if="response">

      <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {'apexchart':VueApexCharts},
  props:{
    seriesData:{default:[]},
  },
  name: "Chart",
  async created(){
    this.series[0].data = [this.seriesData.ing, this.seriesData.end, this.seriesData.err]
    this.response = true;
  },
  data(){
    return ({
      response:false,
      series: [{
        name: 'จำนวนความเสี่ยง',
        data: [this.seriesData.ing, this.seriesData.end, this.seriesData.err],
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'radar',
        },
        xaxis: {
          categories: ['กำลังดำเนินการ', 'เสร็จสิ้น', 'ไม่สำเร็จ']
        }
      },
    })},
}
</script>

<style scoped>

</style>
