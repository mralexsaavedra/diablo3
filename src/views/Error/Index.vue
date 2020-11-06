<template>
  <div class="error-page m-5">
    <hr class="my-5">
    <!-- Si hay error -->
    <div v-if="err">

      <!-- Si hay codigo de error -->
      <h1 class="my-5">Error <span v-if="err.status">{{ err.status }}</span></h1>

      <!-- Si hay parámetros de ruta -->
      <div v-if="err.routeParams">
        <h2>Query Params:</h2>
        <ul class="list-unstyled">
          <li v-for="(val, key) in err.routeParams" :key="key">
            👉 {{ key.toUpperCase() }}: <span class="lead text-muted">{{ val }}</span>
          </li>
        </ul>

        <hr class="my-5">
      </div>

      <!-- Si hay mensaje de error -->
      <div v-if="err.message">
        <p class="lead"> {{ err.message }}</p>
      </div>

      <!-- Si hay información de error adicional -->
      <div v-if="err.data">
        <ul class="list-unstyled">
          <li v-for="(val, key) in err.data" :key="key">
            {{ key.toUpperCase() }}: <span class="lead text-muted">{{ val }}</span>
          </li>
        </ul>
      </div>

    </div>

    <!-- Si NO hay error -->
    <div v-else>
      <h1 class="my-5">Error Page</h1>
      <p class="lead">What are you doing here? 🤔</p>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import useSetError from '@/composables/useSetError'

export default {
  name: 'ErrorView',
  setup (props, context) {
    const store = useStore()

    const err = computed(() => {
      return store.state.error.error
    })
    function prepareLeave () {
      useSetError(props, context).setError(null)
    }

    return {
      err,
      prepareLeave
    }
  },
  beforeRouteLeave (to, from, next) {
    // prepareLeave()
    from.matched[0].instances.default.prepareLeave()
    next()
  }
}
</script>
