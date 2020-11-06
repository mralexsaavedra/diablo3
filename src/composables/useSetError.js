
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export default function useSetError (props, context) {
  const setError = (params) => {
    context.root.$store.commit('error/SET_ERROR', params)
  }

  return {
    setError
  }
}
