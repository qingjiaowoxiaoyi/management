<template>
   <span>
    <div id="myEcharts" style="height:600px;width:800px;"></div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from "echarts";

@Component({
  name:'TotalChart',
  components: {
    
  },
})

export default class TotalChart extends Vue {
  drawLine(){
    // 引入 ECharts 主模块
    var echarts = require('echarts');

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myEcharts'));
    // 绘制图表
    myChart.setOption({
      title: {
          text: '堆叠区域图'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data: ['购买总量', '收藏总量']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              data: ['2019.12', '2020.01', '2020.02', '2020.03', '2020.04', '2020.05', '2020.06']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '购买总量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: '收藏总量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
          }
      ]
    });
  }

  mounted() {
     this.drawLine(); 
  }
}
</script>

<style scoped>
</style>
