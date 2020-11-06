<template>
  <div class="hero-ico d-flex align-items-center hover-cursor-pointer" @click="goToHero(hero.id)">
    <span class="hero-image border" :class="heroClassImg"/>
    <span class="hero-name ml-2 font-weight-bold" :class="{'text-danger': hero.hardcore}">
      {{ hero.name }}
    </span>
    <img v-if="hero.seasonal" src="@/assets/img/leaf.png" width="12px" class="ml-2" alt="seasonal_leaf">
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

import useGoToHero from '@/composables/useGoToHero'

export default {
  name: 'HeroIco',
  props: {
    hero: {
      required: true,
      type: Object
    }
  },
  setup (props, context) {
    const heroClassImg = computed(() => {
      const gender = props.hero.gender === 1 ? 'female' : 'male'
      const hardcore = props.hero.hardcore ? 'border-danger' : ''
      return `hero-${props.hero.classSlug} ${gender} ${hardcore}`
    })

    return {
      heroClassImg,
      ...useGoToHero(props, context)
    }
  }
}
</script>

<style lang="stylus">
.hero-ico
  vertical-align middle

  .hero-image
    width 30px
    height 26px
    display inline-block
    background-size 210%

  .hero-name
    height 24px
    display inline-block
</style>
