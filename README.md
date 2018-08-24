# vue-bootstrap-typeahead

A simple `list-group` based typeahead using Bootstrap 4 and Vue 2

## Installation

```
> npm i vue-bootstrap-typeahead --save
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

Basic Usage

```javascript
<vue-bootstrap-typeahead 
  v-model="query"
  :data="['Canada', 'USA', 'Mexico']"
/>
```

## Attributes

Name | Type | Default | Description
--- | --- | --- | ---
data | `Array` | `null` | Array of data to be available for querying. **Required**
serializer | `Function` | `input => input` | Function used to convert the entries in the `data` array into a text string.
size | `String` | `null` | Size of the `input-group`. Valid values: `sm` or `lg`
backgroundVariant | `String` | `null` | Background color for the autocomplete result `list-group` items. [See valid values](http://getbootstrap.com/docs/4.1/utilities/colors/#background-color)
textVariant | `String` | `null` | Text color for the autocomplete result `list-group` items. [See valid values](http://getbootstrap.com/docs/4.1/utilities/colors/#color)
inputClass | `String` | `null` | Class to the added to the `input` tag for validation, etc.
maxMatches | `Number` | 10 | Maximum amount of list items to appear.
minMatchingChars | `Number` | 2 | Minimum matching characters in query before the typeahead list appears
prepend | `String` | `null` | Text to be prepended to the `input-group`
append | `String` | `null` | Text to be appended to the `input-group`

## Events
Name | Description
--- | ---
`hit` | Triggered when an autocomplete item is selected. The entry in the input `data` array that was selected is returned.
`input` | The component can be used with `v-model`

## Slots

There are `prepend` and `append` slots available for adding buttons or other markup.

## Contributing

TODO