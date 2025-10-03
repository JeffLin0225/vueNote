<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import * as echarts from 'echarts'       // ⭐ 直接整包引入
import VChart from 'vue-echarts'         // ⭐ 引入 vue-echarts 元件

// 局部註冊
const components = { 'v-chart': VChart }

  const props = defineProps<{
    assetData: Record<string, { total: number }>
  }>()
  
  const option = computed(() => {
    const data = Object.entries(props.assetData)
      .filter(([key]) => key !== 'total')
      .map(([key, val]) => ({ name: key, value: val.total }))
  
    return {
      title: { text: '資產分布', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  })
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
  
