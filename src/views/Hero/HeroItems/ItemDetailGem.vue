<template>
  <img :src="gemUrl" :alt="gem.item.name" :title="gem.item.name">
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'GemSlotItem',
  props: {
    gem: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const gemUrl = computed(() => {
      const host = 'http://media.blizzard.com/d3/icons/items/small/'
      return `${host}${props.gem.item.icon}.png`
    })

    return {
      gemUrl
    }
  }
}
</script>
