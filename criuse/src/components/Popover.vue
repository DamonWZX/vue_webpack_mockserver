<template>
  <div v-if="popShow"
       class="popComp">
    <div class="popover"
         :style="customStyle">

      <i class="icon-close close"
         @click="handlePopHide"></i>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="mask"
         @click="handlePopHide"></div>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    option: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      popShow: false
    }
  },
  computed: {
    customStyle () {
      return {
        width: `${this.option.width || 570}px`,
        height: `${this.option.height || 160}px`
      }
    }
  },
  methods: {
    handlePopShow () {
      this.popShow = true
    },
    handlePopHide () {
      this.popShow = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.popComp {
  position: absolute;
  & .popover {
    background-color: #fff;
    border: 1px solid #00b4cf;
    box-shadow: 0 3px 5px #0003;
    padding: 14px;
    transition: all 0.4s;
    position: relative;
    z-index: 9999;
    & i.close {
      position: absolute;
      top: 8px;
      right: 14px;
      color: #00b4cf;
      font-size: 22px;
      cursor: pointer;
    }
  }
  & .popover:before {
    content: " ";
    display: block;
    width: 18px;
    height: 15px;
    border: 1px solid #00b4cf;
    transform: rotate(62deg) skewX(34deg);
    border-right: 0;
    border-bottom: 0;
    position: absolute;
    top: -8px;
    background: #fff;
    left: 18px;
  }
  & .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9996;
  }
}
</style>
