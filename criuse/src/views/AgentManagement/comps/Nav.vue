<template>
  <div class="navComp">
    <ul>
      <li v-for="(item, index) in data"
          :key="index"
          :class="{ active: index === currentIndex }">
        <i :class="item.icon"></i>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navComp',
  props: ['data'],
  data () {
    return {
      currentIndex: 1
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
