<template>
  <div
    class="min-h-screen bg-gradient-to-br from-[#0b0f1a] to-[#05070d] text-gray-200 flex"
  >

    <!-- LEFT PANEL -->
    <aside
      class="w-72 border-r border-white/10 p-4 flex flex-col justify-between"
    >
      <div>

        <h2 class="text-xs tracking-widest text-gray-400 mb-3">
          CURRENT MATCH
        </h2>

        <div class="space-y-2">
          <PlayerCard
            :name="props.gameMode==='PVP' ? 'Player 1' : 'Player 1 (You)'"
            :status="currentPlayer==='PLAYER' ? 'CURRENT TURN' : 'WAITING'"
            :active="currentPlayer==='PLAYER'"
          />
          <PlayerCard
            :name="props.gameMode==='PVP' ? 'Player 2' : 'The Master (AI)'"
            :status="currentPlayer==='AI' ? 'CURRENT TURN' : 'WAITING'"
            :active="currentPlayer==='AI'"
          />
        </div>

      </div>

    </aside>



    <!-- CENTER -->
    <main class="flex-1 flex flex-col items-center justify-center relative">

      <h1 class="text-2xl font-semibold mb-1">
        Pile Selection
      </h1>

      <p class="text-gray-400 text-sm mb-10">
        Choose any number of stones (from left to right) from a single pile to remove.
      </p>



      <!-- PILES -->
      <TransitionGroup
      name="pile"
      tag="div"
      class="flex flex-wrap justify-center gap-8 max-w-6xl"
      >

      <Pile
        v-for="(pile, i) in heaps"
        :key="i"
        :label="'Pile ' + String.fromCharCode(65+i)"
        :count="pile"
        :index="i"
        :selected="selectedMove?.heapIndex===i
                    ? selectedMove.removeCount
                    : 0"
        @remove="playerMove"
      />

      </TransitionGroup>



      <!-- BUTTONS -->
      <div class="mt-12 flex gap-4">

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

          {{props.gameMode==="PVE" ? ( winner==="PLAYER"  ? "You Win!" : "AI Wins!") : 
            ( winner==="PLAYER" ? "Player 1 Wins!" : "Player 2 Wins!")
          }}

          </h2>


          <p class="text-gray-400 text-sm">
            Game finished
          </p>


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
import Pile from "@/components/Pile.vue";

import { playerEndTurnNormal, aiMoveTurnNormal } from "@/store/startGame.js";
import { watch } from "vue";



/* GAME STATE */

const props = defineProps({
  gameSize: {
    type: String,
    default: () => "SMALL"
  },
  gameMode: {
    type: String,
    default: () => "PVE"
  }
});

const heaps = ref(
  createHeaps(props.gameSize)
);

watch(
  () => props.gameSize,
  (newSize)=>{
    heaps.value = createHeaps(newSize);
    selectedMove.value = null;
    currentPlayer.value = "PLAYER";
    winner.value = null;
  }
);

const selectedMove = ref(null);

const currentPlayer = ref("PLAYER");

const winner = ref(null);

function createHeaps(mode){

  if(mode==="SMALL")
    return Array(3).fill(10);

  if(mode==="MEDIUM")
    return Array(5).fill(10);

  if(mode==="LARGE")
    return Array(10).fill(10);

}

/****************** GAME LOGIC ******************/

function playerMove({heapIndex, removeCount}){

  if(winner.value) return;

  if(props.gameMode==="PVE"
  && currentPlayer.value!=="PLAYER")
    return;

  selectedMove.value={
    heapIndex,
    removeCount
  };

}

function endTurn(){

  if(winner.value) return;

  const result =
  playerEndTurnNormal(
    heaps.value,
    selectedMove.value,
    currentPlayer.value
  );


  if(!result) return;


  heaps.value = result.heaps;

  winner.value = result.winner;

  currentPlayer.value = result.currentPlayer;

  selectedMove.value = null;


  if(props.gameMode==="PVE"
  && currentPlayer.value==="AI"){

  setTimeout(()=>{

    const aiResult =
    aiMoveTurnNormal(
      heaps.value
    );

    if(!aiResult)
      return;

    heaps.value = aiResult.heaps;

    winner.value = aiResult.winner;

    currentPlayer.value = aiResult.currentPlayer;

  }, 1500);

  }

}

function resetGame(){

  // heaps.value=[...props.initialHeaps];
  heaps.value=createHeaps(props.gameSize);

  selectedMove.value=null;

  currentPlayer.value="PLAYER";

  winner.value=null;

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