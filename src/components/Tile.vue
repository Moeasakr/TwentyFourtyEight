<template>
  <div class="tile" :name="label" :v-model="colorPicker" :style="{'background-color':assignedColor}"> 
      <p class="value"> {{ value }} </p>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: {
            type: Number,
            default: ' ',
        },
        winner: null,
    },
    data() {
        return {
            colorScheme: {
                2: "#915233", 
                4: "#874829", 
                8: "#7B3D1F", 
                16: "#70381C", 
                32: "#682E11", 
                64: "#62290D", 
                128: "#64280A", 
                256: "#582106", 
                512: "#5C2104", 
                1024: "#562006", 
                2048: "#512008"}
        }
    },
    computed: {
        colorPicker(){
            this.assignedColor = this.colorScheme[this.value];
        }
    },
}
</script>

<style scoped>
    .tile {
        width: 100px;
        height: 100px;
        background: #BF6336;
        margin: auto;
        display: flex;
        border-radius: 25px;
    }
    .value {
        margin: auto;
        color: white;
        font-weight: 900;
        font-size: 1.5em;
    }
</style>