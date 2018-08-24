<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>vue-bootstrap-typeahead</h1>
        <h3>Search Text: {{cntrySearch}}</h3>
      </div>
    </div>
    <div class="bg-dark text-light row align-items-center">
      <div class="col">
        <vue-bootstrap-typeahead
          :data="countries"
          :serializer="c => c.name"
          v-model="cntrySearch"
          size="lg"
          placeholder="Select a country..."
          @hit="handleHit"
        />
      </div>
    </div>
    <div class="row">
      <div class="col card">
        <h5 class="card-title">Selected Object</h5>
        <div class="card-body">
          <pre>{{ selectedCountry | stringify }}</pre>
        </div>
      </div>
    </div>
    <div class="bg-primary text-light row align-items-center">
      <div class="col">
        <vue-bootstrap-typeahead
          :data="addresses"
          v-model="addressSearch"
          size="lg"
          :serializer="s => s.text"
          placeholder="Type an address..."
          @hit="selectedAddress = $event"
        />
      </div>
    </div>
    <div class="row">
      <div class="col card">
        <h5 class="card-title">Selected Object</h5>
        <div class="card-body">
          <pre>{{ selectedAddress | stringify }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Modified from https://davidwalsh.name/javascript-debounce-function
 *
 * @export
 * @param {Function} func Function to be debounced
 * @param {Number} wait Number of ms to wait
 * @param {Boolean} immediate whether to invoke immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const API_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&maxSuggestions=5&text=:keyword'

import VueBootstrapTypeahead from './components/VueBootstrapTypeahead'

export default {
  name: 'app',
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
      console.log(this.addresses)
    }
  },

  watch: {
    addressSearch: debounce(function(addr) { this.getAddresses(addr) }, 500)
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
  .bg-dark {
    height: 130px;
  }
</style>
