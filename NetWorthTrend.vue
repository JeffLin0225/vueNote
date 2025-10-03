<template>
    <!-- ECharts 容器 -->
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import * as echarts from 'echarts'
  
  // 1️⃣ 定義 props：父層會傳 snapshots 陣列進來
  const props = defineProps<{
    snapshots: Array<{ date: string; totals: { netWorth: number } }>
  }>()
  
  // 2️⃣ 定義 emit：父層可以監聽 day-click 事件
  const emit = defineEmits<{
    (e: 'day-click', payload: { date: string; snapshot: any }): void
  }>()
  
  // 3️⃣ 綁定 DOM
  const chartRef = ref<HTMLDivElement | null>(null)
  
  onMounted(() => {
    if (!chartRef.value) return
    const chart = echarts.init(chartRef.value)
  
    // 4️⃣ 準備資料
    const dates = props.snapshots.map(s => s.date)
    const values = props.snapshots.map(s => s.totals.netWorth)
  
    // 5️⃣ 設定圖表 option
    chart.setOption({
      title: { text: '淨值趨勢圖' },
      tooltip: { trigger: 'axis',
            axisPointer: {
            type: 'line', // 預設就是 line
                lineStyle: {
                    type: 'dashed',   // 虛線
                    color: '#003D79',    // 顏色
                    width: 1
                }
            }
        },
      xAxis: { type: 'category', data: dates },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { color: '#4CAF50' },
          areaStyle: { color: 'rgba(76, 175, 80, 0.1)' }
        }
      ]
    })
  
    // 6️⃣ 監聽點擊事件
    chart.getZr().on('click', (event: any) => {
  const pointInPixel = [event.offsetX, event.offsetY]
  if (chart.containPixel('grid', pointInPixel)) {
    const xIndex = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel)[0]
    const clickedDate = dates[xIndex]
    const snapshot = props.snapshots[xIndex]
    emit('day-click', { date: clickedDate, snapshot })
  }
})
  })
  </script>
  
