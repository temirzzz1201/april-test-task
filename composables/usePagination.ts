import { ref, computed } from 'vue'
import type { IItem, IPagination } from '~/types'

export const usePagination = (items: Ref<IItem[]>, itemsPerPage: number) => {
  const pagination = ref<IPagination>({
    currentPage: 1,
    itemsPerPage,
    totalPages: 0
  })

  const totalPages = computed(() => {
    const total = Math.ceil(items.value.length / pagination.value.itemsPerPage)
    pagination.value.totalPages = total
    return total
  })

  const paginatedItems = computed(() => {
    const start = (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
    const end = start + pagination.value.itemsPerPage
    return items.value.slice(start, end)
  })

  function changePage(page: number) {
    if (page > 0 && page <= totalPages.value) {
      pagination.value.currentPage = page
    }
  }

  return {
    pagination,
    totalPages,
    paginatedItems,
    changePage
  }
}
