<template>
  <label
    class="rounded text-white font-bold py-2 px-4 cursor-pointer"
    :class="{
      'bg-green-500': modelValue.completed,
      'bg-gray-500': !modelValue.completed,
    }"
  >
    <input type="checkbox" :value="modelValue.completed" @input="() => $emit('update:modelValue', modelValue)" class="hidden" />
    {{ modelValue.completed ? 'Completed!' : 'Mark as complete' }}
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
::selection {
  display: none;
}
</style>
