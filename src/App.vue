<template>
  <div id="app">
    <b-navbar type="dark" variant="gradient-primary" toggleable>
      <b-navbar-brand to="/">vue-bootstrap-typeahead</b-navbar-brand>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/reference">Reference</b-nav-item>
          <b-nav-item to="/examples">Examples</b-nav-item>
          <b-nav-item href="https://github.com/alexurquhart/vue-bootstrap-typeahead" target="_blank">GitHub</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text>
            <a class="github-button" href="https://github.com/alexurquhart/vue-bootstrap-typeahead" data-size="large" data-show-count="true" aria-label="Star alexurquhart/vue-bootstrap-typeahead on GitHub">Star</a>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <div class="container">
      <div class="row mt-4 border-top justify-content-center">
        <div class="col pt-4 pb-4">
          <p class="small text-muted text-center">
            Made by <a href="https://alexurquhart.com" target="_blank">Alex Urquhart</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App'
}
</script>

<style lang="scss">
$enable-gradients: true;

@import 'bootstrap/scss/bootstrap.scss';

pre {
  border: 1px solid $border-color;
  border-radius: $border-radius-lg;
  padding-left: 1rem;
  padding-right: 1rem;
  @extend .shadow-sm;
}
</style>
