<template>
    <div class="sub-column">
      <div class="sub-header">
        <template v-if="isEditing">
          <input
            v-model="editTitle"
            @blur="stopEditing"
            @keyup.enter="stopEditing"
            class="edit-input"
            autofocus
          />
        </template>
        <template v-else>
          <h4 @dblclick="startEditing">{{ subCategory.title }}</h4>
        </template>
        <button 
          class="delete-btn" 
          @click="$emit('remove-sub-category', { columnId, subId: subCategory.id })"
        >
          ✕
        </button>
      </div>
  
      <button 
        class="add-btn" 
        @click="$emit('add-item', { columnId, subId: subCategory.id })"
      >
        ＋ 新增卡片
      </button>
  
      <draggable
        v-model="subCategory.items"
        group="items"
        item-key="id"
        :empty-insert-threshold="50"
        :swap-threshold="0.3"
        ghost-class="drag-ghost"
        chosen-class="drag-chosen"
      >
        <template v-if="subCategory.items.length === 0">
          <div class="empty-placeholder">拖拉卡片到這裡</div>
        </template>
  
        <template #item="{ element: item }">
          <FinanceCard
            :item="item"
            @remove-item="$emit('remove-item', { columnId, subId: subCategory.id, itemId: item.id })"
          />
        </template>
      </draggable>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import draggable from 'vuedraggable'
  import FinanceCard from './FinanceCard.vue'
  
  const props = defineProps({
    subCategory: {
      type: Object,
      required: true
    },
    columnId: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits([
    'remove-sub-category',
    'add-item',
    'remove-item',
    'update-title'
  ])
  
  const isEditing = ref(false)
  const editTitle = ref('')
  
  const startEditing = () => {
    isEditing.value = true
    editTitle.value = props.subCategory.title
  }
  
  const stopEditing = () => {
    isEditing.value = false
    if (editTitle.value !== props.subCategory.title) {
      emit('update-title', {
        columnId: props.columnId,
        subId: props.subCategory.id,
        title: editTitle.value
      })
    }
  }
  </script>
  
  <style scoped>
  .sub-column {
    background: #e8e8e8;
    padding: 6px;
    margin-bottom: 10px;
    border-radius: 4px;
    min-height: 120px;
  }
  .sub-header {
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
  .add-btn {
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
  .add-btn:hover {
    background: #3a9bdc;
  }
  .edit-input {
    width: 100%;
    padding: 2px;
    font-size: 14px;
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
