<template>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="col-md-3">
        <h1>Examples</h1>
        <b-nav vertical class="border-top">
          <b-nav-item v-for="link in examples"
          :key="link.link"
          :to="`${link.link}`"
          active
          >{{link.name}}</b-nav-item>
        </b-nav>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Examples',
  data() {
    return {
      examples: [
        {
          name: 'Basic Example',
          link: '/examples/basic-example'
        },
        {
          name: 'Working With API\'s',
          link: '/examples/working-with-apis'
        },
        {
          name: 'Prepending & Appending',
          link: '/examples/prepending-and-appending'
        },
        {
          name: 'Custom Suggestion Slot',
          link: '/examples/custom-suggestion-slot'
        }
      ]
    }
  }
}
</script>
