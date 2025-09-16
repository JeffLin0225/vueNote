<template>
    <div class="card">
      <div class="card-header">
        <button class="delete-btn" @click="$emit('remove-item')">✕</button>
      </div>
      <input v-model="item.name" placeholder="名稱" />
      <input v-model.number="item.amount" type="number" placeholder="金額" />
      <textarea v-model="item.note" placeholder="備註"></textarea>
    </div>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  
  defineEmits(['remove-item'])
  </script>
  
  <style scoped>
  .card {
    background: white;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .card-header {
    display: flex;
    justify-content: flex-end;
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
  input, textarea {
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  </style>
