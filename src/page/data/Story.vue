<script setup>
import {ref} from "vue";

const props = defineProps(["story"]);
const story = ref(props.story);
</script>

<template>
{{story}}
</template>

<style scoped>

</style>