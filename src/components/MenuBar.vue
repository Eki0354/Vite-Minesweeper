<template>
  <div class="menu-bar" ref="menuRoot" @contextmenu="$event.preventDefault()">
    <MenuItem :data="menuList" :visibleList="visibleList"></MenuItem>
  </div>
</template>

<script>
import { ref, toRefs, computed, provide, onMounted, onDeactivated } from 'vue';
import { MENU_LIST } from '../constant.js';
import MenuItem from './MenuItem.vue';
export default {
  name: 'MenuBar',
  components: {
    MenuItem
  },
  props: ['config'],
  setup (props, ctx) {
    provide('bus', ctx);

    const { config } = toRefs(props);

    const menuList = computed(() => {
      const list = JSON.parse(JSON.stringify(MENU_LIST));
      for (let i = 2; i < 6; i++) {
        list[0].children[i].checked = false;
      }
      list[0].children[config.value.level + 2].checked = true;
      list[0].children[7].checked = config.value.showQuestionMark;
      list[0].children[8].checked = config.value.colorful;
      list[0].children[9].checked = config.value.isSoundOn;
      return list;
    });

    // 控制对应子菜单列表的显隐，有待改进
    const visibleList = ref(MENU_LIST.map(_ => false));

    const menuRoot = ref(null);

    const clickHandle = e => {
      if(menuRoot.value && menuRoot.value.contains(e.target)) return;
      visibleList.value = visibleList.value.map(_ => false);
    }
    
    onMounted(() => window.addEventListener('click', clickHandle));
    onDeactivated(() => window.removeEventListener('click', clickHandle));

    return { menuList, menuRoot, visibleList };
  }
}
</script>

<style scoped>
.menu-bar {
  text-align: left;
}
</style>
