<template>
    <!-- 折線圖 -->
    <NetWorthTrend :snapshots="snapshots" @day-click="handleDayClick" />
  
    <!-- 點擊某一天後，顯示圓餅圖 -->
    <AssetCategoryPie
      v-if="selectedSnapshot"
      :assetData="selectedSnapshot.assets"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import NetWorthTrend from '@/components/NetWorthTrend.vue'
  import AssetCategoryPie from '@/components/AssetCategoryPie.vue'
  import * as echarts from 'echarts'

  // 模擬快照資料
  const snapshots = ref([
    {
      date: '2025-09-23',
      totals: { netWorth: 1000000 },
      assets: {
        cash: { total: 200000 },
        stock: { total: 500000 },
        crypto: { total: 300000 },
        total: 1000000
      }
    },
    {
      date: '2025-09-24',
      totals: { netWorth: 1020000 },
      assets: {
        cash: { total: 210000 },
        stock: { total: 520000 },
        crypto: { total: 290000 },
        total: 1020000
      }
    },
    {
      date: '2025-09-25',
      totals: { netWorth: 1015000 },
      assets: {
        cash: { total: 190000 },
        stock: { total: 510000 },
        crypto: { total: 315000 },
        total: 1015000
      }
    }
  ])
  
  // 當前選中的快照
  const selectedSnapshot = ref<any | null>(null)
  
  // 事件處理：接收子元件 emit 的 day-click
  function handleDayClick({ date, snapshot }: { date: string; snapshot: any }) {
    console.log('使用者點擊日期：', date)
    selectedSnapshot.value = snapshot
  }
  </script>
  
