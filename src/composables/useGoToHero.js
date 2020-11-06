import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export default function useGoToHero (props, context) {
  function goToHero (heroId) {
    const hash = context.root.$route.hash.replace('#', '-')
    const { region, battleTag } = context.root.$route.params

    context.root.$router.push(
      {
        name: 'Hero',
        params: {
          region,
          battleTag: `${battleTag}${hash}`,
          heroId
        }
      }
    )
  }

  return {
    goToHero
  }
}
