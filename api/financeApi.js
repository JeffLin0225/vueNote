class FinanceApi {
    constructor() {
      this.baseURL = '/api/finance'
    }
  
    async getColumns() {
      // return await fetch(`${this.baseURL}/columns`).then(r => r.json())
    }
  
    async saveColumn(column) {
      // return await fetch(`${this.baseURL}/columns`, {
      //   method: 'POST',
      //   body: JSON.stringify(column)
      // })
    }
  
    async updateColumn(columnId, data) {
      // return await fetch(`${this.baseURL}/columns/${columnId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(data)
      // })
    }
  
    async deleteColumn(columnId) {
      // return await fetch(`${this.baseURL}/columns/${columnId}`, {
      //   method: 'DELETE'
      // })
    }
  
    // SubCategory APIs
    async saveSubCategory(columnId, subCategory) {
      // ...
    }
  
    async updateSubCategory(columnId, subId, data) {
      // ...
    }
  
    async deleteSubCategory(columnId, subId) {
      // ...
    }
  
    // Item APIs
    async saveItem(columnId, subId, item) {
      // ...
    }
  
    async updateItem(columnId, subId, itemId, data) {
      // ...
    }
  
    async deleteItem(columnId, subId, itemId) {
      // ...
    }
  }
  
  export const financeApi = new FinanceApi()
