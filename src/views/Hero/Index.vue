<template>
  <div class="hero-view">
    <BaseLoading v-if="isLoadingHero"/>
    <HeroDetailHeader v-if="hero" :detail="detailHeader"/>

    <b-row>
      <b-col md="12" lg="8" order-lg="2">
        <BaseLoading v-if="isLoadingItems"/>
        <HeroItems v-if="items" :items="items"/>
      </b-col>

      <b-col md="12" lg="4" order-lg="1">
        <template v-if="hero">
          <HeroAttributes :attributes="detailStats"/>
          <HeroSkills :skills="hero.skills"/>
        </template>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

import BaseLoading from '@/components/BaseLoading'
import HeroDetailHeader from './HeroDetailHeader'
import HeroAttributes from './HeroAttributes/Index'
import HeroSkills from './HeroSkills/Index'
import HeroItems from './HeroItems/Index'

import { getApiHero, getApiDetailedHeroItems } from '@/api/search'

export default {
  name: 'HeroView',
  components: {
    BaseLoading,
    HeroDetailHeader,
    HeroAttributes,
    HeroSkills,
    HeroItems
  },
  setup (props, { root }) {
    const isLoadingHero = ref(false)
    const isLoadingItems = ref(false)
    const hero = ref(null)
    const items = ref(null)

    const detailHeader = computed(() => {
      const {
        name,
        // valor: alias
        class: classSlug,
        gender,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      } = hero.value

      return {
        name,
        classSlug,
        gender,
        level,
        hardcore,
        seasonal,
        paragonLevel,
        alive,
        seasonCreated
      }
    })

    const detailStats = computed(() => {
      return { ...hero.value.stats, classSlug: hero.value.class }
    })

    function fetchHeroData () {
      const { region, battleTag: account, heroId } = root.$route.params
      isLoadingHero.value = true
      getApiHero({ region, account, heroId })
        .then(({ data }) => {
          hero.value = data
        })
        .catch()
        .finally(() => {
          isLoadingHero.value = false
        })
    }

    function fetchHeroItemsData () {
      const { region, battleTag: account, heroId } = root.$route.params
      isLoadingItems.value = true
      getApiDetailedHeroItems({ region, account, heroId })
        .then(({ data }) => {
          items.value = data
        })
        .catch()
        .finally(() => {
          isLoadingItems.value = false
        })
    }

    fetchHeroData()
    fetchHeroItemsData()

    return {
      isLoadingHero,
      isLoadingItems,
      hero,
      items,
      detailHeader,
      detailStats
    }
  }
}
</script>
