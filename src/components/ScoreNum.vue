<template>
  <div class="score-num">
    <template v-for="(item, i) in list">
      <div :class="`score-num-leg leg-${i}`" v-if="item"></div>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'ScoreNum',
  setup (props, { attrs: { value } }) {
    const reflectKeys = [63, 6, 91, 79, 102, 109, 125, 7, 127, 111];
    let v = reflectKeys[value];
    const list = computed(() => Array(7).fill(2).map((n, i) => v >= n ** (6 - i) && (!!(v -= n ** (6 - i)) || true)).reverse());

    return {
      list
    }
  }
}
</script>

<style scoped>
.score-num {
  position: relative;
  width: 20px;
  height: 40px;
}
.score-num-leg {
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: #f00;
  clip-path: polygon(10% 0%, 90% 0%, 65% 100%, 35% 100%);
}

/* 上 */
.leg-0 {
  top: 0;
  left: 0;
}

/* 右上 */
.leg-1 {
  top: 0;
  right: -20px;
  transform-origin: 0% 0%;
  transform: rotateZ(90deg);
}

/* 右下 */
.leg-2 {
  top: 20px;
  right: -20px;
  transform-origin: 0% 0%;
  transform: rotateZ(90deg);
}

/* 下 */
.leg-3 {
  top: 35px;
  transform: rotateZ(180deg);
}

/* 左下 */
.leg-4 {
  top: 40px;
  transform-origin: 0% 0%;
  transform: rotateZ(270deg);
}

/* 左上 */
.leg-5 {
  top: 20px;
  transform-origin: 0% 0%;
  transform: rotateZ(270deg);
}

/* 中 */
.leg-6 {
  top: 18px;
  clip-path: polygon(25% 0%, 75% 0%, 90% 50%, 75% 100%, 25% 100%, 10% 50%);
}
</style>