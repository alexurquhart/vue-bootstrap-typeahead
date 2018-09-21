import { shallowMount } from '@vue/test-utils'
import VueBootstrapTypeaheadList from '@/components/VueBootstrapTypeaheadList.vue'

describe('VueBootstrapTypeaheadList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(VueBootstrapTypeaheadList, {
      propsData: {
        data: []
      }
    })
  })

  it('Mounts and renders a div', () => {
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('list-group')
  })
})
