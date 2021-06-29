import { computed, Ref } from "vue";

export const useCheckWinCondition = (
    board: Ref<(number | null)[]>,
    winConditionMet: boolean
) => {
    const checkWinCondition = computed(() => {
        // Exits if the win condition was previously met
        // I am allowing players to keep playing even if they clear the initial objective of a 2048 tile
        // Might change later to display something instead of win if the players opt to keep going
        // if (winConditionMet === true) return null;

        var highestTile = getHighestTile(board.value);

        let res = board.value.some((tile) => tile === 2048);
        let secondRes = board.value.some((tile) => tile === null);
        if (res === true && secondRes === true && winConditionMet === false) {
            winConditionMet = true;
            return { color: "#FF8DDC", msg: "You win!" };
        } else if (
            highestTile >= 2048 &&
            secondRes === true &&
            winConditionMet === true
        ) {
            var color: string = "lightblue";
            var msg: string = "You got 2048, you can stop now!";
            if (highestTile === 4096) {
                msg = "Legend!";
            } else if (highestTile === 8192) {
                msg = "You're still at it?";
            } else if (highestTile === 16384) {
                msg = "16,384? Relax!";
            }
            return { color: color, msg: msg };
        }
    });

    const getHighestTile = (array) => {
        var result = 0;
        board.value.forEach((element) => {
            if (element > result) return (result = element);
        });
        return result;
    };

    return {
        checkWinCondition,
    };
};
