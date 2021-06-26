import { ref, Ref } from "vue";

export const useBoard = () => {
    const board: Ref<(number | null)[]> = ref(Array(16).fill(null));
    var changesCounter = 0;
    const previousBoards = [];
    var score = ref(0);
    var roundScore = 0;

    const checkIfEmpty = (array) => {
        return array.every((item) => item === null);
    };

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
                    changesCounter++;
                } else {
                    if (element[x - 1] === item) {
                        element[x - 1] = item * 2;
                        roundScore += element[x - 1];
                        element[x] = null;
                        changesCounter++;
                    }
                }
            });
        });
    };

    const shiftTilesUp = (array) => {
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
                    changesCounter++;
                } else {
                    if (element[x - 1] === item) {
                        element[x - 1] = item * 2;
                        roundScore += element[x - 1];
                        element[x] = null;
                        changesCounter++;
                    }
                }
            });
        });
    };

    const shiftTilesRight = (array) => {
        array.forEach((element) => {
            // Checks if array is empty, each array is a row so an empty array wouldn't need to be iterated over
            if (checkIfEmpty(element)) return;

            element.forEach((item, x) => {
                // Returns if field is null
                if (item === null) return;
                //Checks if this is the last element in the row
                if (x === 3) return;

                //Checks if box before it is empty
                if (element[x + 1] === null) {
                    element[x + 1] = item;
                    element[x] = null;
                    changesCounter++;
                } else {
                    if (element[x + 1] === item) {
                        element[x + 1] = item * 2;
                        roundScore += element[x + 1];
                        element[x] = null;
                        changesCounter++;
                    }
                }
            });
        });
    };

    const shiftTilesDown = (array) => {
        array.forEach((element) => {
            // Checks if array is empty, each array is a row so an empty array wouldn't need to be iterated over
            if (checkIfEmpty(element)) return;

            element.forEach((item, x) => {
                // Returns if field is null
                if (item === null) return;
                //Checks if this is the last element in the row
                if (x === 3) return;

                //Checks if box before it is empty
                if (element[x + 1] === null) {
                    roundScore += element[x + 1];
                    element[x + 1] = item;
                    element[x] = null;
                    changesCounter++;
                } else {
                    if (element[x + 1] === item) {
                        element[x + 1] = item * 2;
                        roundScore += element[x + 1];
                        element[x] = null;
                        changesCounter++;
                    }
                }
            });
        });
    };

    const splitArrayIntoRows = (array) => {
        // Temp array split into 4 arrays that act as rows to make left easier to process
        const newArray = new Array(4)
            .fill("")
            .map((_, i) => array.slice(i * 4, (i + 1) * 4));

        return newArray;
    };

    const splitArrayIntoColumns = (array) => {
        var colArray = [[], [], [], []];
        array.forEach((element) => {
            element.forEach((item, i) => {
                if (i === 0) {
                    colArray[i].push(item);
                } else if (i === 0) {
                    colArray[i].push(item);
                } else if (i === 0) {
                    colArray[i].push(item);
                } else {
                    colArray[i].push(item);
                }
            });
        });
        return colArray;
    };

    const mapArray = (array) => {
        let arrayMapping = [
            {
                0: 0,
                1: 4,
                2: 8,
                3: 12,
                4: 1,
                5: 5,
                6: 9,
                7: 13,
                8: 2,
                9: 6,
                10: 10,
                11: 14,
                12: 3,
                13: 7,
                14: 11,
                15: 15,
            },
        ];
        const remappedArray = new Array(16);
        const final = [...array[0], ...array[1], ...array[2], ...array[3]];

        final.forEach((el, i) => {
            let arrayIndex = arrayMapping[0][i];
            remappedArray[arrayIndex] = el;
        });
        return remappedArray;
    };

    const renameMe = (array) => {
        return array[Math.floor(Math.random() * (array.length - 0) + 0)];
    };

    const moveBoard = (keyCode: number) => {
        // Legend
        // 0 - Left
        // 1 - Up
        // 2 - Right
        // 3 - Down

        // Resetting counter
        changesCounter = 0;

        // Resetting round score
        roundScore = 0;

        // Creates a copy of the board to be used for changes
        var boardCopy = board.value.slice();
        previousBoards.push(boardCopy);

        // Splits array
        var rowArray = splitArrayIntoRows(boardCopy);

        // Left arrow key pressed
        if (keyCode === 0) {
            // Calls the shift function multiple times, elements are shifted once per call
            for (let i = 0; i < 3; i++) {
                // Stops iterating if no changes were made
                if (i !== 0 && changesCounter === 0) return;
                shiftTilesLeft(rowArray);
            }
            // Map newArray to boardCopy
            boardCopy = [
                ...rowArray[0],
                ...rowArray[1],
                ...rowArray[2],
                ...rowArray[3],
            ];
        }

        // Up arrow key pressed
        if (keyCode === 1) {
            //Splits array into columns
            var columnArray = splitArrayIntoColumns(rowArray);
            // Calls the shift function multiple times, elements are shifted once per call
            for (let i = 0; i < 3; i++) {
                // Stops iterating if no changes were made
                if (i !== 0 && changesCounter === 0) return;
                shiftTilesUp(columnArray);
            }
            // Map newArray to boardCopy
            boardCopy = mapArray(columnArray);
        }

        // Right arrow key pressed
        if (keyCode === 2) {
            // Calls the shift function multiple times, elements are shifted once per call
            for (let i = 0; i < 3; i++) {
                // Stops iterating if no changes were made
                if (i !== 0 && changesCounter === 0) return;
                shiftTilesRight(rowArray);
            }
            // Map newArray to boardCopy
            boardCopy = [
                ...rowArray[0],
                ...rowArray[1],
                ...rowArray[2],
                ...rowArray[3],
            ];
        }

        if (keyCode === 3) {
            //Splits array into columns
            var columnArray = splitArrayIntoColumns(rowArray);
            // Calls the shift function multiple times, elements are shifted once per call
            for (let i = 0; i < 3; i++) {
                // Stops iterating if no changes were made
                if (i !== 0 && changesCounter === 0) return;
                shiftTilesDown(columnArray);
            }
            // Map newArray to boardCopy
            boardCopy = mapArray(columnArray);
        }

        // Generates new element if changes were made
        if (changesCounter !== 0) {
            var indexesArray = [];
            boardCopy.forEach((element, i) => {
                if (element !== null) return;
                indexesArray.push(i);
            });
            let newTileIndex = renameMe(indexesArray);
            boardCopy[newTileIndex] = 2;
        }
        // Updates the score
        score.value += roundScore;

        // Updates the board
        board.value = boardCopy;
    };

    const undoMove = () => {
        // Checks if there was a previous move in the array
        if (previousBoards.length === 0) return;

        // Resets the board status to the last state stored in the array
        board.value = previousBoards.pop();
    };

    const initialTiles = () => {
        // Returns a JSON object with 2 values between 0 and 15 which will
        // be used as the indexes for the first two tiles
        let firstTileLocation = Math.floor(Math.random() * (0 - 16) + 16);
        let secondTileLocation = Math.floor(Math.random() * (0 - 16) + 16);

        // Loop that will keep running until the second number is different from
        // the first number
        while (secondTileLocation === firstTileLocation) {
            secondTileLocation = Math.floor(Math.random() * (0 - 16) + 16);
        }

        // Returning the 2 numbers in a JSON object
        return { first: firstTileLocation, second: secondTileLocation };
    };

    return {
        board,
        moveBoard,
        initialTiles,
        undoMove,
        score,
    };
};
