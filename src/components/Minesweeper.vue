<template>
  <div class="panel">
    <!-- 计分板 -->
    <div class="score">
      <ScoreItem :value="leftBombs"></ScoreItem>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ScoreItem from './ScoreItem.vue';
export default {
  name: 'Minesweeper',
  components: {
    ScoreItem
  },
  setup (props, ctx) {
    const leftBombs = ref(10);

    return {
      leftBombs
    }
  }
}
</script>
