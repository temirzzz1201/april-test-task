<template>
  <div v-if="item" class="item-card" @click="showDetails">
    <h3 class="item-card__title">{{ item.title }}</h3>
    <p>{{ item.body }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: Object as PropType<{ title: string; body: string }>
})

const emit = defineEmits(['click'])

const showDetails = () => {
  emit('click', props.item)
}
</script>

<style scoped lang="scss">
.item-card {
  padding: 1rem;
  border: 1px solid #ccc;
  cursor: pointer;

  &__title {
    margin-bottom: 20px;
  }
}
</style>
