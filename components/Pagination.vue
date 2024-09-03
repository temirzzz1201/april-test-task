<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Пред</button>
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
      class="pagination__btn"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    
    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">След</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  pagination: Object as PropType<{ currentPage: number; totalPages: number }>
})
const emit = defineEmits(['page-changed'])

const currentPage = computed(() => props.pagination?.currentPage ?? 1)
const totalPages = computed(() => props.pagination?.totalPages ?? 0)

const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 5px;
  margin-top: 20px;
  margin-bottom: 40px;

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
  }

  button.active {
    font-size: 14px;
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>
