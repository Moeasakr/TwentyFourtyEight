<template>
  <div class="board">
    <Tile v-for="(tile, i) in board" :key='`tile-${i}`' :label="`square-${i}`" :value="tile" @click="createBoard(i)" />
  </div>
</template>

<script>
import Tile from "./Tile.vue"
import { ref } from "vue"

export default {
  name: 'Board',
  components: {
    Tile,
  },
  setup() {
    let board = ref(Array(16).fill(null));
    const tileValue = ref('X');
    
    // For initial values -- Find a better way to do this -- Preferrably random generation
    let boardCopy = board.value.slice();
    boardCopy[5] = 2;
    boardCopy[6] = 2;
    boardCopy[4] = 8;
    board.value = boardCopy;

    const createBoard = (i) => {
      const boardCopy = board.value.slice();
      boardCopy[i] = tileValue.value;
      board.value = boardCopy;
    };

    const moveBoard = (i) => {
      // Legend
      // 0 - Left
      // 1 - Up
      // 2 - Right
      // 3 - Down
      const boardCopy = board.value.slice();
      // const newCopy = board.value.slice();
      boardCopy.forEach((tile, x) => {
        if (x === 5) {
          if (tile === null) return;
          if (tile === boardCopy[4]) {
            boardCopy[4] = tile * 2;
            boardCopy[5] = null;
          }
          if (tile === boardCopy[6]) {
            boardCopy[6] = null;
            if (boardCopy[4] === null) {
              boardCopy[4] = tile * 2;
              boardCopy[5] = null;
            } else {
              boardCopy[5] = tile * 2;
            }
          }
          // console.log(boardCopy[6]);
          // console.log(tile);
        }
        // if (x === 0 || x === 4 || x === 8 || x === 12) {
        //   return;
        // } else {
        //   // if (x === )
        //   console.log(x);
        // }
      });


      
      


      // boardCopy[i] = tileValue.value;
      board.value = boardCopy;
      // console.log(boardCopy);

      // if (i === 0) return console.log('Left');
      if (i === 1) return console.log('Up');
      if (i === 2) return console.log('Right');
      if (i === 3) return console.log('Down');

    }
    

    return {
      board,
      tileValue,
      createBoard,
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
    renameMe(max) {
      return Math.floor(Math.random() * (max - 0) + 0);
    }
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