<template>
  <div class="grid-container">
    <div class="grid-item item-left">

      <TopHeroes v-if="hasHeroes" :heroes="topHeroes"/>

      <HeroesList v-if="hasHeroesList" :heroes="heroesList"/>

      <ProgressList :acts="profileData.progression"/>

    </div>

    <div class="grid-item item-right">

      <PlayerStats :stats="statsData"/>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import TopHeroes from './TopHeroes/Index'
import HeroesList from './HeroesList/Index'
import ProgressList from './ProgressList/Index'

export default {
  name: 'MainBlock',
  components: { TopHeroes, HeroesList, ProgressList },
  props: {
    profileData: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const hasHeroes = computed(() => props.profileData.heroes.length > 0)
    const topHeroes = computed(() => props.profileData.heroes.slice(0, 3))
    const hasHeroesList = computed(() => props.profileData.heroes.length > 3)
    const heroesList = computed(() => props.profileData.heroes.slice(3, props.profileData.heroes.length))
    const statsData = computed(() => {
      const { paragonLevel, kills, timePlayed } = props.profileData
      return { paragonLevel, kills, timePlayed }
    })

    return {
      hasHeroes,
      topHeroes,
      hasHeroesList,
      heroesList,
      statsData
    }
  }
}
</script>

<style lang="stylus">
.grid-container
  display grid
  grid-template-columns 1fr

  .grid-item
    &.item-left
      grid-column span 1

    &.item-right
        grid-column span 1

@media (min-width: 992px)
  .grid-container
    display grid
    grid-template-columns repeat(6, 1fr)

    .grid-item
      &.item-left
        grid-column span 4

      &.item-right
        grid-column span 2
</style>
