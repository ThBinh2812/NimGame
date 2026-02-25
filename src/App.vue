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
  
  
  function launchGame(data){
  
    gameMode.value=data.mode;
    gameSize.value=data.size;
  
    screen.value="GAME";
  
  }
  
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
</style> 