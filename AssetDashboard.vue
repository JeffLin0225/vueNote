npm install echarts


import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const AssetLiabilityDashboard = () => {
  // 模擬資產資料
  const [assets, setAssets] = useState([
    { name: '台股', value: 500000, color: '#3b82f6' },
    { name: '美股', value: 300000, color: '#8b5cf6' },
    { name: '加密貨幣', value: 150000, color: '#f59e0b' },
    { name: '現金', value: 200000, color: '#10b981' },
    { name: '定存', value: 350000, color: '#06b6d4' }
  ]);

  // 模擬負債資料
  const [liabilities, setLiabilities] = useState([
    { name: '信用卡', value: 50000, color: '#ef4444' },
    { name: '房貸', value: 300000, color: '#dc2626' },
    { name: '車貸', value: 80000, color: '#f87171' }
  ]);

  // 計算總資產和總負債
  const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  // 資產負債比較資料
  const comparisonData = [
    { name: '總資產', value: totalAssets },
    { name: '總負債', value: totalLiabilities },
    { name: '淨資產', value: netWorth }
  ];

  // 模擬歷史淨資產趨勢
  const [trendData] = useState([
    { month: '1月', value: 1200000 },
    { month: '2月', value: 1250000 },
    { month: '3月', value: 1180000 },
    { month: '4月', value: 1320000 },
    { month: '5月', value: 1400000 },
    { month: '6月', value: netWorth }
  ]);

  // 格式化數字
  const formatNumber = (num) => {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0
    }).format(num);
  };

  // 自訂 Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-emerald-400">{formatNumber(payload[0].value)}</p>
          <p className="text-gray-400 text-sm">
            {((payload[0].value / (payload[0].payload.name.includes('負債') ? totalLiabilities : totalAssets)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 標題 */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">財務儀表板</h1>
          <p className="text-gray-400">即時監控你的資產與負債狀況</p>
        </div>

        {/* 總覽卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-1">總資產</p>
            <p className="text-white text-3xl font-bold">{formatNumber(totalAssets)}</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingDown className="text-white" size={24} />
              </div>
            </div>
            <p className="text-red-100 text-sm mb-1">總負債</p>
            <p className="text-white text-3xl font-bold">{formatNumber(totalLiabilities)}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Wallet className="text-white" size={24} />
              </div>
            </div>
            <p className="text-emerald-100 text-sm mb-1">淨資產</p>
            <p className="text-white text-3xl font-bold">{formatNumber(netWorth)}</p>
          </div>
        </div>

        {/* 圖表區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 資產配置圓餅圖 */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">資產配置</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {assets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {assets.map((asset, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                  <span className="text-gray-300 text-sm">{asset.name}</span>
                  <span className="text-gray-400 text-xs ml-auto">{formatNumber(asset.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 負債配置圓餅圖 */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">負債結構</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={liabilities}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {liabilities.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {liabilities.map((liability, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: liability.color }}></div>
                  <span className="text-gray-300 text-sm">{liability.name}</span>
                  <span className="text-gray-400 text-xs ml-auto">{formatNumber(liability.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 資產負債比較長條圖 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">資產負債比較</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 10000).toFixed(0)}萬`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#10b981' }}
                formatter={(value) => formatNumber(value)}
              />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 淨資產趨勢圖 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">淨資產趨勢</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" tickFormatter={(value) => `${(value / 10000).toFixed(0)}萬`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#3b82f6' }}
                formatter={(value) => formatNumber(value)}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AssetLiabilityDashboard;
