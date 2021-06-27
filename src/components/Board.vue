<template>
  <div v-if="checkWinCondition" :style="{'background-color':checkWinCondition.color}">
    <h2>{{checkWinCondition.msg}}</h2>
  </div>
  <div class="scoreboard">
    <p class="scoreLabel">Score:</p>
    <p class="score">{{ score }}</p>
  </div>
  <div class="board">
    <Tile v-for="(tile, i) in board" :key='`tile-${i}`' :label="`square-${i}`" :value="tile" />
  </div>
</template>

<script>
import Tile from "./Tile.vue"
import { ref } from 'vue';
import { useBoard } from '../composables/useBoard';
import { useCheckWinCondition } from '../composables/userCheckWinCondition';

export default {
  name: 'Board',
  props:['option'],
  components: {
    Tile,
  },
  data() {
    return {
      test: "red",
      overlay: false,
    }
  },
  setup(props) {
    const {board, moveBoard, initialTiles, undoMove, score} = useBoard();
    var winConditionMet = false;
    const { checkWinCondition } = useCheckWinCondition(board, winConditionMet);
    
    let boardCopy = board.value.slice();
    let initialTilesLocation = initialTiles();

    // 0 = Normal playthrough
    // 1 = Close to a win condition
    // 2 = Close to a loss condition
    if (props['option'] === 0) {
      // For initial tiles -- Find a better way to do this
      boardCopy[initialTilesLocation.first] = 2;
      boardCopy[initialTilesLocation.second] = 2;
    } else if (props['option'] === 1) {
      boardCopy[initialTilesLocation.first] = 1024;
      boardCopy[initialTilesLocation.second] = 1024;
    } else if (props['option'] === 2) {
      let counter = 2;
      boardCopy.forEach((_,i) => {
        if (i === 15) return;
        boardCopy[i] = 2 * counter;
        counter*=2;
      })
    }
    
    
    board.value = boardCopy;

    return {
      board,
      moveBoard,
      undoMove,
      score,
      checkWinCondition,
    };
  },
  methods:{
    keyDown(e) {
      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          this.moveBoard(0);
          break;
        case 38:
          e.preventDefault();
          this.moveBoard(1);
          break;
        case 39:
          e.preventDefault();
          this.moveBoard(2);
          break;
        case 40:
          e.preventDefault();
          this.moveBoard(3);
          break;
        case 90:
          this.undoMove();
          break;
        default:
          break;
      }
    },
  },
  created() {
    return ref(Array(16).fill(null));
  },
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown);
  }
}
</script>

<style scoped>
  .board {
    width: 450px;
    height: 450px;
    background: #523A28;
    display: flex;
    flex-flow: wrap;
    border: solid black;
    justify-content: space-around;
    padding: 20px;
    border-radius: 25px;
  }
  .scoreboard {
    width: 80px;
    border: 1px solid black;
    padding: 8px;
    border-radius: 12px;
    margin-bottom: 5px;
    /* background: #D79666; */
    background: #523A28;
  }
  .score {
    margin: 0;
    margin-top: 0;
    font-size: 1.2em;
    color: white;
  }
  .scoreLabel {
    margin: 0;
    margin-bottom: 3px;
    color: white;
  }
</style>