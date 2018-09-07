<template>
  <b-card class="shadow-sm" title="Demo Country Search">
    <p class="card-text">
      Type a country:
    </p>
    <vue-bootstrap-typeahead
      :data="countries"
      v-model="cntrySearch"
      :serializer="s => s.name"
      placeholder="Canada, United States, etc..."
      @hit="handleHit"
    >
      <template slot="append">
        <b-btn @click="search" variant="success">
          Go
        </b-btn>
      </template>
      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <span v-html="htmlText"></span>&nbsp;<small>{{ data.code }}</small>
      </template>
    </vue-bootstrap-typeahead>
  </b-card>
</template>

<script>
import VueBootstrapTypeahead from '../components/VueBootstrapTypeahead'

export default {
  name: 'CountrySearch',
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      cntrySearch: '',
      countries: [],
      selectedCountry: {}
    }
  },
  methods: {
    handleHit(evt) {
      this.selectedCountry = evt
      this.search()
    },
    search() {
      const a = document.createElement('a')
      a.href = `https://en.wikipedia.org/wiki/${this.cntrySearch}`
      a.target = '_blank'
      document.body.appendChild(a)
      a.click()
    }
  },
  async mounted() {
    const res = await fetch('countries.json')
    this.countries = await res.json()
  }
}

</script>

<style>

</style>
