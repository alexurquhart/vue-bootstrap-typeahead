<template>
  <ul class="list-group shadow">
    <vue-bootstrap-typeahead-list-item
      v-for="(item, index) in matchedItems" :key="item + index"
      v-html="highlight(item)"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
    />
  </ul>
</template>

<script>
import VueBootstrapTypeaheadListItem from './VueBootstrapTypeaheadListItem.vue'

function sanitize(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default {
  name: 'VueBootstrapTypeaheadList',

  components: {
    VueBootstrapTypeaheadListItem
  },

  props: {
    data: {
      type: Array,
      required: true,
      validator: d => d instanceof Array
    },
    serializer: {
      type: Function,
      default: (d) => d,
      validator: d => d instanceof Function
    },
    query: {
      type: String,
      default: ''
    },
    backgroundVariant: {
      type: String,
      default: 'light'
    },
    textVariant: {
      type: String,
      default: 'dark'
    },
    maxMatches: {
      type: Number,
      default: 10
    },
    minChars: {
      type: Number,
      default: 2
    }
  },

  computed: {
    highlight() {
      return (text) => {
        text = sanitize(text)
        if (this.query.length === 0) {
          return text
        }
        const re = new RegExp(this.escapedQuery, 'gi')

        return text.replace(re, `<strong>$&</strong>`)
      }
    },

    serializedItems() {
      return this.data.map(i => this.serializer(i))
    },

    escapedQuery() {
      return escapeRegExp(sanitize(this.query))
    },

    matchedItems() {
      if (this.query.length === 0 || this.query.length < this.minChars) {
        return []
      }

      const re = new RegExp(this.escapedQuery, 'gi')

      // Filter, sort, and concat
      return this.serializedItems
        .filter(i => i.match(re) !== null)
        .sort((a, b) => {
          const aMatches = a.match(re).length
          const bMatches = b.match(re).length

          if (aMatches < bMatches) { return 1 }
          if (aMatches > bMatches) { return -1 }
          return 0
        }).slice(0, this.maxMatches)
    }
  }
}
</script>

<style>

</style>
