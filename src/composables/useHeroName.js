
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

import classes from '../utils/heroClasses'

Vue.use(CompositionApi)

function useHeroName () {
  const classToName = (classSlug) => {
    return classes[classSlug]
  }

  return {
    classToName
  }
}

export default useHeroName
