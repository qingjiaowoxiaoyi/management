<template>
   <span>
    <div id="myEcharts" style="height:600px;width:800px;"></div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import echarts from "echarts";
import {get,post,put,deletefn} from '@/api/axios';
@Component({
  name:'TotalChart',
  components: {
    
  },
})

export default class TotalChart extends Vue {
  data:Array<any>=[];

  dateList:Array<any>=[];

  myChart = echarts.init((document as any).getElementById('myEcharts'));

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
          data: ['统计营业额']
      },
      toolbox: {
          feature: {
              saveAsImage: {},
              magicType: {type: ['line', 'bar']},
          },
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              data: this.dateList
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '统计营业额',
              type: 'line',
            //   stack: '总量',
            //   areaStyle: {},
              data: this.data
          }
      ]
    });
  }

  // 获取表格数据
  getData(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/admin/revenue')
    .then(res=>{
      this.data=(res as any).data.revenue;
      this.drawLine();
    })
    .catch(err => {
       this.$Message.error('加载失败'+err);
    })
    .finally(() => {
      loading.finish();
    //   this.data = [120, 132, 101, 134, 90, 230, 210];
    //   this.drawLine();
    });
  }

  mounted() {
     for(let i = 0; i<12 ; i++){
         let mouths = '' as any;
         if(i+1>=10){
             mouths = new Date().getFullYear() + '-' + (i + 1);
         }else{
             mouths = new Date().getFullYear() + '-0' + (i + 1);
         }
         this.dateList.push(mouths)
     }

     this.drawLine(); 
     this.getData();
  }
}
</script>

<style scoped>
</style>
