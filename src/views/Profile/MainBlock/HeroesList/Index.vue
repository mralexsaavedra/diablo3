<template>
  <div>
    <h1>Heroes List</h1>
    <div class="heroes-list border-top border-secondary mt-5 pt-5">
      <b-table
        hover
        striped
        dark
        :items="heroes"
        :fields="fields"
        stacked="sm"
        small
      >
        <template v-slot:cell(name)="data">
          <HeroIco :hero="data.item"/>
        </template>
        <template v-slot:cell(class)="data">
          <HeroClassLevel :hero="{ class: data.item.class, level: data.item.level}"/>
        </template>
        <template v-slot:cell(kills)="data">
          <span>{{ formatNumber(data.item.kills.elites) }}</span>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatNumber } from '@/filters/numeral'

import HeroIco from './HeroIco'
import HeroClassLevel from './HeroClassLevel'

export default {
  name: 'HeroesList',
  components: { HeroIco, HeroClassLevel },
  props: {
    heroes: {
      required: true,
      type: Array
    }
  },
  setup () {
    const fields = ref([
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'class',
        label: 'Class',
        sortable: true
      },
      {
        key: 'kills',
        label: 'Elite Kills',
        sortable: true
      }
    ])

    return { fields, formatNumber }
  }
}
</script>
