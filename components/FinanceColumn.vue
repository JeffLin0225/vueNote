// 2. 子组件 - FinanceColumn.vue
<template>
  <div class="column">
    <div class="column-header">
      <h3>{{ column.title }}</h3>
      <button class="delete-btn" @click="$emit('remove-column', column.id)">✕</button>
    </div>

    <button class="add-sub-btn" @click="$emit('add-sub-category', column.id)">
      ＋ 新增小標題
    </button>

    <draggable
      v-model="column.subCategories"
      group="subCategories"
      item-key="id"
      :empty-insert-threshold="50"
      :swap-threshold="0.3"
      ghost-class="drag-ghost"
      chosen-class="drag-chosen"
    >
      <template v-if="column.subCategories.length === 0">
        <div class="empty-placeholder">拖拉小標題到這裡</div>
      </template>

      <template #item="{ element: sub }">
        <FinanceSubCategory
          :sub-category="sub"
          :column-id="column.id"
          @remove-sub-category="$emit('remove-sub-category', $event.columnId, $event.subId)"
          @add-item="$emit('add-item', $event.columnId, $event.subId)"
          @remove-item="$emit('remove-item', $event.columnId, $event.subId, $event.itemId)"
          @update-title="$emit('update-sub-title', $event.columnId, $event.subId, $event.title)"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import FinanceSubCategory from './FinanceSubCategory.vue'

defineProps({
  column: {
    type: Object,
    required: true
  }
})

defineEmits([
  'remove-column',
  'add-sub-category',
  'remove-sub-category',
  'add-item',
  'remove-item',
  'update-sub-title'
])
</script>

<style scoped>
.column {
  width: 320px;
  min-height: 500px;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete-btn {
  background: transparent;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
}
.delete-btn:hover {
  color: red;
}
.add-sub-btn {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 4px;
  background: #4cafef;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.add-sub-btn:hover {
  background: #3a9bdc;
}
.empty-placeholder {
  min-height: 60px;
  background: #fff8dc;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
}
</style>
