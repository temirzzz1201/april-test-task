<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-content__title">{{ item?.title }}</h2>
      <p class="modal-content__item">{{ item?.body }}</p>
      <button class="modal-content__btn modal-content__btn_color" @click="close">Закрыть</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: Object as PropType<{ title: string; body: string } | null>,
  visible: Boolean
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__title {
    margin-bottom: 20px;
  }

  &__item {
    margin-bottom: 25px;
  }

  &__btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &_color {
      background: #007bff;
      color: #fff;
    }
  }
}


</style>
