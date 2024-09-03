<template>
  <div class="container">
    <h1 class="title">Страница постов</h1>
    <div class="catalog">
      <input class="catalog__input" v-model="searchQuery" @input="search" placeholder="Поиск..." />
      
      <div class="catalog__btns-block">
        <button @click="changeView('grid')">Таблица</button>
        <button @click="changeView('list')">Список</button>
      </div>
      
      <div v-if="isFetching">
        Загрузка постов...
      </div>
      
      <div v-else :class="['items', view]">
        <ItemCard
          v-for="item in paginatedItems"
          :key="item.id"
          :item="item"
          @click="openModal(item)"
        />
      </div>

      <Pagination v-if="totalPages" :pagination="pagination" @page-changed="changePage" />
      
      <Modal
        :item="selectedItem"
        :visible="modalVisible"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onServerPrefetch } from 'vue'
import { useItemsStore } from '@/store'
import { usePagination } from '@/composables/usePagination'
import { useModal } from '@/composables/useModal'
import ItemCard from '@/components/ItemCard.vue'
import Pagination from '~/components/Pagination.vue'
import Modal from '~/components/Modal.vue'
import { storeToRefs } from 'pinia'

const store = useItemsStore()
const { isFetching, filteredItems, searchQuery, view } = storeToRefs(store)
const { pagination, totalPages, paginatedItems, changePage } = usePagination(filteredItems, 10)
const { modalVisible, selectedItem, openModal, closeModal } = useModal()

onServerPrefetch(async () => {
  await store.fetchItems()
  pagination.value.currentPage = 1 
})

const search = () => {
  store.searchItems(searchQuery.value)
  pagination.value.currentPage = 1  
}

const changeView = (newView: 'grid' | 'list') => {
  view.value = newView
  pagination.value.currentPage = 1 
}
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 45px;
  padding: 0 20px;
}
.catalog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 20px;

  &__input {
    margin-top: 20px;
    max-width: 40%;
    min-width: 280px;
    height: 35px;
    border-radius: 5px;
    padding-left: 10px;

    &::placeholder {
      color: #b6b0b0;
    }
  }

  &__btns-block {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 20px;

    button {
      width: 120px;
      height: 35px;
      border: none;
      border-radius: 5px;
      background: #007bff;
      color: #fff;
      cursor: pointer;
    }
  }
  
  .items.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .items.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
