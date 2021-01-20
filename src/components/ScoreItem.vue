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
    const list = computed(() => {
      const list = ('000' + Math.abs(v.value)).slice(-3).split('');
      if (v.value < 0) list[0] = '-';
      return list;
    });

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
