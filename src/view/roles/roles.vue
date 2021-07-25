<template>
  <div>
    <Row>
      <!-- 左侧部分 -->
      <Col span="16" style="height:100%">
        <!-- 上半部分-------------------------- -->
        <Card>
          <p slot="title">
            <Icon type="ios-person"></Icon>
            Roles
          </p>
          <!-- 按钮栏 -->
          <Row>
            <!-- 添加按钮、编辑按钮等 -->
            <Col span="18">
              <Button icon="md-add" @click="addRoleModalVisible = true">Add</Button>

              <Button icon="md-refresh" @click="getRole()">Refresh</Button>
            </Col>
            <!-- 过滤按钮 -->
            <Col span="6" style="text-align:right"><Button>>> Filter</Button></Col>
          </Row>
          <Table
            :columns="roleColumns"
            :data="roleList"
            highlight-row
            @on-current-change="roleCurrentSelected"
          >
          </Table>
          <Page :total="pageInfo.total" show-total style="text-align:center" />
        </Card>
        <!-- 下半部分-------------------------- -->
        <Card>
          <Tabs value="tabSelected" @on-click="clickPanes">
            <TabPane label="Description" name="0" icon="ios-alert">
              <Table
                row-key="id"
                :columns="descriptionColumns"
                :data="descriptionData"
                border
              ></Table>
            </TabPane>
            <!-- permission -->
            <TabPane label="Permissons" name="1" icon="ios-checkmark-circle">
              <Button icon="md-add">Add</Button>
              <Button icon="md-delete">Revoke</Button>
              <Button icon="md-refresh">Refresh</Button>

              <Table :columns="permissionColumns" :data="permissionData"></Table>
            </TabPane>
            <TabPane label="Granted Users" name="2" icon="ios-color-filter">{{
              descriptionData[0] ? descriptionData[0].modifiedBy : '1111'
            }}</TabPane>
          </Tabs>
        </Card>
      </Col>
      <!-- 右侧过滤器 -->
      <Col span="8">
        <Card>
          <p slot="title">
            <Icon type="ios-funnel-outline" />
            roles filter
          </p>
          <p>
            All non-empty fields will be compiled and applied into the query taken into
            consideration in the filter.
          </p>
          <Form :model="searchContent" label-position="top">
            <FormItem label="Name">
              <Input v-model="searchContent.name"></Input>
            </FormItem>
            <FormItem label="Description">
              <Input v-model="searchContent.description"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary">Search</Button>
              <Button style="margin-left: 8px">Reset</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
    <!-- 添加角色对话框 -->
    <Modal
      v-model="addRoleModalVisible"
      title="添加角色"
      @on-ok="addRoleModalOk"
      @on-cancel="addRoleModalCancel"
    >
      <Form :model="addRoleData" label-position="left" :label-width="100">
        <FormItem label="角色姓名">
          <Input v-model="addRoleData.name"></Input>
        </FormItem>
        <FormItem label="角色描述">
          <Input v-model="addRoleData.description"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 编辑角色对话框 -->
    <Modal
      v-model="editRoleModalVisible"
      title="编辑角色"
      @on-ok="editRoleModalOk"
      @on-cancel="editRoleModalCancel"
    >
      <Form :model="editRoleData" label-position="left" :label-width="100">
        <FormItem label="角色姓名">
          <Input v-model="editRoleData.name"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Request from '@/libs/request.js'
