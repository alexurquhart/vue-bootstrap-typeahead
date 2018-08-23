<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>vue-bootstrap-typeahead</h1>
        <h3>Search Text: {{searchText}}</h3>
      </div>
    </div>
    <div class="bg-primary text-light row align-items-center">
      <div class="col">
        <vue-bootstrap-typeahead
          :data="countries"
          :serializer="c => c.name"
          v-model="searchText"
          size="lg"
          placeholder="Username"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueBootstrapTypeahead from './components/VueBootstrapTypeahead'

export default {
  name: 'app',
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      searchText: '',
      countries: []
    }
  },
  async mounted() {
    const res = await fetch('/countries.json')
    this.countries = await res.json()
  }
}
</script>

<style scoped>
  .bg-primary {
    height: 100px;
  }
</style>
