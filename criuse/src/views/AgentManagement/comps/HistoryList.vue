<template>
  <div class="historyList">
    <div class="title">History</div>
    <ul class="list">
      <li v-for="(item, index) in data"
          :key="index">
        <svg style="width: 22px;height: 22px;">
          <circle cx="4"
                  cy="11"
                  r="2"></circle>
        </svg>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'historyList',
  props: ['data'],
  data () {
    return {
    }
  }
}
</script>

<style lang="postcss" scoped>

</style>
