import { reactive } from 'vue'

export function useFinanceData() {
  const columns = reactive([
    {
      id: 'asset',
      title: '資產',
      subCategories: [
        {
          id: 'cash',
          title: '現金',
          items: [{ id: 1, name: '錢包', amount: 5000, note: '' }]
        }
      ]
    },
    {
      id: 'liability',
      title: '負債',
      subCategories: [
        {
          id: 'credit',
          title: '信用卡',
          items: [{ id: 2, name: '台新卡', amount: -2000, note: '水電費' }]
        }
      ]
    },
    {
      id: 'other',
      title: '其他',
      subCategories: []
    }
  ])

  // Column 操作
  const removeColumn = (columnId) => {
    const idx = columns.findIndex(c => c.id === columnId)
    if (idx !== -1) columns.splice(idx, 1)
  }

  // SubCategory 操作
  const addSubCategory = (columnId) => {
    const col = columns.find(c => c.id === columnId)
    if (col) {
      col.subCategories.push({
        id: Date.now().toString(),
        title: '新小標題',
        items: []
      })
    }
  }

  const removeSubCategory = (columnId, subId) => {
    const col = columns.find(c => c.id === columnId)
    if (col) {
      col.subCategories = col.subCategories.filter(s => s.id !== subId)
    }
  }

  const updateSubTitle = (columnId, subId, title) => {
    const col = columns.find(c => c.id === columnId)
    if (col) {
      const sub = col.subCategories.find(s => s.id === subId)
      if (sub) {
        sub.title = title
      }
    }
  }

  // Item 操作
  const addItem = (columnId, subId) => {
    const col = columns.find(c => c.id === columnId)
    if (col) {
      const sub = col.subCategories.find(s => s.id === subId)
      if (sub) {
        sub.items.push({
          id: Date.now(),
          name: '',
          amount: 0,
          note: ''
        })
      }
    }
  }

  const removeItem = (columnId, subId, itemId) => {
    const col = columns.find(c => c.id === columnId)
    if (col) {
      const sub = col.subCategories.find(s => s.id === subId)
      if (sub) {
        sub.items = sub.items.filter(i => i.id !== itemId)
      }
    }
  }

  // 为 API 串接准备的方法
  const saveData = async () => {
    // await api.saveFinanceData(columns)
  }

  const loadData = async () => {
    // const data = await api.getFinanceData()
    // columns.splice(0, columns.length, ...data)
  }

  return {
    columns,
    removeColumn,
    addSubCategory,
    removeSubCategory,
    updateSubTitle,
    addItem,
    removeItem,
    saveData,
    loadData
  }
}
