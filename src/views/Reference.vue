<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="display-4">Reference</h1>

        <h2>Props</h2>

        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </thead>
            <tbody>
              <tr>
                <td><code>data</code></td>
                <td>Array</td>
                <td></td>
                <td>Array of data to be available for querying. **Required**</td>
              </tr>
              <tr>
                <td><code>serializer</code></td>
                <td>Function</td>
                <td><code>input => input</code></td>
                <td>Function used to convert the entries in the <code>data</code> array into a text string.</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td>String</td>
                <td></td>
                <td>Size of the <code>input-group</code>. Valid values: <code>sm</code> or <code>lg</code></td>
              </tr>
              <tr>
                <td><code>backgroundVariant</code></td>
                <td>String</td>
                <td></td>
                <td>Background color for the autocomplete result <code>list-group</code> items. <a href="http://getbootstrap.com/docs/4.1/utilities/colors/#background-color" target="_blank">See valid values</a></td>
              </tr>
              <tr>
                <td><code>textVariant</code></td>
                <td>String</td>
                <td></td>
                <td>Text color for the autocomplete result <code>list-group</code> items. <a href="http://getbootstrap.com/docs/4.1/utilities/colors/#color" target="_blank">See valid values</a></td>
              </tr>
              <tr>
                <td><code>inputClass</code></td>
                <td>String</td>
                <td></td>
                <td>Class to the added to the <code>input</code> tag for validation, etc.</td>
              </tr>
              <tr>
                <td><code>maxMatches</code></td>
                <td>Number</td>
                <td>10</td>
                <td>Maximum amount of list items to appear.</td>
              </tr>
              <tr>
                <td><code>minMatchingChars</code></td>
                <td>Number</td>
                <td>2</td>
                <td>Minimum matching characters in query before the typeahead list appears</td>
              </tr>
              <tr>
                <td><code>prepend</code></td>
                <td>String</td>
                <td></td>
                <td>Text to be prepended to the <code>input-group</code></td>
              </tr>
              <tr>
                <td><code>append</code></td>
                <td>String</td>
                <td></td>
                <td>Text to be appended to the <code>input-group</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Events</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>hit</code></td>
                <td>Triggered when an autocomplete item is selected. The entry in the input data array that was selected is returned.</td>
              </tr>
              <tr>
                <td><code>input</code></td>
                <td>The component can be used with <code>v-model</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Slots</h2>
        <p>There are <code>prepend</code> and <code>append</code> slots available for adding buttons or other markup. Overrides the prepend and append props.</p>

        <h2>Scoped Slot</h2>
        <p>
          You can use a <a href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank">scoped slot</a> called <code>suggestion</code>
          to define custom content for the suggestion <code>list-item</code>'s. You can use bound variables <code>data</code>, which holds the data from the
          input array, and <code>htmlText</code>, which is the highlighted text that is used for the suggestion.
        </p>
        <p>
          See the <router-link to="examples/custom-suggestion-slot">custom suggestion slot example</router-link> for more info.
        </p>
      </div>
    </div>
  </div>
</template>
