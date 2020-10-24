<template>
  <div id="app">
    <LoadLayout v-if="state.loading">
      <BaseLoading/>
    </LoadLayout>

    <MainLayout v-else/>
<!--     <Suspense>
      <template #default>
        <MainLayout />
      </template>

      <template #fallback>
        <LoadLayout>
          <BaseLoading/>
        </LoadLayout>
      </template>
    </Suspense> -->
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

import LoadLayout from './layouts/LoadLayout'
import MainLayout from './layouts/MainLayout'
import BaseLoading from '@/components/BaseLoading.vue'

export default {
  name: 'App',
  components: {
    MainLayout,
    LoadLayout,
    BaseLoading
  },
  setup (props, { root }) {
    console.log('Hola 🌝')

    useStore().dispatch('oauth/getToken', null, { root: true })

    const state = reactive({
      loading: computed(() => useStore().state.loading.value)
    })

    return {
      state
    }
  }
}
</script>

<style lang="stylus">
#app
    padding 60px 0
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #ffffff
    background-color #15202b
</style>
