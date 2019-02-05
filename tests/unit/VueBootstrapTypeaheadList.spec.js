import { mount } from '@vue/test-utils'
import VueBootstrapTypeaheadList from '@/components/VueBootstrapTypeaheadList.vue'
import VueBootstrapTypeaheadListItem from '@/components/VueBootstrapTypeaheadListItem.vue'

describe('VueBootstrapTypeaheadList', () => {
  let wrapper

  const demoData = [
    {
      id: 0,
      data: 'Canada',
      text: 'Canada'
    },
    {
      id: 1,
      data: 'USA',
      text: 'USA'
    },
    {
      id: 2,
      data: 'Mexico',
      text: 'Mexico'
    },
    {
      id: 3,
      data: 'Canadiana',
      text: 'Canadiana'
    }
  ]

  beforeEach(() => {
    wrapper = mount(VueBootstrapTypeaheadList, {
      propsData: {
        data: demoData
      }
    })
  })

  it('Mounts and renders a list-group div', () => {
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.classes()).toContain('list-group')
  })

  it('Matches items when there is a query', () => {
    expect(wrapper.vm.matchedItems.length).toBe(0)
    wrapper.setProps({
      query: 'Can'
    })
    expect(wrapper.vm.matchedItems.length).toBe(2)
    expect(wrapper.findAll(VueBootstrapTypeaheadListItem).length).toBe(2)
    wrapper.setProps({
      query: 'Canada'
    })
    expect(wrapper.vm.matchedItems.length).toBe(1)
    expect(wrapper.findAll(VueBootstrapTypeaheadListItem).length).toBe(1)
  })

  it('Limits the number of matches with maxMatches', () => {
    wrapper.setProps({
      query: 'can'
    })
    expect(wrapper.vm.matchedItems.length).toBe(2)
    wrapper.setProps({
      maxMatches: 1
    })
    expect(wrapper.vm.matchedItems.length).toBe(1)
  })

  it('Uses minMatchingChars to filter the number of matches', () => {
    wrapper.setProps({
      query: 'c',
      minMatchingChars: 1
    })
    expect(wrapper.findAll(VueBootstrapTypeaheadListItem).length).toBe(3)
  })

  it('Highlights text matches properly', () => {
    wrapper.setProps({
      query: 'Canada'
    })
    expect(wrapper.find(VueBootstrapTypeaheadListItem).vm.htmlText).toBe('<strong>Canada</strong>')
  })
})
