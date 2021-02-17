import { mount } from '@vue/test-utils'
import VueBootstrapTypeahead from '@/components/VueBootstrapTypeahead.vue'
import VueBootstrapTypeaheadList from '@/components/VueBootstrapTypeaheadList.vue'

describe('VueBootstrapTypeahead', () => {
  let wrapper

  const demoData = [
    'Canada',
    'United States',
    'Mexico',
    'Japan',
    'China',
    'United Kingdom'
  ]

  beforeEach(() => {
    wrapper = mount(VueBootstrapTypeahead, {
      propsData: {
        data: demoData
      }
    })
  })

  it('Should mount and render a hidden typeahead list', () => {
    let child = wrapper.find(VueBootstrapTypeaheadList)
    expect(child).toBeTruthy()
    expect(child.isVisible()).toBe(false)
  })

  it('Formats the input data properly', () => {
    expect(wrapper.vm.formattedData[0].id).toBe(0)
    expect(wrapper.vm.formattedData[0].data).toBe('Canada')
    expect(wrapper.vm.formattedData[0].text).toBe('Canada')
  })

  it('Uses a custom serializer properly', async () => {
    wrapper.setProps({
      data: [{
        name: 'Canada',
        code: 'CA'
      }],
      value: 'Can',
      serializer: t => t.name
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.formattedData[0].id).toBe(0)
    expect(wrapper.vm.formattedData[0].data.code).toBe('CA')
    expect(wrapper.vm.formattedData[0].text).toBe('Canada')
  })

  it('Show the list when given a query and focused', async () => {
    let child = wrapper.find(VueBootstrapTypeaheadList)
    wrapper.find('input').setValue('Can')

    await wrapper.vm.$nextTick()
    expect(child.isVisible()).toBe(false)

    wrapper.find('input').trigger('focus')

    await wrapper.vm.$nextTick()
    expect(child.isVisible()).toBe(true)
  })

  it('Hides the list when blurred', async () => {
    let child = wrapper.find(VueBootstrapTypeaheadList)
    wrapper.setData({ inputValue: 'Can' })
    wrapper.find('input').trigger('focus')

    await wrapper.vm.$nextTick()
    expect(child.isVisible()).toBe(true)

    wrapper.find('input').trigger('blur')

    await wrapper.vm.$nextTick()
    expect(child.isVisible()).toBe(false)
  })

  it('Renders the list in different sizes', async () => {
    expect(wrapper.vm.sizeClasses).toBe('input-group')
    wrapper.setProps({
      size: 'lg'
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.sizeClasses).toBe('input-group input-group-lg')
  })

  it('emit enter', async () => {
    wrapper.setData({ inputValue: 'emit enter' })
    await wrapper.find('input').trigger('keyup.enter')
    expect(wrapper.emitted().enter).toBeTruthy()
  })
})
