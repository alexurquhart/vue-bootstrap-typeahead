import { shallowMount } from '@vue/test-utils'
import VueBootstrapTypeaheadListItem from '@/components/VueBootstrapTypeaheadListItem.vue'

describe('VueBootstrapTypeaheadListItem.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(VueBootstrapTypeaheadListItem)
  })

  it('Mounts and renders an <a> tag', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('Renders textVariant classes properly', async () => {
    wrapper.setProps({ textVariant: 'dark' })

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['text-dark']))
  })

  it('Renders backgroundVariant classes properly', async () => {
    wrapper.setProps({ backgroundVariant: 'light' })

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-light']))
  })

  it('Applies the active class on mouseOver', async () => {
    expect(wrapper.vm.active).toBe(false)
    wrapper.trigger('mouseover')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.active).toBe(true)
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['active']))
  })

  it('Removes the active class on mouse out', async () => {
    wrapper.trigger('mouseover')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.active).toBe(true)

    wrapper.trigger('mouseout')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.active).toBe(false)
    expect(wrapper.classes()).toEqual(expect.not.arrayContaining(['active']))
  })
})
