<template>
  <div
    class="h-screen overflow-hidden bg-gradient-to-br from-[#0b0f1a] to-[#05070d] text-gray-200 flex"
  >
    <!-- LEFT PANEL -->
    <aside
      class="w-72 border-r border-white/10 p-4 flex flex-col gap-6"
    >
      <div>
        <h2 class="text-xs tracking-widest text-gray-400 mb-3">
          CURRENT MATCH
        </h2>

        <div class="space-y-2">
          <PlayerCard
            :name="props.gameMode === 'PVP' ? 'Player 1' : 'Player 1 (You)'"
            :status="currentPlayer === 1 ? 'CURRENT TURN' : 'WAITING'"
            :active="currentPlayer === 1"
          />

          <PlayerCard
            :name="props.gameMode === 'PVP' ? 'Player 2' : 'The Master (AI)'"
            :status="currentPlayer === 2 ? 'CURRENT TURN' : 'WAITING'"
            :active="currentPlayer === 2"
          />
        </div>
        <div class="mt-2">
          <Instructor :gameRules="gameRules" />
        </div>
      </div>
    </aside>

    <!-- CENTER -->
    <main class="flex-1 flex flex-col overflow-hidden relative">
      <!-- HEADER -->
      <div class="text-center pt-6">
        <h1 class="text-2xl font-semibold">Pile Selection</h1>

        <p class="text-gray-400 text-sm mt-2">
          Choose any number of stones (from left to right) from a single pile.
        </p>
      </div>

      <!-- PILES AREA -->
      <div class="flex-1 flex items-center justify-center overflow-hidden px-6">
        <TransitionGroup
          name="pile"
          tag="div"
          class="flex flex-wrap justify-center gap-5 max-w-full"
        >
          <Pile
            v-for="(pile, i) in heaps"
            :key="i"
            :label="'Pile ' + String.fromCharCode(65 + i)"
            :count="pile"
            :index="i"
            :selected="
              selectedMove?.heapIndex === i ? selectedMove.removeCount : 0
            "
            @remove="playerMove"
          />
        </TransitionGroup>
      </div>

      <!-- BUTTONS (ALWAYS VISIBLE) -->
      <div class="pb-6 flex gap-4 justify-center">
        <button
          @click="endTurn"
          class="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          ▶ End Turn
        </button>

        <button
          @click="resetGame"
          class="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
        >
          Reset
        </button>
      </div>
    </main>

    <!-- WINNER POPUP -->

    <div
      v-if="winner"
      class="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div
        class="bg-[#111827] p-8 rounded-xl border border-white/10 text-center space-y-5 w-80 shadow-2xl"
      >
        <h2 class="text-2xl font-semibold">
          {{
            props.gameMode === "PVE"
              ? winner === 1
                ? "You Win!"
                : "AI Wins!"
              : winner === 1
                ? "Player 1 Wins!"
                : "Player 2 Wins!"
          }}
        </h2>

        <p class="text-gray-400 text-sm">Game finished</p>

        <div class="flex gap-3 justify-center">
          <button
            @click="resetGame"
            class="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Play Again
          </button>

          <button
            @click="$emit('goMenu')"
            class="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PlayerCard from "@/components/PlayerCard.vue";
import Instructor from "@/components/Instructor.vue";
import Pile from "@/components/Pile.vue";
import {
  playerEndTurnNormal,
  aiMoveTurnNormalEasy,
  aiMoveTurnNormalHard,
  playerEndTurnMisere,
  aiMoveTurnMisereEasy,
  aiMoveTurnMisereHard,
} from "@/store/startGame.js";
import { watch } from "vue";

/* GAME STATE */

const props = defineProps({
  gameSize: {
    type: String,
  },
  gameMode: {
    type: String,
  },
  gameRules: {
    type: String,
  },
  gameAI: {
    type: String,
  },
});

const heaps = ref(createHeaps(props.gameSize));

const gameMode = props.gameMode;
const gameRules = props.gameRules;
const gameAI = props.gameAI;

watch(
  () => props.gameSize,
  (newSize) => {
    heaps.value = createHeaps(newSize);
    selectedMove.value = null;
    currentPlayer.value = 1;
    winner.value = null;
  },
);

const selectedMove = ref(null);

/*
Player 1 = 1
Player 2 = AI = 2
*/

const currentPlayer = ref(1);

const winner = ref(null);

function createHeaps(size) {
  if (size === "SMALL") return Array(3).fill(10);

  if (size === "MEDIUM") return Array(5).fill(10);

  if (size === "LARGE") return Array(10).fill(10);
}

/****************** GAME LOGIC ******************/

function playerMove({ heapIndex, removeCount }) {
  if (winner.value) return;

  if (gameMode === "PVE" && currentPlayer.value !== 1) return;

  selectedMove.value = {
    heapIndex,
    removeCount,
  };
}

/* Main Logic */
function endTurn() {

  if (winner.value) return;

  let result = null;

  // NORMAL
  if (gameRules === "NORMAL") {

    result = playerEndTurnNormal(
      heaps.value,
      selectedMove.value,
      currentPlayer.value
    );

  }

  // MISERE
  if (gameRules === "MISERE") {

    result = playerEndTurnMisere(
      heaps.value,
      selectedMove.value,
      currentPlayer.value
    );

  }

  if (!result) return;

  heaps.value = result.heaps;

  winner.value = result.winner;

  currentPlayer.value = result.currentPlayer;

  selectedMove.value = null;



  // AI TURN
  if (gameMode === "PVE" && currentPlayer.value === 2) {

    setTimeout(() => {

      let aiResult = null;

      // NORMAL
      if (gameRules === "NORMAL") {

        if (gameAI === "EASY")
          aiResult = aiMoveTurnNormalEasy(heaps.value);

        if (gameAI === "HARD")
          aiResult = aiMoveTurnNormalHard(heaps.value);

      }

      // MISERE
      if (gameRules === "MISERE") {

        if (gameAI === "EASY")
          aiResult = aiMoveTurnMisereEasy(heaps.value);

        if (gameAI === "HARD")
          aiResult = aiMoveTurnMisereHard(heaps.value);

      }


      if (!aiResult) return;

      heaps.value = aiResult.heaps;

      winner.value = aiResult.winner;

      currentPlayer.value = aiResult.currentPlayer;

    }, 1000);

  }
}

function resetGame() {
  heaps.value = createHeaps(props.gameSize);

  selectedMove.value = null;

  currentPlayer.value = 1;

  winner.value = null;
}
</script>

<style scoped>
.pile-enter-active,
.pile-leave-active {
  transition: all 0.35s ease;
}

.pile-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.pile-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}
</style>
