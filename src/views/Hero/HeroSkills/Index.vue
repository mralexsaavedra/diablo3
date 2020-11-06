<template>
  <div class="skills-wrapper mt-5">
    <h2 class="font-diablo">Skills</h2>
    <hr class="bg-white">

    <b-nav pills small>
      <b-nav-item :active="!isPassiveSkillsActive" @click="changeComponent('ActiveSkills')">Active</b-nav-item>
      <b-nav-item :active="isPassiveSkillsActive" @click="changeComponent('PassiveSkills')">Passive</b-nav-item>
    </b-nav>

    <keep-alive>
      <component :is="activeComponent" :skills="componentProps"/>
    </keep-alive>

  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api'

export default {
  name: 'HeroSkills',
  components: {
    ActiveSkills: () => import(/* webpackChunkName: "ActiveSkills" */'./ActiveSkills'),
    PassiveSkills: () => import(/* webpackChunkName: "PassiveSkills" */'./PassiveSkills')
  },
  props: {
    skills: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const activeComponent = ref('ActiveSkills')
    const componentProps = computed(() => activeComponent.value === 'ActiveSkills' ? props.skills.active : props.skills.passive)
    const isPassiveSkillsActive = computed(() => activeComponent.value === 'PassiveSkills')

    const changeComponent = (component) => {
      activeComponent.value = component
    }

    return {
      activeComponent,
      componentProps,
      isPassiveSkillsActive,
      changeComponent
    }
  }
}
</script>
