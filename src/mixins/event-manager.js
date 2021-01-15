import { arrayFind, coerceTruthyValueToArray, isIE } from 'setaria-ui/src/utils/util';

const TRACT_EVENT_NAME_ARRAY = ['click', 'change'];

// const EXCLUDE_COMPONENT_ARRAY = ['ElRadioGroup'];

/**
 * 埋点数据实体
 */
class TrackBean {
  constructor(componentName, componentLabel, eventName) {
    // 组件名称（英文）
    this.componentName = componentName;
    // 组件名称(中文)
    this.componentLabel = componentLabel;
    // 事件名称
    this.eventName = eventName;
  }
}

/**
 * 保存埋点数据
 *
 * @param {*} val
 * @param {*} store
 */
function saveTrackInfo(val, store) {
  const SDK_TRACK_MUTATION = '_setaria_common_/_setaria_add_track';
  const SESSION_STORAGE_KEY = '_setaria_ui_add_track';
  // store存在的场合，将track信息存入session
  if (store) {
    store.commit(SDK_TRACK_MUTATION, val);
  } else {
    const session = window.sessionStorage;
    if (session) {
      let currentTrackHistoryList = session.getItem(SESSION_STORAGE_KEY);
      if (currentTrackHistoryList === null || currentTrackHistoryList === undefined) {
        currentTrackHistoryList = [];
      } else {
        try {
          currentTrackHistoryList = JSON.parse(currentTrackHistoryList);
        } catch (e) {
          console.error(`SETARIA_UI_ERROR: ${e}`);
        }
      }
      currentTrackHistoryList.push(val);
      session.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentTrackHistoryList));
    }
  }
}

function getParentFormItem(parent) {
  let ret = parent;
  const DEEP_LIMIT = 5;
  let deep = 0;
  while (ret) {
    // 因IE性能较差，为避免产生性能问题，只查询10次
    if (isIE() && deep === DEEP_LIMIT) {
      return null;
    }
    if (ret.$options.componentName !== 'ElFormItem') {
      ret = ret.$parent;
    } else {
      return ret;
    }
    deep += 1;
  }
  return null;
}

export default {
  beforeCreate() {
    const originEmitFunction = this.$emit;
    this.$emit = (...params) => {
      // 记录事件
      try {
        const paramArray = coerceTruthyValueToArray(params);
        if (paramArray && paramArray.length > 0) {
          const eventName = paramArray[0];
          // 只记录SetariaUI组件的事件
          if (typeof eventName === 'string' &&
            this.$options.name &&
            arrayFind(TRACT_EVENT_NAME_ARRAY, item => eventName === item)) {
            this.$trackEvent(eventName);
          }
        }
      } catch (error) {
        console.log && console.log('事件记录发生错误', error);
      }
      originEmitFunction.apply(this, params);
    };
  },
  methods: {
    $trackEvent(eventName) {
      const componentName = this.$options ? this.$options.name : '';
      const componentLabel = this.$getComponentCurrentLabel();
      const trackBean = new TrackBean(componentName, componentLabel, eventName);
      saveTrackInfo(trackBean, this.$store);
    },
    $getComponentCurrentLabel() {
      if (typeof this.getDisplayLabel === 'function') {
        return this.getDisplayLabel();
      } else {
        const parentFormItem = getParentFormItem(this.$parent);
        if (parentFormItem) {
          return parentFormItem.label;
        }
      }
      return '';
    }
  }
};
