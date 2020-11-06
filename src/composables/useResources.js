import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export default function useResource () {
  const names = {
    BARBARIAN: 'barbarian',
    CRUSADER: 'crusader',
    MONK: 'monk',
    WIZARD: 'wizard',
    WITCHDOCTOR: 'witch-doctor',
    NECROMANCER: 'necromancer',
    DEMONHUNTER: 'demon-hunter'
  }

  const resourceClassNameList = {
    [names.BARBARIAN]: 'fury',
    [names.CRUSADER]: 'wrath',
    [names.MONK]: 'spirit',
    [names.WIZARD]: 'arcane-power',
    [names.WITCHDOCTOR]: 'mana',
    [names.NECROMANCER]: 'essence',
    [names.DEMONHUNTER]: 'hatred-discipline'
  }

  const resourceDisplayNameList = {
    [names.BARBARIAN]: 'Fury',
    [names.CRUSADER]: 'Wrath',
    [names.MONK]: 'Spirit',
    [names.WIZARD]: 'Arcane Power',
    [names.WITCHDOCTOR]: 'Mana',
    [names.NECROMANCER]: 'Essence',
    [names.DEMONHUNTER]: 'Hatred / Discipline'
  }

  function resourceClassName (classSlug) {
    return resourceClassNameList[classSlug]
  }
  function resourceDisplayName (classSlug) {
    return resourceDisplayNameList[classSlug]
  }

  return {
    resourceClassName,
    resourceDisplayName
  }
}
