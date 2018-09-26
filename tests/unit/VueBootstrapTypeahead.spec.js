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

  it('Uses a custom serializer properly', () => {
    wrapper.setProps({
      data: [{
        name: 'Canada',
        code: 'CA'
      }],
      value: 'Can',
      serializer: t => t.name
    })
    expect(wrapper.vm.formattedData[0].id).toBe(0)
    expect(wrapper.vm.formattedData[0].data.code).toBe('CA')
    expect(wrapper.vm.formattedData[0].text).toBe('Canada')
  })

  it('Show the list when given a query and focused', () => {
    let child = wrapper.find(VueBootstrapTypeaheadList)
    wrapper.find('input').setValue('Can')
    expect(child.isVisible()).toBe(false)
    wrapper.find('input').trigger('focus')
    expect(child.isVisible()).toBe(true)
  })

  it('Hides the list when blurred', () => {
    let child = wrapper.find(VueBootstrapTypeaheadList)
    wrapper.setData({inputValue: 'Can'})
    wrapper.find('input').trigger('focus')
    expect(child.isVisible()).toBe(true)
    wrapper.find('input').trigger('blur')
    expect(child.isVisible()).toBe(false)
  })

  it('Renders the list in different sizes', () => {
    expect(wrapper.vm.sizeClasses).toBe('input-group')
    wrapper.setProps({
      size: 'lg'
    })
    expect(wrapper.vm.sizeClasses).toBe('input-group input-group-lg')
  })
})
