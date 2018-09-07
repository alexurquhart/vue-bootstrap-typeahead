<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>A simple typeahead for Vue 2 using Bootstrap 4</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <ul>
          <li><code>bootstrap-vue</code> compatible</li>
          <li>Append and prepend icons and buttons</li>
          <li>Works well with API JSON responses</li>
        </ul>
        <div class="d-flex justify-content-center">
          <a href="https://www.npmjs.com/package/vue-bootstrap-typeahead" target="_blank">
            <img class="mb-3 img-fluid" src="https://nodei.co/npm/vue-bootstrap-typeahead.png" />
          </a>
        </div>
      </div>
      <div class="col-md-6">
        <b-card class="shadow-sm" title="Demo Country Search">
          <p class="card-text">
            Type a country:
          </p>
          <vue-bootstrap-typeahead
            :data="countries"
            v-model="cntrySearch"
            :serializer="s => s.name"
            placeholder="Canada, United States, etc..."
            @hit="selectedCountry = $event"
          >
            <template slot="suggestion" slot-scope="{ data, htmlText }">
              <span v-html="htmlText"></span>&nbsp;<small>{{ data.code }}</small>
            </template>
          </vue-bootstrap-typeahead>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mt-4 mb-4">
        <b-btn to="reference" size="lg" variant="primary" class="shadow" block >
          Read the Docs
        </b-btn>
      </div>
      <div class="col-md-6 mt-4 mb-4">
        <b-btn to="examples" size="lg" variant="secondary" class="shadow" block >
          View The Example Gallery
        </b-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Getting Started</h2>
        <p class="lead">Installation</p>
        <pre v-highlight><code class="bash">$ npm install vue-bootstrap-typeahead --save</code></pre>
        <p class="lead">Registration</p>
<pre v-highlight>
<code class="javascript">import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

// Don't forget to include the Bootstrap CSS/SCSS files!
import 'bootstrap/scss/bootstrap.scss'

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// OR

// Local registration
export default {
    components: {
        VueBootstrapTypeahead
    }
}</code></pre>
        <p class="lead">Basic Usage</p>
        <p>The only required <code>props</code> are a <code>v-model</code> and a <code>data</code> array.</p>
<pre v-highlight><code class="html">&lt;vue-bootstrap-typeahead
  v-model="query"
  :data="['Canada', 'USA', 'Mexico']"
/&gt;</code></pre>
      </div>
    </div>
    <!-- <div class="row">
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
    <div class="row mb-5">
      <div class="col">
        <b-card title="Selected Address">
          <p class="card-text">
            <pre>{{ selectedAddress | stringify }}</pre>
          </p>
        </b-card>
      </div>
    </div> -->
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
