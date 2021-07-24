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
          <Table :columns="roleColumns" :data="roleList"> </Table>
          <Page :total="100" show-total style="text-align:center" />
        </Card>
        <!-- 下半部分-------------------------- -->
        <Card>
          <!-- <Tabs value="name1">
            <TabPane label="标签一" name="Description" icon="ios-alert">
              <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane label="标签二" name="Permissions" icon="ios-checkmark-circle"
              >Permissions</TabPane
            >
            <TabPane label="标签三" name="Granted User" icon="ios-color-filter"
              >Granted User</TabPane
            >
          </Tabs> -->
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
  </div>
</template>

<script>
import Request from '@/libs/request.js'
export default {
  created() {
    this.getRole()
  },
  methods: {
    // 获取角色数据
    async getRole() {
      const scopeId = window.localStorage.getItem('scopeId')
      const { data: res } = await Request({
        url: `${scopeId}/roles`,
        method: 'get'
      })
      this.roleList = res.items
      console.log('this is rolelist', this.roleList)
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
    updateSeletedRole(info) {
      console.log(info)
    },
    // 删除角色
    deleteOneRole() {}
  },
  props: {},
  data() {
    return {
      // 添加用户的对话框
      addRoleModalVisible: false,
      // 添加用户的数据
      addRoleData: {
        description: '',
        name: ''
      },
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
