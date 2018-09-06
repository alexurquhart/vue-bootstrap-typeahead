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

  it('Applies the active class on mouseOver', () => {
    expect(wrapper.vm.active).toBe(false)
    wrapper.trigger('mouseover')
    expect(wrapper.vm.active).toBe(true)
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['active']))
  })

  it('Removes the active class on mouse out', () => {
    wrapper.trigger('mouseover')
    expect(wrapper.vm.active).toBe(true)
    wrapper.trigger('mouseout')
    expect(wrapper.vm.active).toBe(false)
    expect(wrapper.classes()).toEqual(expect.not.arrayContaining(['active']))
  })
})
