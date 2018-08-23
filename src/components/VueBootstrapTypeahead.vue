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
        @focus="isFocused = true"
        @blur="isFocused = false"
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
      v-show="isFocused"
      :query="value"
      :data="data"
      :serializer="serializer"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
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
    backgroundVariant: {
      type: String,
      default: 'light'
    },
    textVariant: {
      type: String,
      default: 'dark'
    },
    placeholder: String,
    prepend: String,
    append: String
  },

  computed: {
    sizeClasses() {
      return this.size ? `input-group input-group-${this.size}` : 'input-group'
    }
  },

  methods: {
    resizeList(el) {
      const rect = el.getBoundingClientRect()
      this.$refs.list.$el.style.top = rect.height + 5 + 'px'
      this.$refs.list.$el.style.width = rect.width + 'px'
    }
  },

  data() {
    return {
      isFocused: false
    }
  },

  mounted() {
    this.$_ro = new ResizeObserver(e => {
      this.resizeList(this.$refs.input)
    })
    console.log(this.$refs.list)
    this.$_ro.observe(this.$refs.input)
    this.$_ro.observe(this.$refs.list.$el)
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
