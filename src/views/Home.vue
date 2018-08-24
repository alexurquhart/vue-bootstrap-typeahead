<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h2>A simple typeahead for Vue 2 using Bootstrap 4</h2>

        <ul>
          <li><code>bootstrap-vue</code> compatible</li>
        </ul>
      </div>
      <div class="col-md-6">
        <b-card title="Demo Address Search">
          <p class="card-text">
            Type any address:
          </p>
          <vue-bootstrap-typeahead
            :data="addresses"
            v-model="addressSearch"
            size="lg"
            :serializer="s => s.text"
            placeholder="Type an address..."
            @hit="selectedAddress = $event"
          />
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import VueBootstrapTypeahead from '../components/VueBootstrapTypeahead'

const API_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&maxSuggestions=5&text=:keyword'

export default {
  name: 'Home',
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      cntrySearch: '',
      addressSearch: '',
      countries: [],
      selectedCountry: {},
      addresses: [],
      selectedAddress: {}
    }
  },
  methods: {
    handleHit(evt) {
      this.selectedCountry = evt
    },

    async getAddresses(query) {
      const res = await fetch(API_URL.replace(':keyword', query))
      const suggestions = await res.json()
      this.addresses = suggestions.suggestions
    }
  },

  watch: {
    addressSearch: _.debounce(function(addr) { this.getAddresses(addr) }, 500)
  },

  filters: {
    stringify: t => JSON.stringify(t, null, 2)
  },

  async mounted() {
    const res = await fetch('/countries.json')
    this.countries = await res.json()
  }
}
</script>

<style scoped>
  .row {
    padding-top: 1rem;
  }
</style>
