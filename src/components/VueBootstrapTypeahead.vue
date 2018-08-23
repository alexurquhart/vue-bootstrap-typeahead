<template>
  <div>
    <div :class="sizeClasses">
      <div v-if="$slots.prepend" class="input-group-prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        ref="input"
        type="search"
        class="form-control"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        autocomplete="off"
      />
      <div v-if="$slots.append" class="input-group-append">
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>
    </div>
    <vue-bootstrap-typeahead-list
      class="vbt-autcomplete-list"
      ref="list"
      :data="data"
    />
  </div>
</template>

<script>
import VueBootstrapTypeaheadList from './VueBootstrapTypeaheadList.vue'
import ResizeObserver from 'resize-observer-polyfill'

export default {
  name: 'VueBootstrapTypehead',

  components: {
    VueBootstrapTypeaheadList
  },

  props: {
    size: {
      type: String,
      default: null,
      validator: size => ['lg', 'sm'].indexOf(size) > -1
    },
    value: String,
    placeholder: String,
    prepend: String,
    append: String
  },

  computed: {
    sizeClasses() {
      return this.size ? `input-group input-group-${this.size}` : 'input-group'
    }
  },

  data() {
    return {
      data: [
        'asdf',
        'asdf',
        'asdf'
      ]
    }
  },

  methods: {
    resizeList(el) {
      const rect = el.getBoundingClientRect()
      this.$refs.list.$el.style.top = rect.height + 5 + 'px'
      this.$refs.list.$el.style.width = rect.width + 'px'
    }
  },

  watch: {

  },

  mounted() {
    this.$_ro = new ResizeObserver(e => {
      this.resizeList(e[0].target)
    })
    this.$_ro.observe(this.$refs.input)
  },

  beforeDestroy() {
    this.$_ro.disconnect()
  }
}
</script>

<style scoped>
  .vbt-autcomplete-list {
    position: absolute;
    max-height: 350px;
    overflow-y: auto;
    z-index: 999;
  }
</style>
