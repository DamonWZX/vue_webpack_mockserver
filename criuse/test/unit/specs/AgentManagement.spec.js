import {
  mount
} from '@vue/test-utils'
import AgentManagement from '@/views/AgentManagement/index.vue'

describe('AgentManagement/index.vue', () => {
  it('当点击列表项中的删除资源按钮，点击的资源应当被删除', () => {
    const wrapper = mount(AgentManagement)
    const buttonOfdeleteResource = wrapper.find('.main .list .listItem i.icon-trash')
    const countOfListItem0Resources = wrapper.vm.main.list.data[0].resources.length
    buttonOfdeleteResource.trigger('click')
    const countOfListItem0ResourcesAfterDelete = wrapper.vm.main.list.data[0].resources.length
    expect(countOfListItem0ResourcesAfterDelete).to.be.equal(countOfListItem0Resources - 1)
  })
  it('当点击列表项中的添加资源按钮，应弹出对话框', () => {
    const wrapper = mount(AgentManagement)
    const buttonOfAddResource = wrapper.find('.main .list .listItem .addBtn')
    buttonOfAddResource.trigger('click')
    expect(wrapper.vm.main.list.currentListItemIndex).to.be.equal(0)
  })
})
