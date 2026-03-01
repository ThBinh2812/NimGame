<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#0b0f1a] to-[#05070d] text-gray-200 flex items-center justify-center"
  >
    <div
      class="w-[520px] bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl space-y-8"
    >
      <!-- TITLE -->

      <div class="text-center space-y-2">
        <h1 class="text-3xl font-semibold tracking-wide">NIM GAME</h1>

        <p class="text-gray-400 text-sm">Created by Thai Binh</p>
      </div>

      <!-- MODE SELECT -->

      <div class="space-y-3">
        <h2 class="text-xs tracking-widest text-gray-400">GAME MODE</h2>

        <div class="grid grid-cols-2 gap-4">
          <button @click="mode = 'PVP'" :class="modeButton('PVP')">
            Player vs Player
          </button>

          <button @click="mode = 'PVE'" :class="modeButton('PVE')">
            Player vs AI
          </button>
        </div>
      </div>

      <!-- RULE SELECT -->

      <div class="space-y-3">
        <h2 class="text-xs tracking-widest text-gray-400">GAME RULE</h2>

        <div class="grid grid-cols-2 gap-4">
          <button @click="rule = 'NORMAL'" :class="ruleButton('NORMAL')">
            Normal
          </button>

          <button @click="rule = 'MISERE'" :class="ruleButton('MISERE')">
            Misère
          </button>
        </div>
      </div>

      <!-- AI SELECT -->

      <div v-if="mode === 'PVE'" class="space-y-3">
        <h2 class="text-xs tracking-widest text-gray-400">AI DIFFICULTY</h2>

        <div class="grid grid-cols-2 gap-4">
          <button @click="ai = 'EASY'" :class="aiButton('EASY')">Easy</button>

          <button @click="ai = 'HARD'" :class="aiButton('HARD')">Hard</button>
        </div>
      </div>

      <!-- SIZE SELECT -->

      <div class="space-y-3">
        <h2 class="text-xs tracking-widest text-gray-400">GAME SIZE</h2>

        <div class="grid grid-cols-3 gap-4">
          <button @click="size = 'SMALL'" :class="sizeButton('SMALL')">
            Small
          </button>

          <button @click="size = 'MEDIUM'" :class="sizeButton('MEDIUM')">
            Medium
          </button>

          <button @click="size = 'LARGE'" :class="sizeButton('LARGE')">
            Large
          </button>
        </div>
      </div>

      <!-- START -->

      <div class="pt-4">
        <button
          @click="startGame"
          class="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/40 text-lg font-medium transition hover:shadow-blue-400/80 hover:shadow-xl"
        >
          ▶ Start Game
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["startGame"]);

const mode = ref("PVP");
const rule = ref("NORMAL");
const ai = ref("HARD");
const size = ref("MEDIUM");

function startGame() {
  emit("startGame", {
    mode: mode.value,
    rule: rule.value,
    ai: ai.value,
    size: size.value,
  });
}

function modeButton(value) {
  return mode.value === value
    ? "py-3 rounded-lg bg-blue-600 border border-blue-400 shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/80"
    : "py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition hover:shadow-lg hover:shadow-blue-500/20";
}

function sizeButton(value) {
  return size.value === value
    ? "py-3 rounded-lg bg-blue-600 border border-blue-400 shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/80"
    : "py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition hover:shadow-lg hover:shadow-blue-500/20";
}

function ruleButton(value) {
  return rule.value === value
    ? "py-3 rounded-lg bg-blue-600 border border-blue-400 shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/80"
    : "py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition hover:shadow-lg hover:shadow-blue-500/20";
}

function aiButton(value) {
  return ai.value === value
    ? "py-3 rounded-lg bg-blue-600 border border-blue-400 shadow-lg shadow-blue-500/40 transition hover:shadow-blue-400/80"
    : "py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition hover:shadow-lg hover:shadow-blue-500/20";
}
</script>
