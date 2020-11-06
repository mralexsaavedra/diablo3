<template>
  <div class="resource-wrapper">
    <div class="resource">
      <div class="d-flex justify-content-start align-items-center">
        <!-- Imagen Vida -->
        <div class="resource-icon resource-life"/>
        <!-- Nombre -->
        <div class="ml-3 text-uppercase name-text">
          <span>{{ resources.resources.life.name }}</span>
        </div>
        <!-- Valor -->
        <div class="ml-3">
          <span class="text-monospace"> {{ formatNumber(resources.resources.life.val) }} </span>
        </div>
      </div>

    </div>

    <hr>

    <div class="resource">
      <div class="d-flex justify-content-start align-items-center">
        <!-- Imagen Recurso -->
        <div class="resource-icon" :class="classResourceName"/>
        <!-- Nombre -->
        <div class="ml-3 text-uppercase name-text" :class="'resource-name-' + resources.classSlug">
          <span>{{ displayResourceName }}</span>
        </div>
        <div class="ml-3">
          <!-- Valor -->
          <span class="text-monospace">
            {{ formatNumber(resources.resources.primaryResource.val) }}
          <template v-if="hasSecondaryResource">
            <!-- Valor recurso secundario -->
            <span class="mx-0 text-muted">/</span>
            <span> {{ formatNumber(resources.resources.secondaryResource.val) }} </span>
          </template>
          </span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { formatNumber } from '@/filters/numeral'
import useResources from '@/composables/useResources'

export default {
  name: 'HeroResources',
  props: {
    resources: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const classResourceName = computed(() => {
      return `resource-${useResources().resourceClassName(props.resources.classSlug)}`
    })
    const displayResourceName = computed(() => {
      return useResources().resourceDisplayName(props.resources.classSlug)
    })
    const hasSecondaryResource = computed(() => {
      return props.resources.classSlug === 'demon-hunter'
    })

    return {
      formatNumber,
      classResourceName,
      displayResourceName,
      hasSecondaryResource
    }
  }
}
</script>

<style lang="stylus">
  .resource
    .name-text
      color #efb45d

    .resource-name-demon-hunter
      width auto

  @media (min-width: 992px)
    .resource
      .resource-name-demon-hunter
        width 100px
</style>
