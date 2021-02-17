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
  name: "VueBootstrapTypeaheadListItem",

  props: {
    data: {},
    htmlText: {
      type: String,
    },
    backgroundVariant: {
      type: String,
    },
    textVariant: {
      type: String,
    },
  },

  data() {
    return {
      active: false,
    };
  },

  computed: {
    textClasses() {
      const classes = [
        "vbst-item",
        "list-group-item",
        "list-group-item-action",
      ];

      if (this.active) {
        classes.push("active");
      }

      if (this.backgroundVariant) {
        classes.push(`bg-${this.backgroundVariant}`);
      }

      if (this.textVariant) {
        classes.push(`text-${this.textVariant}`);
      }

      return classes.join(" ");
    },
  },
};
</script>
