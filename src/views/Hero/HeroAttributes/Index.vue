<template>
  <div class="h-attriubutes">
    <!--Título-->
    <h2 class="font-diablo">Attributes</h2>

    <hr class="bg-white">

    <div class="attributes">

      <!-- Atributos Principales-->
      <div class="core">
        <HeroAttributeList :attributes="coreAtributos"/>
      </div>

      <hr>

      <!-- Atributos Secundarios-->
      <div class="secondary">
        <HeroAttributeList :attributes="secondaryAtributos"/>
      </div>

    </div>

    <hr>

    <!-- Recursos -->
    <div class="resources">
      <HeroResources :resources="resources"/>
    </div>

  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

import HeroAttributeList from './HeroAttributeList'
import HeroResources from './HeroResources'

export default {
  name: 'HeroAttributes',
  components: {
    HeroResources,
    HeroAttributeList
  },
  props: {
    attributes: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const coreAttributesList = ['strength', 'dexterity', 'vitality', 'intelligence']
    const secondaryAttributesList = ['damage', 'toughness', 'healing']
    const resourcesList = ['life', 'primaryResource', 'secondaryResource']

    const coreAtributos = computed(() => coreAttributesList.map(item => ({ name: item, val: props.attributes[item] })))
    const secondaryAtributos = computed(() => secondaryAttributesList.map(item => ({ name: item, val: props.attributes[item] })))
    const resources = computed(() => {
      const data = {
        classSlug: props.attributes.classSlug,
        resources: {}
      }
      resourcesList.forEach(item => {
        data.resources[item] = { name: item, val: props.attributes[item] }
      })

      return data
    })

    return {
      coreAtributos,
      secondaryAtributos,
      resources
    }
  }
}
</script>
