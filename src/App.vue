<!-- <template>
  <NimGame />
</template>

<script setup>
  import NimGame from "./views/NimGame.vue";
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
</style> -->

<template>

  <Menu
  v-if="screen==='MENU'"
  @startGame="launchGame"
  />
  
  <Game
  v-if="screen==='GAME'"
  :gameMode="gameMode"
  :gameSize="gameSize"
  :gameRules="gameRules"
  :gameAI="gameAI"
  @goMenu="screen='MENU'"
  />
  
</template>
  
  
  
<script setup>
  
  import { ref } from "vue";
  
  import Menu from "@/views/Menu.vue";
  import Game from "@/views/NimGame.vue";
  
  
  const screen = ref("MENU");
  
  const gameMode = ref("PVP");
  const gameSize = ref("MEDIUM");
  const gameRules = ref("NORMAL");
  const gameAI = ref("EASY");
  
  function launchGame(data){
  
    gameSize.value=data.size;
    gameMode.value=data.mode;
    gameRules.value=data.rule;
    gameAI.value=data.ai;
  
    screen.value="GAME";
  
  }
  
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
</style> 