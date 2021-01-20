<template>
  <span class="mine shadow-box-outside" :class="className">{{value > 0 && checked ? value : ''}}</span>
</template>

<script>
import { toRefs, computed } from 'vue';
export default {
  name: 'Mine',
  props: {
    index: Number,
    value: {
      type: Number,
      default: 0
    },
    checked: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Number,
      default: 0
    }
  },
  setup (props, ctx) {
    const { value, checked, active, flag } = toRefs(props);
    const className = computed(() => {
      const classList = [];
      classList.push(~value.value ? `color-${value.value}` : 'real');
      if (checked.value) classList.push('checked');
      if (active.value) classList.push('active');
      classList.push(`flag-${flag.value}`);

      return classList.join(' ');
    });

    return { className };
  }
}
</script>

<style scoped>
.mine {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-weight: 700;
  text-align: center;
  box-sizing: border-box;
  background-color: #aaa;
  vertical-align: middle;
  position: relative;
}

.mine.checked {
  border-color: #888;
  border-bottom-width: 0;
  border-right-width: 0;
}

.mine.checked.real::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  clip-path: polygon(
    49% 4%,
    51% 4%,
    54% 40%,
    83% 15%,
    58% 46%,
    96% 49%,
    96% 51%,
    58% 54%,
    83% 85%,
    54% 60%,
    51% 96%,
    49% 96%,
    46% 60%,
    15% 83%,
    42% 54%,
    4% 51%,
    4% 49%,
    42% 46%,
    15% 17%,
    46% 40%
  );
}

.mine.checked.real::after {
  content: '';
  position: absolute;
  left: 9px;
  top: 9px;
  display: block;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 4px 4px 0 8px #000;
}

.mine.real.active {
  background-color: #f00;
}

.mine.flag-1:not(.checked)::before {
  content: '';
  display: block;
  width: 60%;
  height: 50%;
  background-color: #f00;
  clip-path: polygon(40% 60%, 100% 20%, 100% 100%);
}

.mine.flag-1:not(.checked)::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  clip-path: polygon(54% 50%, 60% 50%, 60% 70%, 85% 88%, 85% 90%, 25% 90%, 25% 88%, 54% 70%);
}

.mine.flag-2:not(.checked)::before {
  content: '?';
  color: #000;
}
</style>
