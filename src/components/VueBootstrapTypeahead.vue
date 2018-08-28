<template>
  <div>
    <div :class="sizeClasses">
      <div v-if="$slots.prepend || prepend" class="input-group-prepend">
        <slot name="prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </slot>
      </div>
      <input
        ref="input"
        type="search"
        :class="`form-control ${inputClass}`"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="value"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="$emit('input', $event.target.value)"
        autocomplete="off"
      />
      <div v-if="$slots.append || append" class="input-group-append">
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>
    </div>
    <vue-bootstrap-typeahead-list
      class="vbt-autcomplete-list"
      ref="list"
      v-show="isFocused && data.length > 0"
      :query="value"
      :data="formattedData"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :minMatchingChars="minMatchingChars"
      @hit="handleHit"
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
    backgroundVariant: String,
    textVariant: String,
    inputClass: {
      type: String,
      default: ''
    },
    maxMatches: {
      type: Number,
      default: 10
    },
    minMatchingChars: {
      type: Number,
      default: 2
    },
    placeholder: String,
    prepend: String,
    append: String
  },

  computed: {
    sizeClasses() {
      return this.size ? `input-group input-group-${this.size}` : 'input-group'
    },

    formattedData() {
      if (!(this.data instanceof Array)) {
        return []
      }
      return this.data.map((d, i) => {
        return {
          id: i,
          data: d,
          text: this.serializer(d)
        }
      })
    }
  },

  methods: {
    resizeList(el) {
      const rect = el.getBoundingClientRect()
      // this.$refs.list.$el.style.top = rect.height + 5 + 'px'
      this.$refs.list.$el.style.width = rect.width + 'px'
    },

    handleHit(evt) {
      this.$emit('input', evt.text)
      this.$emit('hit', evt.data)
      this.$refs.input.blur()
      this.isFocused = false
    },

    handleBlur(evt) {
      const tgt = evt.relatedTarget
      if (tgt && tgt.classList.contains('vbst-item')) {
        return
      }
      this.isFocused = false
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
    padding-top: 5px;
    position: absolute;
    max-height: 350px;
    overflow-y: auto;
    z-index: 999;
  }
</style>
