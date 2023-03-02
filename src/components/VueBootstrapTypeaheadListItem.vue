<template>
  <a
    tabindex="0"
    href="#"
    :class="textClasses"
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
    active: {
      type: Boolean
    },
    backgroundVariant: {
      type: String
    },
    textVariant: {
      type: String
    }
  },

  computed: {
    textClasses() {
      const classes = ['vbst-item', 'list-group-item', 'list-group-item-action']
      if (this.active) classes.push('active')
      if (this.backgroundVariant) classes.push(`bg-${this.backgroundVariant}`)
      if (this.textVariant) classes.push(`text-${this.textVariant}`)
      return classes.join(' ')
    }
  }
}
</script>
