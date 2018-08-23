<template>
  <li :class="textClasses"><slot></slot></li>
</template>

<script>
export default {
  name: 'VueBootstrapTypeaheadListItem',

  props: {
    backgroundVariant: {
      type: String,
      default: 'light'
    },
    textVariant: {
      type: String,
      default: 'dark'
    }
  },

  computed: {
    textClasses() {
      let classes = `bg-${this.backgroundVariant} text-${this.textVariant}`
      return `list-group-item ${classes}`
    }
  }
}
</script>
