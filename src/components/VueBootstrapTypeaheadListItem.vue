<template>
  <a
    href="#"
    :class="textClasses"
  >
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'VueBootstrapTypeaheadListItem',

  props: {
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
