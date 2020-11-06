<template>
  <div id="app">
    <LoadLayout v-if="isLoading">
      <BaseLoading/>
    </LoadLayout>

    <MainLayout v-else/>
  </div>
</template>

<script>
import { MainLayout, LoadLayout } from '@/layouts/'
import BaseLoading from '@/components/BaseLoading.vue'

export default {
  name: 'App',
  components: {
    MainLayout,
    LoadLayout,
    BaseLoading
  },
  computed: {
    isLoading () {
      return this.$store.state.loading.isLoading
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
