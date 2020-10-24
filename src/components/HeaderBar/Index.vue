<template>
  <div class="header-bar">
    <div class="navigation-bar">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{ name: 'Home' }">
          <img src="@/assets/img/diablo-iii.svg" alt="D3" width="30">
          <span class="font-diablo ml-2">{{ title }}</span>
        </b-navbar-brand>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HeaderBar',
  setup () {
    const title = ref(process.env.VUE_APP_TITLE)
    return {
      title
    }
  }
}
</script>
