<template>
  <div class="hero-name-level">
    <span> {{ classToName(hero.class) }}</span>
    <span></span>
    <span class="text-monospace font-weight-bold"> {{ hero.level }} </span>
  </div>
</template>>

<script>
import useHeroName from '@/composables/useHeroName.js'

export default {
  name: 'HeroNameLevel',
  props: {
    hero: {
      required: true,
      type: Object
    }
  },
  setup () {
    return {
      ...useHeroName()
    }
  }
}
</script>