export default {
  created() {
    this.getRole()
  },
  methods: {
    clickPanes(name) {
      console.log(111)
      switch (name) {
        case '0':
          break
        case '1':
          this.getPermission()
          break
        case '2':
          break
        default:
          break
      }
    },
    // 获得permission
    async getPermission() {
      const { scopeId, id } = this.descriptionData[0]
      const res = await Request({
        url: `${scopeId}/roles/${id}/permissions`,
        method: 'get'
      })
      // console.log(data)

      this.permissionData.length = 0
      this.permissionData.push(res.data.items.permission)
    },
    // 选中上半部分table中的某一行
    roleCurrentSelected(currentRow) {
      this.tabDisabled = true
      console.log(currentRow)
      this.descriptionData.length = 0
      this.descriptionData.push(currentRow)
    },
    // 处理时间
    utc2beijing(utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var T_pos = utc_datetime.indexOf('T')
      var Z_pos = utc_datetime.indexOf('Z')
      var year_month_day = utc_datetime.substr(0, T_pos)
      var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1)
      var new_datetime = year_month_day + ' ' + hour_minute_second // 2017-03-31 08:02:06

      // 处理成为时间戳
      timestamp1 = new Date(Date.parse(new_datetime))
      timestamp1 = timestamp1.getTime()
      timestamp1 = timestamp1 / 1000

      // 增加8个小时，北京时间比utc时间多八个时区
      var timestamp = timestamp1 + 8 * 60 * 60

      // 时间戳转为时间
      var beijing_datetime = new Date(parseInt(timestamp) * 1000)
        .toLocaleString()
        .replace(/年|月/g, '-')
        .replace(/日/g, ' ')
      return beijing_datetime // 2017-03-31 16:02:06
    },
    // 获取角色数据
    async getRole() {
      const scopeId = window.localStorage.getItem('scopeId')
      const { data: res } = await Request({
        url: `${scopeId}/roles`,
        method: 'get'
      })
      // console.log(utc2beijing('2017-03-31T08:02:06Z'))
      this.roleList = res.items
      this.pageInfo.total = this.roleList.length
      console.log('this is rolelist', this.roleList)
    },
    // 编辑角色
    async editRoleModalOk() {
      let scopedID = window.localStorage.getItem('scopeId')

      this.editRoleData.modifiedOn = new Date()
      this.editRoleData.modifiedBy = scopedID
      this.editRoleData.id = this.selectedInfo.id

      console.log(this.editRoleData)
      const data = await Request({
        url: `${scopedID}/roles/${this.selectedInfo.id}`,
        data: this.editRoleData,
        method: 'put'
      })
      if (data.status !== 200) {
        this.$Message.error('修改角色失败')
        return
      }
      this.$Message.success('修改角色成功')
      this.getRole()
    },
    editRoleModalCancel() {
      editRoleModalVisible = false
      this.$Message.info('已取消')
    },
    // 添加角色
    async addRoleModalOk() {
      const scopeId = window.localStorage.getItem('scopeId')
      const data = await Request({
        url: `${scopeId}/roles`,
        method: 'post',
        data: this.addRoleData
      })
      if (data.status !== 200) {
        this.$Message.error('添加角色失败')
        return
      }
      this.$Message.success('添加角色成功')
      // 刷新页面
      this.getRole()
      console.log(data)
    },
    // 关闭添加角色对话框
    addRoleModalCancel() {
      this.addRoleModalVisible = false
    },
    // 编辑、更新角色信息
    // 设置选中的信息
    updateSeletedRole(info) {
      this.editRoleModalVisible = true
      this.selectedInfo.id = info.id
      this.selectedInfo.scopeId = info.scopeId
    },
    // 删除角色
    deleteOneRole(info) {
      this.$Modal.confirm({
        title: '删除',
        content: '<p>确认删除角色？</p>',
        onOk: async () => {
          const data = await Request({
            url: `${info.scopeId}/roles/${info.id}`,
            method: 'delete'
          })
          console.log(data)
          if (data.status !== 200) {
            this.$Message.error('删除失败')
          } else {
            this.$Message.info('删除成功')
            this.getRole()
          }
        },
        onCancel: () => {
          this.$Message.info('已取消删除')
        }
      })
    }
  },
  props: {},
  data() {
    return {
      // permission的数据
      permissionData: [],
      // permission的列
      permissionColumns: [
        {
          title: 'Domain',
          key: 'domain'
        },
        {
          title: 'Action',
          key: 'action'
        },
        {
          title: 'Target Scope Id',
          key: 'scopeId'
        },
        {
          title: 'Target Group',
          key: 'group'
        },
        {
          title: 'Forwardable',
          key: 'forwardable'
        },
        { title: 'Added On', key: 'dd' },
        {
          title: 'Added By',
          key: 'dd'
        }
      ],
      // 分页信息
      pageInfo: { total: '' },
      // 显示描述的信息
      descriptionColumns: [
        {
          title: 'createdBy',
          key: 'createdBy'
        },
        {
          title: 'createdOn',
          key: 'createdOn'
        },
        {
          title: 'id',
          key: 'id'
        },
        {
          title: 'modifiedBy',
          key: 'modifiedBy'
        },
        {
          title: 'modifiedOn',
          key: 'modifiedOn'
        },
        {
          title: 'name',
          key: 'name'
        },
        {
          title: 'optlock',
          key: 'optlock'
        },
        {
          title: 'scopeId',
          key: 'scopeId'
        },
        {
          title: 'type',
          key: 'type'
        }
      ],
      descriptionData: [],
      // 选中的tabs
      tabSelected: '',
      // 选中的信息
      selectedInfo: {
        id: '',
        scopeId: ''
      },
      // 编辑角色数据
      editRoleData: {
        name: '',
        modifiedOn: ''
      },
      // 添加角色的对话框
      addRoleModalVisible: false,
      // 添加角色的数据
      addRoleData: {
        description: '',
        name: ''
      },
      // 编辑角色的对话框
      editRoleModalVisible: false,
      // 编辑角色的数据

      // 过滤表单查询内容
      searchContent: { name: '', description: '' },
      // 表单生成
      roleColumns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: 'Modified On',
          key: 'modifiedOn'
        },
        {
          title: 'Modified By',
          key: 'modifiedBy'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'md-create'
                  },
                  style: {
                    marginRight: '10PX'
                  },
                  on: {
                    click: () => {
                      this.updateSeletedRole(params.row)
                    }
                  }
                },
                '更新'
              ),

              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'md-trash'
                  },
                  on: {
                    click: () => {
                      this.deleteOneRole(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      // 角色列表
      roleList: []
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
