<template>
  <div class="score-num">
    <template v-for="(item, i) in list">
      <div :class="`score-num-piece piece-${i}${item ? '' : ' piece-shadow'}`"></div>
    </template>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue';
export default {
  name: 'ScoreNum',
  props: ['value'],
  setup (props, ctx) {
    const { value } = toRefs(props);
    const reflectKeys = {
      0: 63,
      1: 6,
      2: 91,
      3: 79,
      4: 102,
      5: 109,
      6: 125,
      7: 7,
      8: 127,
      9: 111,
      '-': 64
    };
    const list = computed(() => {
      let v = reflectKeys[value.value];
      return Array(7)
              .fill(2)
              .map((n, i) => {
                const base = n ** (6 - i);
                return v >= base && (!!(v -= base) || true);
              })
              .reverse();
    });

    return { list };
  }
}
</script>

<style scoped>
.score-num {
  position: relative;
  width: 20px;
  height: 40px;
}

.score-num-piece {
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: #f00;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    65% 100%,
    35% 100%
  );
}

.score-num-piece.piece-shadow {
  background-color: rgba(255, 0, 0, .24);
}

/* 上 */
.piece-0 {
  top: 0;
  left: 0;
}

/* 右上 */
.piece-1 {
  top: 0;
  right: -20px;
  transform-origin: 0% 0%;
  transform: rotateZ(90deg);
}

/* 右下 */
.piece-2 {
  top: 20px;
  right: -20px;
  transform-origin: 0% 0%;
  transform: rotateZ(90deg);
}

/* 下 */
.piece-3 {
  top: 35px;
  transform: rotateZ(180deg);
}

/* 左下 */
.piece-4 {
  top: 40px;
  transform-origin: 0% 0%;
  transform: rotateZ(270deg);
}

/* 左上 */
.piece-5 {
  top: 20px;
  transform-origin: 0% 0%;
  transform: rotateZ(270deg);
}

/* 中 */
.piece-6 {
  top: 18px;
  clip-path: polygon(
    25% 0%,
    75% 0%,
    90% 50%,
    75% 100%,
    25% 100%,
    10% 50%
  );
}
</style>