<template>
  <div class="score-item shadow-box-inside">
    <ul class="score-list">
      <ScoreNum v-for="num in list" :value="num"></ScoreNum>
    </ul>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue';
import ScoreNum from './ScoreNum.vue';
export default {
  name: 'ScoreItem',
  components: {
    ScoreNum
  },
  props: ['value'],
  setup (props, ctx) {
    const { value: v } = toRefs(props);
    const list = computed(() => ((v.value < 0 ? '-' : '0') + ('00' + Math.abs(v.value)).slice(-2)).split(''));

    return { list };
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
  margin: 0;
}
</style>
