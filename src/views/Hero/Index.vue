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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import setError from '@/mixins/setError'
import { getApiHero, getApiDetailedHeroItems } from '@/api/search'
import BaseLoading from '@/components/BaseLoading'

import HeroDetailHeader from './HeroDetailHeader'
import HeroAttributes from './HeroAttributes/Index'
import HeroSkills from './HeroSkills/Index'
import HeroItems from './HeroItems/Index'

export default {
  name: 'HeroView',
  mixins: [setError],
  components: {
    BaseLoading,
    HeroDetailHeader,
    HeroAttributes,
    HeroSkills,
    HeroItems
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    let isLoadingHero = ref(false)
    let isLoadingItems = ref(false)
    let hero = ref(null)
    let items = ref(null)

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
      } = hero

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

    isLoadingHero = true
    isLoadingItems = true
    const { region, battleTag: account, heroId } = route.params

    getApiHero({ region, account, heroId })
      .then(({ data }) => {
        hero = data
      })
      .catch((err) => {
        hero = null
        const errObj = {
          routeParams: route.params,
          message: err.message
        }
        if (err.response) {
          errObj.data = err.response.data
          errObj.status = err.response.status
        }
        setError.setApiErr(errObj)
        router.push({ name: 'Error' })
      })
      .finally(() => {
        isLoadingHero = false
      })

    getApiDetailedHeroItems({ region, account, heroId })
      .then(({ data }) => {
        items = data
      })
      .catch((err) => {
        items = null
        console.log(err)
      })
      .finally(() => {
        isLoadingItems = false
      })

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
