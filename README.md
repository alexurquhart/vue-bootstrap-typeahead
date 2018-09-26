# vue-bootstrap-typeahead

[![NPM](https://nodei.co/npm/vue-bootstrap-typeahead.png)](https://www.npmjs.com/package/vue-bootstrap-typeahead)

[![Build Status](https://travis-ci.org/alexurquhart/vue-bootstrap-typeahead.svg?branch=master)](https://travis-ci.org/alexurquhart/vue-bootstrap-typeahead)
[![Coverage Status](https://coveralls.io/repos/github/alexurquhart/vue-bootstrap-typeahead/badge.svg?branch=master)](https://coveralls.io/github/alexurquhart/vue-bootstrap-typeahead?branch=master)
[![npm](https://img.shields.io/npm/dm/vue-bootstrap-typeahead.svg)](https://www.npmjs.com/package/vue-bootstrap-typeahead)
[![GitHub license](https://img.shields.io/github/license/alexurquhart/vue-bootstrap-typeahead.svg)](https://github.com/alexurquhart/vue-bootstrap-typeahead/blob/master/LICENSE.txt)

A simple `list-group` based typeahead/autocomplete using Bootstrap 4 and Vue 2

<img src="https://raw.githubusercontent.com/alexurquhart/vue-bootstrap-typeahead/master/assets/screenshot.png" alt="Preview image of the vue-bootstrap-typeahead component">

## [View The Examples](https://alexurquhart.github.io/vue-bootstrap-typeahead/#/examples)

## Installation

From NPM:

```
> npm i vue-bootstrap-typeahead --save
```

Minified UMD and CommonJS builds are available in the 'dist' folder. The component is also available for use in the browser directly on unpkg:

```html
<link href="https://unpkg.com/vue-bootstrap-typeahead/dist/VueBootstrapTypeahead.css" rel="stylesheet">
<script src="https://unpkg.com/vue-bootstrap-typeahead"></script>
```

## Usage

Import and register the component
```javascript
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// OR

// Local registration
export default {
    components: {
        VueBootstrapTypeahead
    }
}
```

### Basic Usage
The only required attribute is a `data` array.

```html
<vue-bootstrap-typeahead 
  v-model="query"
  :data="['Canada', 'USA', 'Mexico']"
/>
```

### Working with API's

The typeahead does not fetch any data, for maximum flexibility it will only work with already loaded API responses in the form of arrays. The `serializer` attribute allows you to define a function to turn each array item in the response into a text string, which will appear in the results.

```html
<template>
  <vue-bootstrap-typeahead
    :data="addresses"
    v-model="addressSearch"
    size="lg"
    :serializer="s => s.text"
    placeholder="Type an address..."
    @hit="selectedAddress = $event"
  >
</template>

<script>
import _ from 'underscore'

const API_URL = 'https://api-url-here.com?query=:query'

export default {
  name: 'TestComponent',

  data() {
    return {
      addresses: [],
      addressSearch: '',
      selectedAddress: null
    }
  },

  methods: {
    async getAddresses(query) {
      const res = await fetch(API_URL.replace(':query', query))
      const suggestions = await res.json()
      this.addresses = suggestions.suggestions
    }
  },

  watch: {
    addressSearch: _.debounce(function(addr) { this.getAddresses(addr) }, 500)
  }
}
</script>

```

### Attributes

Name | Type | Default | Description
--- | --- | --- | ---
data | `Array` | | Array of data to be available for querying. **Required**
serializer | `Function` | `input => input` | Function used to convert the entries in the `data` array into a text string.
size | `String` | | Size of the `input-group`. Valid values: `sm` or `lg`
backgroundVariant | `String` | | Background color for the autocomplete result `list-group` items. [See valid values](http://getbootstrap.com/docs/4.1/utilities/colors/#background-color)
textVariant | `String` | | Text color for the autocomplete result `list-group` items. [See valid values](http://getbootstrap.com/docs/4.1/utilities/colors/#color)
inputClass | `String` | | Class to the added to the `input` tag for validation, etc.
maxMatches | `Number` | 10 | Maximum amount of list items to appear.
minMatchingChars | `Number` | 2 | Minimum matching characters in query before the typeahead list appears
prepend | `String` | | Text to be prepended to the `input-group`
append | `String` | | Text to be appended to the `input-group`

### Events
Name | Description
--- | ---
`hit` | Triggered when an autocomplete item is selected. The entry in the input `data` array that was selected is returned.
`input` | The component can be used with `v-model`

### Slots

There are `prepend` and `append` slots available for adding buttons or other markup. Overrides the `prepend` and `append` attributes.

### Scoped Slots

You can use a [scoped slot](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) called `suggestion` to define custom content
for the suggestion `list-item`'s

```html
<vue-bootstrap-typeahead
  :data="countries"
  v-model="cntrySearch"
  :serializer="s => s.name"
  placeholder="Canada, United States, etc..."
  @hit="selectedCountry = $event"
>
  <!-- htmlText is bound to the matched text derived from the serializer function -->
  <!-- data is bound to the matching array element in the data prop -->
  <template slot="suggestion" slot-scope="{ data, htmlText }">
    <span v-html="htmlText"></span>&nbsp;<small>{{ data.code }}</small>
  </template>
</vue-bootstrap-typeahead>
```

## Local Examples/Demo

Clone this repository and run `npm run serve` and navigate to http://localhost:8080 to launch the documentation. The source is in `src/views/Home.vue`

You can also view and edit examples hosted on CodePen [here](https://alexurquhart.github.io/vue-bootstrap-typeahead/#/examples)

## Contributing

Please note that active development is done on the `Development` branch. PR's are welcome!

## Contributing

Please note that active development is done on the `Development` branch. PR's are welcome!

## Sites using this component

- [plottr.io](https://plottr.io) - Plan and map your running/cycling routes. This component is an offshoot from this project.

Send a pull request to add your site to this list!
