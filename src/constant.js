export const GAME_TYPES = [
  {
    title: '初级',
    x: 9,
    y: 9,
    mines: 10
  },
  {
    title: '中级',
    x: 16,
    y: 16,
    mines: 40
  },
  {
    title: '高级',
    x: 30,
    y: 16,
    mines: 99
  },
  {
    title: '自定义',
    x: 9,
    y: 9,
    mines: 10
  }
]

export const RECORD_KEY = '__record__';

export const CONFIG_KEY = '__config__';

export const DEFAULT_CONFIG = {
  level: 0,
  customLevelConfig: {
    x: 9,
    y: 9,
    mines: 10
  },
  showQuestionMark: true,
  colorful: true,
  isSoundOn: false
};

export const MENU_LIST = [
  {
    type: 0,
    title: '游戏',
    children: [
      {
        type: 0,
        title: '开局',
        emit: 'start'
      },
      {
        type: 1
      },
      {
        type: 2,
        title: '初级',
        checked: DEFAULT_CONFIG.level === 0,
        emit: 'changeLevel',
        value: 0
      },
      {
        type: 2,
        title: '中级',
        checked: DEFAULT_CONFIG.level === 1,
        emit: 'changeLevel',
        value: 1
      },
      {
        type: 2,
        title: '高级',
        checked: DEFAULT_CONFIG.level === 2,
        emit: 'changeLevel',
        value: 2
      },
      {
        type: 2,
        title: '自定义…',
        checked: DEFAULT_CONFIG.level === 3,
        emit: 'changeLevel',
        value: 3
      },
      {
        type: 1
      },
      {
        type: 2,
        title: '显示<?>标记',
        checked: DEFAULT_CONFIG.showQuestionMark,
        emit: 'triggerQuestionMark'
      },
      {
        type: 2,
        title: '颜色',
        checked: DEFAULT_CONFIG.colorful,
        emit: 'triggerColorFilter'
      },
      {
        type: 2,
        title: '声音',
        disabled: true,
        checked: DEFAULT_CONFIG.isSoundOn,
        emit: 'triggerSound'
      },
      {
        type: 1
      },
      {
        type: 0,
        title: '扫雷英雄榜',
        emit: 'showScoreRank'
      },
      {
        type: 1
      },
      {
        type: 0,
        title: '退出',
        emit: 'exit'
      }
    ]
  },
  {
    type: 0,
    title: '帮助',
    children: [
      {
        type: 0,
        title: '说明',
        emit: 'setsume'
      },
      {
        type: 0,
        title: '关于',
        emit: 'about'
      }
    ]
  }
]
