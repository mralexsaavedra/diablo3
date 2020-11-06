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

import useSetError from '@/composables/useSetError'

import { getApiAccount } from '@/api/search'

import BaseLoading from '@/components/BaseLoading'

import MainBlock from './MainBlock/Index'
import ArtisansBlock from './ArtisansBlock/Index'

export default {
  name: 'ProfileView',
  components: { BaseLoading, MainBlock, ArtisansBlock },
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()

    const profileData = ref(null)
    const isLoading = ref(true)

    const fetchData = async () => {
      const hash = route.hash
      const { region, battleTag: account } = route.params

      getApiAccount(hash, { region, account })
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

          useSetError(props, context).setError(errObj)

          router.push({ name: 'Error' })
        })
        .finally(() => {
          isLoading.value = false
        })
    }
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

    fetchData()

    return {
      profileData,
      artisansData,
      isLoading
    }
  }
}
</script>
