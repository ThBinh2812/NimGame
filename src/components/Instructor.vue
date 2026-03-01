<template>

  <div
    class="
    border border-white/10
    rounded-xl
    p-4
    bg-white/[0.02]
    backdrop-blur-sm
    space-y-3
    "
  >

    <h3 class="text-xs tracking-widest text-gray-400">
      HOW TO PLAY
    </h3>


    <!-- NORMAL NIM -->

    <ul
      v-if="gameRules === 'NORMAL'"
      class="text-sm text-gray-300 space-y-2 leading-relaxed"
    >

      <li>• Choose <span class="text-blue-400">one pile</span></li>

      <li>• Remove any number of stones</li>

      <li>• Click <span class="text-blue-400">End Turn</span></li>

      <li>
        Player taking the last stone
        <span class="text-blue-400">
          wins
        </span>
      </li>

    </ul>


    <!-- MISERE NIM -->

    <ul
      v-else
      class="text-sm text-gray-300 space-y-2 leading-relaxed"
    >

      <li>• Choose <span class="text-blue-400">one pile</span></li>

      <li>• Remove any number of stones</li>

      <li>• Click <span class="text-blue-400">End Turn</span></li>

      <li>
        Player taking the last stone
        <span class="text-red-400">
          loses
        </span>
      </li>

    </ul>



    <!-- RULE LABEL -->

    <div class="border-t border-white/10 pt-3 text-xs text-gray-500">

      Rule:

      <span
        v-if="gameRules === 'NORMAL'"
        class="text-blue-400"
      >
        Normal Nim
      </span>

      <span
        v-else
        class="text-red-400"
      >
        Misère Nim
      </span>

    </div>

  </div>

</template>


<script setup>

const props = defineProps({
  gameRules:String
})

const gameRules = props.gameRules

</script>