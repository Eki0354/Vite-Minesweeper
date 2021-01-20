<template>
  <div class="smile-face" @click="$emit('reset')">
    <div class="frame">
      <div class="face" :class="faceClass"></div>
    </div>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue';
export default {
  name: 'SmileFace',
  props: ['state'],
  emits: ['reset'],
  setup (props, ctx) {
    const { state: s } = toRefs(props);
    const faceClass = computed(() => ['oh', 'cry', 'seikou'][s.value - 1]);
    
    return { faceClass };
  }
}
</script>

<style scoped>
.smile-face {
  background-color: #aaa;
  border: 1px solid #666;
}

.frame {
  padding: 21px;
  border-style: solid;
  border-width: 2px;
  border-top-color: #eee;
  border-left-color: #eee;
  border-bottom-color: #888;
  border-right-color: #888;
}

.frame:active {
  border-top-color: #666;
  border-left-color: #666;
  border-bottom-color: #eee;
  border-right-color: #eee;
  border-bottom-width: 1px;
  border-right-width: 1px;
}

.face {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #ff0;
  box-shadow:
    7px -5px 0 1px #000,
    -7px -5px 0 1px #000,
    0 -3px 0 14px #ff0,
    0 1px 0 12px #000,
    0 0 0 17px #ff0,
    0 0 0 18px #000;
}

.face.oh {
  box-shadow:
    7px -5px 0 1px #000,
    -7px -5px 0 1px #000,
    0 10px 0 1px #ff0,
    0 10px 0 2px #000,
    0 0 0 17px #ff0,
    0 0 0 18px #000;
}

.face.cry {
  position: relative;
  box-shadow:
  rgb(255, 255, 0) 0px 11px 0px 6px,
  rgb(0, 0, 0) 0px 10px 0px 6px,
  rgb(255, 255, 0) 0px 0px 0px 17px,
  rgb(0, 0, 0) 0px 0px 0px 18px;
}

.face.cry::before {
  content: 'XX';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  transform: translate(-50%, -100%);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 7px;
}

.face.seikou {
  box-shadow:
    6px -5px 0 4px #000,
    -6px -5px 0 4px #000,
    0 -3px 0 14px #ff0,
    0 1px 0 12px #000,
    0 0 0 17px #ff0,
    0 0 0 18px #000;
  position: relative;
}

.face.seikou::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  width: 40px;
  height: 16px;
  background-color: #000;
  clip-path: polygon(
    30% 44%,
    70% 44%,
    100% 100%,
    94% 100%,
    70% 54%,
    30% 54%,
    6% 100%,
    0% 100%
  );
}
</style>