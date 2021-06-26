<template>
  <div class="board">
    <Tile v-for="(tile, i) in board" :key='`tile-${i}`' :label="`square-${i}`" :value="tile" />
  </div>
</template>

<script>
import Tile from "./Tile.vue"
import { ref } from "vue"
import { useBoard } from '../composables/useBoard';

export default {
  name: 'Board',
  components: {
    Tile,
  },
  setup() {
    const {board, moveBoard, initialTiles} = useBoard();
    
    // For initial tiles -- Find a better way to do this
    let boardCopy = board.value.slice();
    let initialTilesLocation = initialTiles();
    boardCopy[initialTilesLocation.first] = 2;
    boardCopy[initialTilesLocation.second] = 2;
    board.value = boardCopy;


    return {
      board,
      moveBoard
    };
  },
  methods:{
    keyDown(e) {
      switch (e.keyCode) {
        case 37:
          this.moveBoard(0);
          break;
        case 38:
          this.moveBoard(1);
          break;
        case 39:
          this.moveBoard(2);
          break;
        case 40:
          this.moveBoard(3);
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
    window.addEventListener('keyup', this.keyDown);
  }
}
</script>

<style scoped>
  .board {
    width: 450px;
    height: 450px;
    background: gray;
    display: flex;
    flex-flow: wrap;
    border: solid black;
    justify-content: space-around;
    padding: 20px;
  }
</style>