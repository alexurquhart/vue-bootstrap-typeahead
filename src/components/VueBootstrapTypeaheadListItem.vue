<template>
  <a
    tabindex="0"
    href="#"
    :class="textClasses"
    @mouseover="active = true"
    @mouseout="active = false"
  >
    <slot name="suggestion" v-bind="{ data: data, htmlText: htmlText }">
      <span v-html="htmlText"></span>
    </slot>
  </a>
</template>

<script>
export default {
  name: 'VueBootstrapTypeaheadListItem',

  props: {
    data: {},
    htmlText: {
      type: String
    },
    backgroundVariant: {
      type: String
    },
    textVariant: {
      type: String
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      active: false
    }
  },

  computed: {
    textClasses() {
      let classes = []
      if (this.active || this.selected) {
        classes.push('active')
      }
      if (this.backgroundVariant) {
        classes.push(`bg-${this.backgroundVariant}`)
      }
      if (this.textVariant) {
        classes.push(`bg-${this.textVariant}`)
      }
      return `vbst-item list-group-item list-group-item-action ` + classes.join(' ')
    }
  }
}
</script>

<style scoped>
</style>
