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

    const renameMe = (array) => {
      return array[Math.floor(Math.random() * (array.length - 0) + 0)]
    }

    const checkIfEmpty = (array) => {
      return array.every((item) => item === null);
    }

    const shiftTilesLeft = (array) => {
      array.forEach((element) => {
        // Checks if array is empty, each array is a row so an empty array wouldn't need to be iterated over
        if (checkIfEmpty(element)) return;

        element.forEach((item, x) => {
            // Returns if field is null
            if (item === null) return;
            //Checks if this is the first element in the row
            if (x === 0) return;

            //Checks if box before it is empty
            if (element[x - 1] === null) {
                element[x - 1] = item;
                element[x] = null;
            } else {
                if (element[x - 1] === item) {
                    element[x - 1] = item * 2;
                    element[x] = null;
                }
            }
        });
    });
    }

    const moveBoard = (keyCode) => {
      // Legend
      // 0 - Left
      // 1 - Up
      // 2 - Right
      // 3 - Down
      var boardCopy = board.value.slice();
      if (keyCode === 0) {
        // Temp array split into 4 arrays that act as rows to make left easier to process
        const newArray = new Array(4).fill("").map((_, i) => boardCopy.slice(i * 4, (i + 1) * 4));
        // Calls the shift function multiple times, elements are shifted once per call
        for (let i = 0; i <= 3; i++) {
          shiftTilesLeft(newArray);
        }
        // Map newArray to boardCopy
        boardCopy = [...newArray[0], ...newArray[1], ...newArray[2], ...newArray[3]];
        var indexesArray = [];
        boardCopy.forEach((element, i)=>{
          if (element !== null) return;
          indexesArray.push(i)
        });

        let newTileIndex = renameMe(indexesArray);
        boardCopy[newTileIndex] = 2;
      }

      
      


      board.value = boardCopy;

      if (keyCode === 1) return console.log('Up');
      if (keyCode === 2) return console.log('Right');
      if (keyCode === 3) return console.log('Down');

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