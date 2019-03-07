<template>
  <div class="list-group shadow">
    <vue-bootstrap-typeahead-list-item
      v-for="(item, id) in matchedItems" :key="id"
      :data="item.data"
      :html-text="highlight(item.text)"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :selected="id == selectedId"
      @click.native="handleHit(item, $event)"
    >
      <template v-if="$scopedSlots.suggestion" slot="suggestion" slot-scope="{ data, htmlText }">
        <slot name="suggestion" v-bind="{ data, htmlText }" />
      </template>
    </vue-bootstrap-typeahead-list-item>
  </div>
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

  data() {
    return {
      selectedItemIndex: 0
    }
  },

  components: {
    VueBootstrapTypeaheadListItem
  },

  props: {
    data: {
      type: Array,
      required: true,
      validator: d => d instanceof Array
    },
    query: {
      type: String,
      default: ''
    },
    backgroundVariant: {
      type: String
    },
    textVariant: {
      type: String
    },
    maxMatches: {
      type: Number,
      default: 10
    },
    minMatchingChars: {
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

    escapedQuery() {
      return escapeRegExp(sanitize(this.query))
    },

    matchedItems() {
      if (this.query.length === 0 || this.query.length < this.minMatchingChars) {
        return []
      }

      const re = new RegExp(this.escapedQuery, 'gi')

      // Filter, sort, and concat
      return this.data
        .filter(i => i.text.match(re) !== null)
        .sort((a, b) => {
          const aIndex = a.text.indexOf(a.text.match(re)[0])
          const bIndex = b.text.indexOf(b.text.match(re)[0])

          if (aIndex < bIndex) { return -1 }
          if (aIndex > bIndex) { return 1 }
          return 0
        }).slice(0, this.maxMatches)
    },

    selectedId() {
      return this.data[this.selectedItemIndex].id
    }
  },

  methods: {
    handleHit(item, evt) {
      evt.preventDefault()
      this.selectedItemIndex = 0
      this.$emit('hit', item)
    },

    keyArrowDown() {
      if (this.selectedItemIndex < this.matchedItems.length - 1) {
        this.selectedItemIndex++
      }
    },

    keyArrowUp() {
      if (this.selectedItemIndex > 0) {
        this.selectedItemIndex--
      }
    },

    keyEnter(event) {
      let item = this.matchedItems[this.selectedItemIndex]
      this.selectedItemIndex = 0
      this.$emit('select', item)
    }
  }
}
</script>
