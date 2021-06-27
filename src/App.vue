<template>
  <header>
    <h1>2048</h1>
  </header>
  <div class="container">
    <Board v-bind:key="test" :option="boardStatus" />
    <div class="optionsContainer">
      <span>Options:</span>
      <input class="optionButton resetButton" type="submit" value="Reset Board" @click="resetBoard(0)">
      <input class="optionButton winButton" type="submit" value="Win con" @click="genWinCon">
      <input class="optionButton lossButton" type="submit" value="Loss con" @click="genLossCon">
    </div>
  </div>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }, 
  data() {
    return {
      boardStatus : 0,
      test: "something",
    }
  },
  methods: {
    genWinCon() {
      // this.boardStatus = 1;
      this.resetBoard(1);
    },
    genLossCon() {
      // this.boardStatus = 2;
      this.resetBoard(2);
    },
    resetBoard(status) {
      if (status === 0) {
        this.boardStatus = 0;
      } else if (status === 1) {
        this.boardStatus = 1;
      } else if (status === 2) {
        this.boardStatus = 2;
      }
      this.test += 1;
    }
  }
}
</script>

<style scoped>
  header {
    flex: 1 0 100%;
    background: #228280;
    margin-bottom: 7px;
    font-size: 1.2em;
  }
  h1 {
    margin: .5em 0;
  }
  /* .container {

  } */
  footer {
    margin-top: 20px;
    flex: 1 0 100%;
    font-size: 1.5em;
  }
  .optionButton {
    background-color: lightblue;
    font-size: 1.2em;
    margin-top: 10px;
    margin-left: 10px;
    padding: 6px;
    border-radius: 10px;
    background: #23B4AD;
  }
</style>