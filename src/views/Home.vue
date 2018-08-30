<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h2>A simple typeahead for Vue 2 using Bootstrap 4</h2>
        <ul>
          <li><code>bootstrap-vue</code> compatible</li>
          <li>Append and prepend icons and buttons</li>
          <li>Works well with API JSON responses</li>
        </ul>
      </div>
      <div class="col-md-6">
        <b-card title="Demo Country Search">
          <p class="card-text">
            Type a country:
          </p>
          <vue-bootstrap-typeahead
            :data="countries"
            v-model="cntrySearch"
            background-variant="light"
            :serializer="s => s.name"
            placeholder="Canada, United States, etc..."
            @hit="selectedCountry = $event"
          />
        </b-card>
      </div>
    </div>
    <div class="big row"></div>
    <div class="row">
      <div class="col">
        <h2>Demo Address Search</h2>
        <p class="card-text">
          External API. Uses the ArcGIS geocoding suggestion service.
        </p>
        <vue-bootstrap-typeahead
          :data="addresses"
          v-model="addressSearch"
          size="lg"
          :serializer="s => s.text"
          placeholder="Type an address..."
          @hit="selectedAddress = $event"
        >
          <template slot="append">
            <button class="btn btn-outline-secondary" type="button">Do Something</button>
          </template>
        </vue-bootstrap-typeahead>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-card title="Selected Address">
          <p class="card-text">
            <pre>{{ selectedAddress | stringify }}</pre>
          </p>
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

  .big {
    height: 500px;
  }
</style>
