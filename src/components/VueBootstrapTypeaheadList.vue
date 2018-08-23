<template>
  <ul class="list-group shadow">
    <vue-bootstrap-typeahead-list-item v-for="(item, index) in data" :key="item + index">
      {{item}}
    </vue-bootstrap-typeahead-list-item>
  </ul>
</template>

<script>
import VueBootstrapTypeaheadListItem from './VueBootstrapTypeaheadListItem.vue'

export default {
  name: 'VueBootstrapTypeaheadList',

  components: {
    VueBootstrapTypeaheadListItem
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
