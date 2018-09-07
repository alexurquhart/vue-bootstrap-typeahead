import { shallowMount } from '@vue/test-utils'
import VueBootstrapTypeaheadListItem from '@/components/VueBootstrapTypeaheadListItem.vue'

describe('VueBootstrapTypeaheadListItem.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(VueBootstrapTypeaheadListItem)
  })

  it('Mounts and renders an <a> tag', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.contains('a')).toBe(true)
  })

  it('Renders textVariant classes properly', () => {
    wrapper.setProps({textVariant: 'dark'})
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['text-dark']))
  })

  it('Renders backgroundVariant classes properly', () => {
    wrapper.setProps({backgroundVariant: 'light'})
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-light']))
  })

  it('Renders active class properly', () => {
    wrapper.setProps({active: true})
    expect(wrapper.vm.active).toBe(true)
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['active']))
  })
})
