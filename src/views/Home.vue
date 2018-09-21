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
        <country-search />
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
        <p class="lead">Minified UMD and CommonJS builds are available in the <code>dist</code> folder. The component is also available on unpkg.</p>
        <pre v-highlight><code class="html">
&lt;link href="https://unpkg.com/vue-bootstrap-typeahead/dist/VueBootstrapTypeahead.css" rel="stylesheet"&gt;
&lt;script src="https://unpkg.com/vue-bootstrap-typeahead"&gt;&lt;/script&gt;</code></pre>

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
import CountrySearch from '../examples/CountrySearch'

export default {
  name: 'Home',
  components: {
    CountrySearch
  }
}
</script>

<style scoped>
  .row {
    padding-top: 1rem;
  }
</style>
