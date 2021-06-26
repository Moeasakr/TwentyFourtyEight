<template>
  <div class="tile" :name="label" :disabled="winner || value"> 
      <p class="value"> {{ value }} </p>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: {
            type: String,
            default: ' ',
        },
        winner: null,
    },
}
</script>

<style scoped>
    .tile {
        width: 100px;
        height: 100px;
        background: #6dcce1;
        margin: auto;
        display: flex;
    }
    .value {
        margin: auto;
        color: darkblue;
    }
</style>