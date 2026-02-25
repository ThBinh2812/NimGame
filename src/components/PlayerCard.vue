<template>
  <div
    class="p-3 rounded-lg border flex justify-between items-center"
    :class="active ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'"
  >
    <div>
      <p class="font-medium">{{ name }}</p>
      <span
        class="text-xs"
        :class="active ? 'text-blue-400' : 'text-gray-400'"
      >
        {{ status }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  status: String,
  active: Boolean,
});
</script>
