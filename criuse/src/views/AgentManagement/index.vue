<template>
  <div class="AgentManagement">
    <header class="header">
      <div class="navbtn">
        <i class="icon-navicon"
           @click="handleSideBarShow"></i>
      </div>
      <div class="logo">
        <img :src="header.logo.imgSrc"
             :alt="header.logo.name">
      </div>
      <div class="user">
        <img :src="header.user.imgSrc"
             alt="user">
        <i class="icon-angle-down"
           :class="{ active: header.user.dropDownListShow }"
           @click="handleDropDowmListShow"></i>
        <transition name="fade">
          <ul class="dropDownList"
              v-if="header.user.dropDownListShow">
            <li v-for="(item, index) in header.user.dropDownList"
                :key="index">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </transition>
      </div>
    </header>
    <section class="main">
      <aside class="sideBar"
             :class="{ active: main.sideBar.nav.active }">
        <i class="icon-close"
           @click="handleSideBarHide"></i>
        <div class="nav">
          <NavComp :data="main.sideBar.nav.data"></NavComp>
        </div>
        <div class="history">
          <HistoryListComp :data="main.sideBar.history.data"></HistoryListComp>
        </div>
      </aside>
      <section class="content">
        <div class="statusBar">
          <StatusCardComp v-for="(item, index) in main.statusBar.statusCardList"
                          :key="index"
                          :title="item.title"
                          :num="item.num"></StatusCardComp>
          <div class="typeBox">
            <div v-for="(item, index) in main.statusBar.typeList"
                 :key="index"
                 :class="item.title">
              <div class="title">{{ item.title.toUpperCase() }}</div>
              <div class="num">{{ item.data.length }}</div>
            </div>
          </div>
        </div>
        <div class="tabsBar">
          <div class="typeTabs">
            <span v-for="(item, index) in main.tabsBar.typeTabs"
                  :key="index"
                  @click="handleTypeTabsChange(index)"
                  :class="{ active: index === main.tabsBar.currentTypeIndex }">
              {{ item }}
            </span>
          </div>
          <div class="search">
            <i class="icon-search"></i>
            <input type="text">
          </div>
          <div class="listLayoutTabs">
            <i v-for="item in main.tabsBar.listLayoutTabs"
               :key="item"
               :class="[`icon-th-${item}`, {
                 active: item === main.tabsBar.currentListLayout
               }]"></i>
          </div>
          <div class="addAgentBtn">
            <button @click="handleAddAgent">
              <i class="icon-plus"></i>
              <span>Add Agent</span>
            </button>
            <PopoverComp ref="addAgentPopComp" :option="{ width: 600, height: 400 }">
              <div slot="content">
                <ul>
                  <li v-for="(item, index) in main.tabsBar.addAgentFormList"
                      :key="index">
                    <label class="name" for="agentName">{{ item.name }}</label>
                    <input :id="item.id" v-if="item.type === 'text'" type="text" v-model="item.value" :placeholder="item.placeholder">
                    <select v-else-if="item.type === 'select'" :name="item.name" :id="item.id" v-model="item.value">
                      <option value="windows">windows</option>
                      <option value="test">test</option>
                    </select>
                    <div v-else-if="item.type === 'radio'">
                      <input type="radio" :name="item.name" v-model="item.value">
                      <span>Physical</span>
                      <input type="radio" :name="item.name" v-model="item.value">
                      <span>Virtual</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div slot="footer">
                <button class="add"
                        @click="confirmAddResources(item)">Add resources</button>
                <button class="cancel"
                        @click="handlePopHide(index)">Cancel</button>
              </div>
            </PopoverComp>
          </div>
        </div>
        <div class="list">
          <ul>
            <transition-group name="fade"
                              tag="ul">
              <li v-for="(item, index) in main.list.data"
                  :key="item.id"
                  :class="item.status">
                <ListItemComp :data="item"
                              @handleItemDeleteResource="handleItemDeleteResource"
                              @handleItemAddResource="handleItemAddResource(index)"></ListItemComp>
                <transition name="fade">
                  <PopoverComp v-if="index === main.list.currentListItemIndex"
                               :ref="`popoverComp${index}`">
                    <div slot="content">
                      <div class="title">Separate multiple resource name with commas</div>
                      <input type="text"
                             v-model="main.list.newResources"
                             placeholder="e.g. Chrome,Firefox">
                    </div>
                    <div slot="footer">
                      <button class="add"
                              @click="confirmAddResources(item)">Add resources</button>
                      <button class="cancel"
                              @click="handlePopHide(index)">Cancel</button>
                    </div>
                  </PopoverComp>
                </transition>
              </li>
            </transition-group>
          </ul>
        </div>
      </section>
    </section>
    <footer class="footer">
      © Copyright 2017 <span style='font-weight: bold;'>Thought</span>Works
    </footer>
  </div>
