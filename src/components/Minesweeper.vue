<template>
  <div class="panel" :class="`width${gameType.width}`">
    <!-- 计分板 -->
    <div class="score shadow-box-inside">
      <!-- 剩余雷数 -->
      <ScoreItem :value="leftMines"></ScoreItem>
      <!-- 笑脸提示 -->
      <SmileFace :state="smileState" @reset="reset"></SmileFace>
      <!-- 即时得分 -->
      <ScoreItem :value="currentScore"></ScoreItem>
    </div>
    <!-- 雷区 -->
    <div class="mine-area shadow-box-inside">
      <Mine
        v-for="(mine, index) in mineList"
        :index="index"
        :value="mine.value"
        :checked="mine.checked"
        :active="mine.active"
        :flag="mine.flag"
        @mousedown="mousedownHandle($event, index)"
        @mouseup="mouseupHandle($event, index)"
        @mouseenter="mouseenterHandle($event, index)"
        @mouseleave="mouseleaveHandle($event, index)"
        @contextmenu="$event.preventDefault()"
      >
      </Mine>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ScoreItem from './ScoreItem.vue';
import SmileFace from './SmileFace.vue';
import Mine from './Mine.vue';
import { GAME_TYPES } from '../constant.js';
export default {
  name: 'Minesweeper',
  components: {
    ScoreItem,
    SmileFace,
    Mine
  },
  setup (props, ctx) {
    const gameType = ref(GAME_TYPES[0]);
    const mineList = ref([]);
    const leftMines = ref(0);
    const smileState = ref(0);
    const currentScore = ref(0);
    // 游戏进行状态：0-已初始化；1-正在进行；2-结束；
    const gameState = ref(0);
    let activeIndex = -1;

    const reset = e => {
      const { x, y, mines } = gameType.value;
      mineList.value = createMineList(x, y, mines);
      leftMines.value = mines;
      smileState.value = 0;
      currentScore.value = 0;
      gameState.value = 0;
    }

    // 埋雷和周边雷数算法
    function createMineList (x, y, mines) {
      const length = x * y;
      const list = Array(length).fill(true).map(_ => {
        return {
          value: 0,
          checked: false,
          active: false,
          flag: 0
        };
      });

      // 随机埋雷
      let pos = 0;
      while (pos < mines) {
        const index = ~~(Math.random() * length);
        if (!~list[index].value) continue;
        list[index].value = -1; // value为-1代表是此格为雷，否则为0及以上，表示此格周围拥有雷的数量
        // 增加周围格子显示雷的数量的计数
        [-x, 0, x].forEach(m => [-1, 0, 1].forEach(n => {
          // if ((!(index % x) && !~n) || (!((index + 1) % x) && n === 1)) return;
          if (((index + 1) % x) * 2 + n === 1) return; // 用集合精简判定
          const item = list[index + m + n];
          item && item.value > -1 && item.value++;
        }));
        pos++;
      }

      return list;
    }
    
    const chainReaction = (list, index, x) => {
      [-x, 0, x].forEach(m => [-1, 0, 1].forEach(n => { // 链式展开同样需要判断四个顶角
        if (((index + 1) % x) * 2 + n === 1) return; // 用集合精简判定，原判定代码同埋雷算法
        const item = list[index + m + n];
        if (!item || item.value < 0 || item.checked) return;
        item.checked = true;
        item.flag === 1 && leftMines.value++;
        item.flag = 0;
        if (!item.value) chainReaction(list, index + m + n, x);
      }));
    }

    const mousedownHandle = (e, index) => {
      if (gameState.value === 2 || e.button !== 0) return;
      smileState.value = 1;
      activeMine(index);
    }

    const mouseupHandle = (e, index) => {
      if (gameState.value === 2) return;
      if (e.button === 0) { // 左键
        if (gameState.value === 0) gameState.value = 1; // 首次点击并弹起后才算开始游戏
        activeMine(index);
        if (~mineList.value[index].value) { // 非地雷格
          const item = mineList.value[index];
          if (item.checked) return; // 已查看的格子不再响应
          item.checked = true;
          item.active = true;
          item.flag === 1 && leftMines.value++;
          item.flag = 0;
          smileState.value = 0;
          // 非零雷格子不进行链式展开
          if (!item.value) chainReaction(mineList.value, index, gameType.value.x);
          if (!isGameFinished()) return; // 检测游戏是否完成
          gameSucceed(); // 检测通过时，只可能是成功，右键时同理。
        } else { // 地雷格
          gameFailed();
        }
      } else if (e.button === 2) { // 右键
        const item = mineList.value[index];
        if (item.checked) return;
        if (item.flag === 1) leftMines.value++;
        // 原版扫雷有BUG，标记过多导致剩余雷数小于-99后，会从-1重新开始计数。此处限制最多标记至剩余-99。
        if (item.flag === 0 && leftMines.value <= -99) return;
        item.flag = (item.flag + 1) % 3;
        if (item.flag === 1) leftMines.value--;
        if (!isGameFinished()) return;
        gameSucceed();
      }
    }

    const mouseenterHandle = (e, index) => {
      if (gameState.value === 2 || smileState.value !== 1) return;
      activeMine(index);
    }

    const mouseleaveHandle = (e, index) => {
      if (gameState.value === 2 || smileState.value !== 1) return;
      activeMine(-1);
    }

    // 激活某个方块，用于指明当前鼠标作用的位置。
    const activeMine = index => {
      if (~activeIndex) mineList.value[activeIndex].active = false; // 清除上一个响应格子
      activeIndex = index;
      if (~index) mineList.value[index].active = true;
    }

    const isGameFinished = () => {
      const validCount = mineList.value.reduce((p, c) => p + +(c.checked || (c.flag === 1 && !~c.value)), 0);
      const { x, y } = gameType.value;
      return validCount === x * y;
    }

    const gameFailed = () => {
      mineList.value.forEach(i => ~i.value || (i.checked = true)); // 展开所有地雷格
      gameState.value = 2;
      smileState.value = 2;
    }

    const gameSucceed = () => {
      console.log('yes')
      gameState.value = 2;
      smileState.value = 3;
    }

    reset(); // 初始化

    return {
      gameType,
      mineList,
      leftMines,
      smileState,
      currentScore,
      reset,
      mousedownHandle,
      mouseupHandle,
      mouseenterHandle,
      mouseleaveHandle
    };
  }
}
</script>

<style scoped>
.panel {
  background-color: #aaa;
  padding: 8px 12px;
  user-select: none;
}

.score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #aaa;
  margin-bottom: 12px;
}
</style>
