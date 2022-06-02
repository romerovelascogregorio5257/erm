<template>

  <div class=" h-full w-full lg:col-span-6 col-span-12  ">


    <h2 class="mb-5 text-lg font-medium truncate ">Detalle de reporte completados</h2>


    <pie-chart
    :label_s="chartLabels"
    :date="state.pieChart.data"
    ></pie-chart>
  </div>

  <div class="h-full w-full lg:col-span-6 col-span-12  ">


    <h2 class="mb-5 text-lg font-medium truncate ">Detalle de reporte completados</h2>


    <div class="intro-y h-full box p-5">
      <div class="mt-5" >
        <div class="flex items-center" v-for="box in state.pieChart.retried_data">
          <indicator-pie-chart
              :indicator_hour="box.hour"
              :indicator_count="box.count"

          ></indicator-pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import PieChart from "@/views/erm/checkpoint/report/dashboard/sections/PieChart.vue"
import IndicatorPieChart from "@/components/boxes/indicator-box/IndicatorPieChart.vue"
import {reactive, toRefs} from "vue";
import {cprAxios} from "@/endpoint/endpointResolver";


const chartLabels = ['Completados','Reenviados', 'Rehechos']
const state = reactive({
  pieChart : [{
    data: [],

  }
  ],
})

const getReportablesPieChart = ()=> {
  // loading_state.value = true
  cprAxios.post('reportables-pie-chart', {
    type : "DGA",
    start_date: "2022-05-01 00:00:00",
    end_date: "2022-05-24 23:59:59"
  }).then(res => {
    state.pieChart = res.data
    state.pieChart["data"] = [
      res.data.ok_count,
      res.data.retried_count,
      res.data.remake_count
    ]
    console.log(res.data)

    // loading_state.value=false
  }).catch(err => console.log(err))
}
getReportablesPieChart()
toRefs(state)

</script>