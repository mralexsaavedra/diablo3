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
      <HeroResources :resources="recursos"/>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'

import HeroAttributeList from './HeroAttributeList'
import HeroResources from './HeroResources'

const coreAttributes = ['strength', 'dexterity', 'vitality', 'intelligence']
const secondaryAttributes = ['damage', 'toughness', 'healing']
const resources = ['life', 'primaryResource', 'secondaryResource']

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
    const coreAtributos = computed(() => coreAttributes.map(item => ({ name: item, val: props.attributes[item] })))
    const secondaryAtributos = computed(() => secondaryAttributes.map(item => ({ name: item, val: props.attributes[item] })))
    const recursos = computed(() => {
      const data = {
        classSlug: props.attributes.classSlug,
        resources: {}
      }
      resources.forEach(item => {
        data.resources[item] = { name: item, val: props.attributes[item] }
      })
      return data
    })

    return {
      coreAtributos,
      secondaryAtributos,
      recursos
    }
  }
}
</script>
