<template>
  <div class="container" id="app">
    <b-navbar type="dark" variant="primary" toggleable>
      <b-navbar-brand to="/">vue-bootstrap-typeahead</b-navbar-brand>
      <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_dropdown_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text>
            <a class="github-button" href="https://github.com/alexurquhart/vue-bootstrap-typeahead" data-size="large" data-show-count="true" aria-label="Star alexurquhart/vue-bootstrap-typeahead on GitHub">Star</a>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>
