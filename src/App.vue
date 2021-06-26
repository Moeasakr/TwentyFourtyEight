<template>
  <header>
    <h1>2048</h1>
  </header>
  <div class="container">
    <Board />
  </div>
  <footer>
    Generic footer content
  </footer>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style scoped>
  header {
    flex: 1 0 100%;
    background: #228280;
    margin-bottom: 25px;
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
    /* background-color: green; */
  }
</style>