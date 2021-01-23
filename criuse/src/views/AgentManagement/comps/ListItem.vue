<template>
  <div class="listItem">
    <div class="img">
      <img :src="require(`../../../assets/osIcons/${data.os}.png`)"
           :alt="data.os">
    </div>
    <div class="itemContent">
      <div class="top">
        <div class="name">
          <i class="icon-desktop"></i>
          <span>{{ data.name }}</span>
        </div>
        <div class="status">
          <span :class="data.status">{{ data.status }}</span>
        </div>
        <div class="ip">
          <i class="icon-info"></i>
          {{ data.ip }}
        </div>
        <div class="location">
          <i class="icon-folder"></i>
          {{ data.location }}
        </div>
      </div>
      <div class="bottom">
        <div class="addBtn"
             @click="handleItemAddResource">
          <i class="icon-plus"></i>
        </div>
        <ul class="tagList">
          <li class="tag"
              v-for="(resource, index) in data.resources"
              :key="index">
            <span>{{ resource }}</span>
            <i class="icon-trash"
               @click="handleItemDeleteResource(index)"></i>
          </li>
        </ul>
        <div class="denyBtn"
             v-if="data.status === 'building'">
          <i class="icon-deny"></i>
          <span>Deny</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopoverComp from '@/components/Popover'
export default {
  name: 'listItem',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleItemAddResource () {
      this.$emit('handleItemAddResource')
    },
    handleItemDeleteResource (index) {
      this.data.resources.splice(index, 1)
      this.$emit('handleItemDeleteResource', this.data)
    }
  },
  components: {
    PopoverComp
  }
}
</script>

<style lang="postcss" scoped>

</style>
