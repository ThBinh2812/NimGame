<template>

  <div class="flex flex-col items-center gap-2">
  
    <!-- STONES -->
  
    <div class="grid grid-cols-10 gap-3 justify-center">
  
      <div
        v-for="i in count"
        :key="i"
  
        @click="selectStone(i)"
  
        class="w-10 h-10 rounded-full border transition cursor-pointer"
  
        :class="i <= selected
          ? 'border-blue-400 bg-blue-500/30 shadow-md shadow-blue-500/30'
          : 'border-white/20 bg-white/5 hover:bg-blue-500/20'"
      ></div>
  
    </div>
  
  
    <!-- LABEL -->
  
    <span class="text-xs text-gray-400">
      {{ label }} ({{ count }})
    </span>
  
  </div>
  
  </template>
  
  
  
  <script setup>
  
  const props = defineProps({
   count:Number,
   index:Number,
   label:String,
   selected:Number
  });
  
  const emit = defineEmits(["remove"]);
  
  
  function selectStone(removeCount){
  
   emit("remove",{
    heapIndex:props.index,
    removeCount
   });
  
  }
  
  </script>