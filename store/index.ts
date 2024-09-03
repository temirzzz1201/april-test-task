import { defineStore } from 'pinia'
import { POST_URL } from '~/utils/constants'
import axios from 'axios'
import { ref } from 'vue'
import type { IItem } from '~/types'

export const useItemsStore = defineStore('items', () => {
  const items = ref<IItem[]>([])
  const filteredItems = ref<IItem[]>([])
  const isFetching = ref<boolean>(false)
  const searchQuery = ref<string>('')
  const view = ref<'grid' | 'list'>('grid')

  const fetchItems = async (): Promise<void> => {
    isFetching.value = true
    try {
      const { data } = await axios.get<IItem[]>(POST_URL)
      items.value = data
      filteredItems.value = data
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      isFetching.value = false
    }
  }

  const searchItems = (query: string): void => {
    searchQuery.value = query
    if (!query) {
      filteredItems.value = items.value
    } else {
      filteredItems.value = items.value.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.body.toLowerCase().includes(query.toLowerCase())
      )
    }
  }

  return {
    items,
    filteredItems,
    isFetching,
    fetchItems,
    searchItems,
    searchQuery,
    view
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemsStore, import.meta.hot))
}
