<template>
  <div id="wrapper">
    <h1>Arrow Keys Example</h1>
    <div>
      <p class="lead">
        Selected Country: <strong>{{query}}</strong>
      </p>
      <vue-bootstrap-typeahead
        v-model="query"
        :data="countries"
        placeholder="Enter a country"
      />
    </div>
  </div>
</template>

<script>
  import VueBootstrapTypeahead from '@/components/VueBootstrapTypeahead';

  export default {
    components: {
      VueBootstrapTypeahead
    },
    data() {
      return {
        query: '',
        countries: [
          'Argentina',
          'Armenia',
          'Bahamas',
          'Bahrain',
          'Bangladesh',
          'Barbados',
          'Belarus',
          'Belize',
          'Benin',
          'Cambodia',
          'Cameroon',
          'Canada',
          'Ukraine',
          'United Arab Emirates',
          'United Kingdom',
          'United States',
          'Mauritius',
          'Mauritania',
          'Mexico',
          'Monaco',
          'Mongolia',
          'Montenegro'
        ]
      }
    },
    methods: {
    },
    watch: {
    },
    filters: {
      stringify(value) {
        return JSON.stringify(value, null, 2)
      }
    },
  }
</script>

<style>
</style>
