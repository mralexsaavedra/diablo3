<template>
  <BaseLoading v-if="isLoading"/>
  <h1>Profile View</h1>
  <template v-if="profileData !== null">
    <MainBlock :profile-data="profileData"/>
    <ArtisansBlock :artisans-data="artisansData" />
  </template>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import setError from '@/mixins/setError'

import { getApiAccount } from '@/api/search'

import BaseLoading from '@/components/BaseLoading'

import MainBlock from './MainBlock/Index'
import ArtisansBlock from './ArtisansBlock/Index'

export default {
  name: 'ProfileView',
  mixins: [
    setError
  ],
  components: { BaseLoading, MainBlock, ArtisansBlock },
  setup () {
    const router = useRouter()
    const route = useRoute()

    let isLoading = ref(true)
    const profileData = ref(null)

    const { region, battleTag: account } = route.params

    getApiAccount({ region, account })
      .then(({ data }) => {
        profileData.value = data
      })
      .catch((err) => {
        profileData.value = null

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
        isLoading = false
      })

    const artisansData = computed(() => {
      return {
        blacksmith: profileData.value.blacksmith,
        blacksmithHardcore: profileData.value.blacksmithHardcore,
        jeweler: profileData.value.jeweler,
        jewelerHardcore: profileData.value.jewelerHardcore,
        mystic: profileData.value.mystic,
        mysticHardcore: profileData.value.mysticHardcore
      }
    })

    return { isLoading, profileData, artisansData }
  }
}
</script>
