<template>
  <template v-for="(item, index) in data">
    <div class="separator" v-if="item.type === 1"></div>
    <div
      v-else
      class="menu-item"
      :class="{
        'sub-menu-item': isSub,
        'checked': item.type === 2 && item.checked,
        'disabled': item.disabled
      }"
      @click="clickHandle(item, index)"
    >
      <span>{{item.title}}</span>
      <div
        v-if="item.children && item.children.length"
        v-show="visibleList[index]"
        class="sub-menu-list"
      >
        <MenuItem :data="item.children" :isSub="true"></MenuItem>
      </div>
    </div>
  </template>
</template>

<script>
import { ref, toRefs, inject } from 'vue';
export default {
  name: 'MenuItem',
  props: {
    data: {
      type: Array,
      default: []
    },
    isSub: {
      type: Boolean,
      default: false
    },
    visibleList: {
      type: Array,
      default: []
    }
  },
  setup (props, ctx) {
    const bus = inject('bus');
    const { isSub, visibleList } = toRefs(props);

    const clickHandle = (item, index) => {
      if (isSub.value) {
        item.emit && bus.emit(item.emit, item.value);
      } else {
        visibleList.value.forEach((_, i) => { visibleList.value[i] = i === index && !visibleList.value[i]; });
      }
    }

    return { clickHandle };
  }
}
</script>

<style scoped>
.menu-item {
  box-sizing: border-box;
  display: inline-block;
  max-width: 100px;
  padding-left: 8px;
  padding-right: 16px;
  height: 24px;
  background-color: #ccc;
  border: 1px solid #ccc;
  line-height: 24px;
  text-align: left;
  user-select: none;
  position: relative;
}

.menu-item:hover {
  background-color: #bbf;
  border-color: #99c;
}

.menu-item:active {
  background-color: #aad;
  border-color: #77c;
}

.menu-item.disabled {
  pointer-events: none;
  background-color: #666;
}

.separator {
  box-sizing: border-box;
  height: 0;
  margin: 6px 0 6px 24px;
  width: calc(100% - 28px);
  border-top: 1px solid #aaa;
}

.sub-menu-list {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 1;
  background-color: #ccc;
  border: 1px solid #aaa;
}

.sub-menu-item {
  min-width: 160px;
  padding-left: 24px;
}

.sub-menu-item:hover {
  background-color: #99e;
}

.sub-menu-item.checked::before {
  content: '√';
  position: absolute;
  left: 0;
  top: 0;
  margin: 2px;
  width: 18px;
  height: 18px;
  background-color: #99e;
  text-align: center;
  line-height: 18px;
}

.sub-menu-item.checked:hover::before {
  background-color: #77f;
}
</style>