</template>

<script>
import NavComp from './comps/Nav'
import HistoryListComp from './comps/HistoryList'
import ListItemComp from './comps/ListItem'
import StatusCardComp from './comps/StatusCard'
import PopoverComp from '@/components/Popover'
import { queryAgentsList, updateAgent, addAgent } from '@/apis/AgentManagement'
export default {
  name: 'AgentManagement',
  data () {
    return {
      header: {
        logo: {
          name: 'Cruise',
          imgSrc: require('../../assets/logo/logo.svg')
        },
        user: {
          imgSrc: require('../../assets/logo/avatar.jpg'),
          dropDownListShow: false,
          dropDownList: [
            {
              name: 'Profile',
              icon: 'icon-id-card'
            },
            {
              name: 'Sign Out',
              icon: 'icon-sign-in'
            }
          ]
        }
      },
      main: {
        sideBar: {
          nav: {
            active: false,
            data: [
              {
                name: 'DASHBOARD',
                icon: 'icon-dashboard'
              },
              {
                name: 'AGENT',
                icon: 'icon-sitemap'
              },
              {
                name: 'MY CRUISE',
                icon: 'icon-boat'
              },
              {
                name: 'HELP',
                icon: 'icon-life-bouy'
              }
            ]
          },
          history: {
            data: [
              {
                name: 'bjstdmngbgr02/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr03/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr04/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr05/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr06/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr07/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr08/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr09/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr11/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr12/Acceptance_test'
              },
              {
                name: 'bjstdmngbgr13/Acceptance_test'
              }
            ]
          }
        },
        statusBar: {
          statusCardList: [
            {
              title: 'Building',
              num: 0
            },
            {
              title: 'Idle',
              num: 0
            }
          ],
          typeList: [
            {
              title: 'all',
              data: []
            },
            {
              title: 'physical',
              data: []
            },
            {
              title: 'virtual',
              data: []
            }
          ]
        },
        tabsBar: {
          currentTypeIndex: 0,
          typeTabs: ['All', 'Physical', 'Virtual'],
          currentListLayout: 'list',
          listLayoutTabs: ['card', 'list'],
          addAgentFormList: [
            {
              name: 'NAME',
              id: 'agentName',
              type: 'text',
              value: '',
              placeholder: 'name'
            },
            {
              name: 'IP',
              id: 'agentIp',
              type: 'text',
              value: '',
              placeholder: 'ip'
            },
            {
              name: 'OS',
              id: 'os',
              type: 'select',
              value: 'windows'
            },
            {
              name: 'TYPE',
              id: 'type',
              type: 'radio',
              value: ''
            }
          ]
        },
        list: {
          currentListItemIndex: -1,
          newResources: '',
          data: []
          // data: [
          //   {
          //     'name': 'bjstdmngbdr08.thoughtworks.com',
          //     'os': 'windows',
          //     'status': 'building',
          //     'type': 'virtual',
          //     'ip': '192.168.1.80',
          //     'location': '/var/lib/cruise-agent',
          //     'resources': [
          //       'Safari',
          //       'Chrome',
          //       'Firefox'
          //     ],
          //     'id': 1
          //   },
          //   {
          //     'name': 'bjstdmngbdr15.thoughtworks.com',
          //     'os': 'suse',
          //     'status': 'idle',
          //     'type': 'physical',
          //     'ip': '192.168.1.110',
          //     'location': '/var/lib/cruise-agent',
          //     'resources': [
          //       'Safari',
          //       'Chrome',
          //       'test1',
          //       'test2'
          //     ],
          //     'id': 5
          //   }
          // ]
        }
      }
    }
  },
  mounted () {
    this.getAgentsList()
  },
  methods: {
    /**
     * 获取 AgentsList
     */
    async getAgentsList () {
      let res = await queryAgentsList()
      // console.log(res)
      this.cacheListData(res)
      this.setListData()
      this.setStatusNum(res)
    },
    /**
     * 修改一条 Agent 对象的数据
     * @param {Object} agentObj
     */
    async updateAgent (agentObj) {
      await updateAgent(agentObj)
      this.getAgentsList()
    },
    /**
     * 新增一条 Agent 对象的数据
     * @param {Object} agentObj
     */
    async addAgent (agentObj) {
      await addAgent(agentObj)
    },
    /**
     * 缓存接口获取到的数据列表
     * @param {Array} listData 接口获取到的数据
     */
    cacheListData (listData = []) {
      this.main.statusBar.typeList[0].data = listData
      this.main.statusBar.typeList[1].data = listData.filter(item => item.type === 'physical')
      this.main.statusBar.typeList[2].data = listData.filter(item => item.type === 'virtual')
    },
    /**
     * 设置 agentList 数据
     * @param {Number} currTypeIndex 当前选中的 type 的索引
     */
    setListData (currTypeIndex = this.main.tabsBar.currentTypeIndex) {
      this.main.list.data = []
      setTimeout(() => {
        this.main.list.data = this.main.statusBar.typeList[currTypeIndex].data
      }, 200)
    },
    /**
     * 设置每种状态下的数据条数
     * @param {Array} listData 接口获取到的数据
     */
    setStatusNum (listData = []) {
      let buildingNum = listData.filter(item => item.status === 'building').length
      let idleNum = listData.filter(item => item.status === 'idle').length
      this.main.statusBar.statusCardList[0].num = buildingNum
      this.main.statusBar.statusCardList[1].num = idleNum
    },
    /**
     * 点击切换类型选项卡
     * @param {Number} typeIndex
     */
    handleTypeTabsChange (typeIndex) {
      this.main.tabsBar.currentTypeIndex = typeIndex
      this.setListData(typeIndex)
    },
    /**
     * 点击新增列表项资源
     * @param {Number} listItemIndex
     */
    handleItemAddResource (listItemIndex) {
      this.main.list.currentListItemIndex = listItemIndex
      this.$nextTick(() => {
        this.handlePopShow(listItemIndex)
      })
    },
    /**
     * 点击删除列表项资源
     * @param {Object} data 删除对应的列表项
     */
    handleItemDeleteResource (data) {
      this.updateAgent(data)
    },
    /**
     * 点击提交新增列表项资源
     * @param {Object} data 新增对应的列表项
     */
    confirmAddResources (data) {
      let newResourcesArr = this.main.list.newResources.split(',').filter(item => item !== '')
      let newData = Object.assign(
        {},
        data,
        {
          resources: [...data.resources, ...newResourcesArr]
        }
      )
      this.updateAgent(newData)
      this.main.list.newResources = ''
    },
    handleAddAgent () {
      this.handleAddAgentPopShow()
    },
    handleAddAgentPopShow () {
      this.$refs.addAgentPopComp.handlePopShow()
    },
    /**
     * 点击显示弹出框
     * @param {Number} index 弹出框组件索引
     */
    handlePopShow (index) {
      this.$refs[`popoverComp${index}`][0].handlePopShow()
    },
    /**
     * 点击隐藏弹出框
     * @param {Number} index 弹出框组件索引
     */
    handlePopHide (index) {
      this.main.list.newResources = ''
      this.$refs[`popoverComp${index}`][0].handlePopHide()
    },
    /**
     * 显示侧边栏
     */
    handleSideBarShow () {
      this.main.sideBar.nav.active = true
    },
    /**
     * 隐藏侧边栏
     */
    handleSideBarHide () {
      this.main.sideBar.nav.active = false
    },
    /**
     * 显示用户下拉菜单
     */
    handleDropDowmListShow () {
      this.header.user.dropDownListShow = !this.header.user.dropDownListShow
    }
  },
  components: {
    NavComp,
    HistoryListComp,
    ListItemComp,
    StatusCardComp,
    PopoverComp
  }
}
</script>

<style lang='postcss'>
</style>
