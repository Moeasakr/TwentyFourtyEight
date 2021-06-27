import { computed, Ref } from "vue";

export const useCheckWinCondition = (
    board: Ref<(number | null)[]>,
    winConditionMet: boolean
) => {
    const checkWinCondition = computed(() => {
        // Exits if the win condition was previously met
        // I am allowing players to keep playing even if they clear the initial objective of a 2048 tile
        // Might change later to display something instead of win if the players opt to keep going
        if (winConditionMet === true) return null;
        let res = board.value.some((tile) => tile === 2048);
        let secondRes = board.value.some((tile) => tile === null);
        let thirdRes = board.value.some((tile) => tile > 2048);
        if (res === true && secondRes === true && thirdRes === false) {
            winConditionMet = true;
            return { color: "red", msg: "You win!" };
        }
    });

    return {
        checkWinCondition,
    };
};
