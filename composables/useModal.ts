import { ref } from 'vue'
import type { IItem } from '~/types'

export const useModal = () => {
  const modalVisible = ref<boolean>(false)
  const selectedItem = ref<IItem | null>(null)

  function openModal(item: IItem) {
    selectedItem.value = item
    modalVisible.value = true
  }

  function closeModal() {
    modalVisible.value = false
  }

  return {
    modalVisible,
    selectedItem,
    openModal,
    closeModal
  }
}
