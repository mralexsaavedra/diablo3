import { useStore } from 'vuex'

function useSetError (props, context) {
  const store = useStore()

  const setError = (params) => {
    store.commit('error/SET_ERROR', params)
  }

  return {
    setError
  }
}

export default useSetError
