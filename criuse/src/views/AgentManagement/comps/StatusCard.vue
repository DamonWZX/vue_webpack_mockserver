<template>
  <div class='statusCard' :class="title">
    <div class='title'>{{ title }}</div>
    <div class='num'>{{ num }}</div>
    <i :class='`icon-${iconName}`'></i>
  </div>
</template>

<script>
export default {
  name: 'StatusCard',
  props: ['title', 'num'],
  data () {
    return {
    }
  },
  computed: {
    iconName () {
      let iconName = this.title === 'Building' ? 'cog' : 'coffee'
      return iconName
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
