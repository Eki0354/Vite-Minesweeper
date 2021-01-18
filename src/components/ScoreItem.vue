<template>
  <div class="score-item">
    <ul class="score-list">
      <ScoreNum v-for="num in list" :value="num"></ScoreNum>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue';
import ScoreNum from './ScoreNum.vue';
export default {
  name: 'ScoreItem',
  components: {
    ScoreNum
  },
  setup (props, ctx) {
    const list = computed(() => ('000' + ctx.attrs.value).slice(-3).split(''));

    return {
      list
    }
  }
}
</script>

<style scoped>
.score-list {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 80px;
  background-color: #000;
  padding: 8px;
}
</style>
