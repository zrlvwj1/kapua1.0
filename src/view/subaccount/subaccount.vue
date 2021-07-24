<template>
  <div class="accounts-container">
    <Split v-model="split2" mode="vertical" min="300px" max="300px" style="height:100%;width:100%;">
      <div slot="top" class="accounts-split-pane-top">
        <div class="accounts-function-area" style="background-color:#f8f8f9">
          <Button size="default" icon="md-add" @click="openAddAccountModal">添加</Button>
          <Button size="default" icon="ios-search">过滤</Button>
          <Button size="default" icon="md-sync" @click="getAccountsList">刷新</Button>
        </div>
        <div class="accounts-table-area" style="height:100%">
          <Table
            :columns="basicColumns"
            show-header
            strip
            :border="true"
            :data="accountsList"
            :loading="loadingFlag"
            @on-row-click="selectOneAccount"
          ></Table>
        </div>
        <div class="accounts-page-area" style="background-color:#f8f8f9">
          <Page :total="40" size="small" show-elevator show-sizer />
        </div>
      </div>
      <div slot="bottom" class="accounts-split-pane-bottom">
        <Tabs type="card">
          <TabPane label="描述" icon="ios-funnel">
            <Table
              :columns="columns1"
              show-header
              strip
              :border="true"
              :data="selectedAccount"
              row-key="id"
            ></Table>
          </TabPane>
          <TabPane label="用户" icon="ios-people">
            <Users />
          </TabPane>
          <TabPane label="账户设置" icon="ios-cog"> <Icon type="ios-cog" />标签三的内容 </TabPane>
        </Tabs>
      </div>
    </Split>
    <!-- 添加账户对话框 -->
    <Modal
      v-model="addAccountModal"
      draggable
      sticky
      scrollable
      :mask="false"
      title="添加账户"
      class="my-modal"
      @on-ok="submitAddAccountForm"
      :closable="false"
      @on-cancel="closeAddAccountModal"
    >
      <Form
        :model="addAccountForm"
        :rules="addAccountFormRules"
        label-position="left"
        class="my-addaccount-form"
        :label-width="120"
        ref="addAccountForm"
      >
        <div class="account-info" style="border:1px solid #fff">
          <h3 style="margin-left:10px;margin-bottom:10px;">账户信息</h3>
          <FormItem label="名称(必填)" prop="name">
            <Input
              v-model="addAccountForm.name"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            >
            </Input>
            &nbsp;
            <Icon
              type="ios-checkmark-circle-outline"
              :size="20"
              style="color:#19be6b"
              v-show="addAccountForm.name.length > 0 ? true : false"
            />
            <Icon
              type="ios-alert-outline"
              :size="20"
              style="color:#ed4014"
              v-show="addAccountForm.name.length > 0 ? false : true"
            />
          </FormItem>
          <FormItem label="过期时间">
            <DatePicker
              type="date"
              placeholder="Select date"
              v-model="addAccountForm.expirationDate"
              style="width:300px"
            ></DatePicker>
          </FormItem>
        </div>
        <div class="account-info" style="border:1px solid #fff;margin-top:15px">
          <h3 style="margin-left:10px;margin-bottom:10px;">组织信息</h3>
          <FormItem label="名称（必填）" prop="organizationName">
            <Input
              v-model="addAccountForm.organizationName"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input
            >&nbsp;
            <Icon
              type="ios-checkmark-circle-outline"
              :size="20"
              style="color:#19be6b"
              v-show="addAccountForm.organizationName.length > 0 ? true : false"
            />
            <Icon
              type="ios-alert-outline"
              :size="20"
              style="color:#ed4014"
              v-show="addAccountForm.organizationName.length > 0 ? false : true"
            />
          </FormItem>
          <FormItem label="邮箱（必填）" prop="organizationEmail">
            <Input
              v-model="addAccountForm.organizationEmail"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input
            >&nbsp;
            <Icon
              type="ios-checkmark-circle-outline"
              :size="20"
              style="color:#19be6b"
              v-show="checkoutEmailFormat"
            />
            <Icon
              type="ios-alert-outline"
              :size="20"
              style="color:#ed4014"
              v-show="!checkoutEmailFormat"
            />
          </FormItem>
          <FormItem label="联系人姓名" prop="organizationPersonName">
            <Input
              v-model="addAccountForm.organizationPersonName"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="手机号" prop="organizationPhoneNumber">
            <Input
              v-model="addAccountForm.organizationPhoneNumber"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="地址1" prop="organizationAddressLine1">
            <Input
              v-model="addAccountForm.organizationAddressLine1"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="地址2" prop="organizationAddressLine2">
            <Input
              v-model="addAccountForm.organizationAddressLine2"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="zip/post code" prop="organizationZipPostCode">
            <Input
              v-model="addAccountForm.organizationZipPostCode"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="城市" prop="organizationCity">
            <Input
              v-model="addAccountForm.organizationCity"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="省份" prop="organizationStateProvinceCounty">
            <Input
              v-model="addAccountForm.organizationStateProvinceCounty"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
          <FormItem label="国家" prop="organizationCountry">
            <Input
              v-model="addAccountForm.organizationCountry"
              placeholder="Enter your name"
              size="default"
              style="width:300px"
            ></Input>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <!-- 添加账户对话框 -->
    <!-- 修改账户信息对话框 -->
    <!-- <Modal v-model="addAccountModal" draggable sticky scrollable :mask="false" title="修改账户" class="my-modal" @on-ok="submitAddAccountForm">
      <Form :model="addAccountForm" :rules="addAccountFormRules" label-position="left" class="my-addaccount-form" :label-width="120" ref="addAccountForm">
        <div class="account-info" style="border:1px solid #fff">
          <h3 style="margin-left:10px;margin-bottom:10px;">账户信息</h3>
          <FormItem label="名称(必填)" prop="name">
            <Input v-model="addAccountForm.name" placeholder="Enter your name" size="default" style="width:300px">
            </Input>
            &nbsp;
            <Icon type="ios-checkmark-circle-outline" :size="20" style="color:#19be6b" v-show="addAccountForm.name.length>0?true:false" />
            <Icon type="ios-alert-outline" :size="20" style="color:#ed4014" v-show="addAccountForm.name.length>0?false:true" />

          </FormItem>
          <FormItem label="过期时间">
            <DatePicker type="date" placeholder="Select date" v-model="addAccountForm.expirationDate" style="width:300px"></DatePicker>
          </FormItem>
        </div>
        <div class="account-info" style="border:1px solid #fff;margin-top:15px">
          <h3 style="margin-left:10px;margin-bottom:10px;">组织信息</h3>
          <FormItem label="名称（必填）" prop="organizationName">
            <Input v-model="addAccountForm.organizationName" placeholder="Enter your name" size="default" style="width:300px"></Input>&nbsp;
            <Icon type="ios-checkmark-circle-outline" :size="20" style="color:#19be6b" v-show="addAccountForm.organizationName.length>0?true:false" />
            <Icon type="ios-alert-outline" :size="20" style="color:#ed4014" v-show="addAccountForm.organizationName.length>0?false:true" />
          </FormItem>
          <FormItem label="邮箱（必填）" prop="organizationEmail">
            <Input v-model="addAccountForm.organizationEmail" placeholder="Enter your name" size="default" style="width:300px"></Input>&nbsp;
            <Icon type="ios-checkmark-circle-outline" :size="20" style="color:#19be6b" v-show="checkoutEmailFormat" />
            <Icon type="ios-alert-outline" :size="20" style="color:#ed4014" v-show="!checkoutEmailFormat" />
          </FormItem>
          <FormItem label="联系人姓名" prop="organizationPersonName">
            <Input v-model="addAccountForm.organizationPersonName" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="手机号" prop="organizationPhoneNumber">
            <Input v-model="addAccountForm.organizationPhoneNumber" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="地址1" prop="organizationAddressLine1">
            <Input v-model="addAccountForm.organizationAddressLine1" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="地址2" prop="organizationAddressLine2">
            <Input v-model="addAccountForm.organizationAddressLine2" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="zip/post code" prop="organizationZipPostCode">
            <Input v-model="addAccountForm.organizationZipPostCode" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="城市" prop="organizationCity">
            <Input v-model="addAccountForm.organizationCity" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="省份" prop="organizationStateProvinceCounty">
            <Input v-model="addAccountForm.organizationStateProvinceCounty" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
          <FormItem label="国家" prop="organizationCountry">
            <Input v-model="addAccountForm.organizationCountry" placeholder="Enter your name" size="default" style="width:300px"></Input>
          </FormItem>
        </div>
      </Form>
    </Modal> -->
    <!-- 修改账户信息对话框 -->
  </div>
</template>
<script>
import Request from '@/libs/request'
import Users from './users.vue'
export default {
  data() {
    var checkEmail = (rules, value, callback) => {
      const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (email.test(value)) {
        return callback()
      } else {
        callback(new Error('请输入正确的邮箱地址'))
      }
    }
    return {
      split2: 0.5,
      // 账户列表的列名
      basicColumns: [
        {
          title: 'name',
          key: 'name'
        },
        {
          title: '组织名',
          key: 'organization.email',
          render: (h, params) => {
            return h('span', params.row.organization.name)
          }
        },
        {
          title: '组织邮件',
          key: 'organization[0]',
          render: (h, params) => {
            return h('span', params.row.organization.email)
          }
        },
        {
          title: '修改时间',
          sortable: true,
          key: 'modifiedOn'
        },
        {
          title: '修改人',
          key: 'modifiedBy'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10PX'
                  },
                  on: {
                    click: () => {
                      this.updateSeletedAccount(params.row)
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
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteOneAccount(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      // 账户描述表格的列名
      columns1: [
        {
          title: 'name',
          key: 'name',
          tree: true
        },
        {
          title: 'value',
          key: 'value',
          sortable: true,
          tree: true
        }
      ],
      // 保存返回的所有账户的数组
      accountsList: [],
      // 添加账户modal显示flag
      addAccountModal: false,
      // 邮件错误显示flag
      emailIconFlag: null,
      // 添加账户的表单
      addAccountForm: {
        organizationCity: '',
        organizationStateProvinceCounty: '',
        organizationCountry: '',
        expirationDate: '',
        organizationZipPostCode: '',
        organizationName: '',
        organizationPersonName: '',
        organizationEmail: '',
        organizationPhoneNumber: '',
        organizationAddressLine1: '',
        organizationAddressLine2: '',
        description: '',
        name: '',
        entityAttributes: {
          additionalProp1: '',
          additionalProp2: '',
          additionalProp3: ''
        },
        scopeId: ''
      },
      // 添加账户表单验证规则
      addAccountFormRules: {
        name: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        organizationEmail: [
          {
            required: true,
            message: 'The email cannot be empty',
            trigger: 'blur',
            validator: checkEmail
          }
        ],
        organizationName: [
          { required: true, message: 'The organization name cannot be empty', trigger: 'blur' }
        ]
      },
      // 选中的账户
      selectedAccount: []
    }
  },
  methods: {
    // 获取账户列表，将其保存到accountsList
    async getAccountsList() {
      let scopedID = window.localStorage.getItem('scopeId')
      const { data: res } = await Request.get(`/${scopedID}/accounts`)
      this.accountsList = res.items
      console.log(this.accountsList)
    },
    // 获取特定id的账户,并返回获取的这个账户信息
    async getSelectedAccount(accountID) {
      let scopedID = window.localStorage.getItem('scopeId')
      const { data: res } = await Request.get(`${scopedID}/accounts/${accountID}`)
      return res
    },
    // 打开添加账户对话框
    openAddAccountModal() {
      this.addAccountModal = true
    },
    closeAddAccountModal() {
      this.addAccountModal = false
    },
    // 提交addaccount表单
    async submitAddAccountForm() {
      this.$refs.addAccountForm.validate(async valid => {
        if (!valid) {
          return this.$Message.error('表单填写错误，请检查')
        }
        let scopeID = window.localStorage.getItem('scopeId')
        this.addAccountForm.scopeId = scopeID
        const res = await Request.post(`/${scopeID}/accounts`, this.addAccountForm)
        if (res.status === 200) {
          this.$Message.info('添加用户成功')
          this.$refs.addAccountForm.resetFields()
          this.getAccountsList()
          this.addAccountModal = false
        } else {
          this.$Message.error(res.data.type)
        }
      })
    },
    // 删除某一个账户
    deleteOneAccount(row) {
      this.$Modal.confirm({
        title: '删除用户',
        content: '此操作不可逆，确定删除吗',
        onOk: async () => {
          let scopedID = window.localStorage.getItem('scopeId')
          const res = await Request.delete(`/${scopedID}/accounts/${row.id}`)
          console.log(res)
          this.getAccountsList()
          if (res.status === 200) {
            this.$Message.info('删除成功')
          } else {
            this.$Message.info('删除失败')
          }
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    // 更新选中的账户
    async updateSeletedAccount(row) {
      // 更新前首先获取该用户
      var aa = await this.getSelectedAccount(row.id)
      console.log(aa)
    },
    // 选中某一个账户,然后调用getSelectedAccount函数，获取账户信息，
    async selectOneAccount(data) {
      this.selectedAccount = this.formatSelectedAccount(data)
      console.log(this.selectedAccount)
    },
    // 格式化选中账户的信息，
    formatSelectedAccount(data) {
      var result = [
        { id: '10', name: 'account info', value: '', children: [] },
        { id: '11', name: 'organizition info', value: '', children: [] }
      ]
      var index = 1
      for (var i in data) {
        if (typeof data[i] !== 'object') {
          let id = '10' + index
          result[0].children.push({ id: `${id}`, name: `${i}`, value: `${data[i]}` })
          index = index + 1
        } else {
          index = 1
          for (var j in data[i]) {
            let id = '11' + index
            result[1].children.push({ id: `${id}`, name: `${j}`, value: `${data[i][j]}` })
            index = index + 1
          }
        }
      }
      return result
    }
  },
  computed: {
    loadingFlag() {
      if (this.accountsList.length > 0) {
        return false
      } else {
        return true
      }
    },
    // email格式检测
    checkoutEmailFormat() {
      const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (email.test(this.addAccountForm.organizationEmail)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.getAccountsList()
  },
  components: {
    Users
  }
}
</script>
<style>
.accounts-container {
  width: 100%;
  height: 100%;
  border: 1px solid #dcdee2;
}
.accounts-split-pane-top {
  position: relative;
  height: 100%;
  width: 100%;
}
.accounts-split-pane-top,
.accounts-split-pane-bottom {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
}
.my-row-class {
  height: 20px;
}
.accounts-table-area .ivu-table td,
.ivu-table th {
  height: 30px;
}
.accounts-page-area {
  width: 100%;
  border-top: 1px solid #dcdee2;
  position: absolute;
  bottom: 0px;
}
.accounts-split-pane-bottom .ivu-tabs-bar {
  margin-bottom: -1px;
}
.accounts-split-pane-bottom .ivu-table td,
.ivu-table th {
  height: 30px;
}

.my-addaccount-form .ivu-form-item {
  margin-top: 3px;
  margin-bottom: 0px;
}
.my-modal .ivu-modal-body {
  padding-left: 35px;
}
</style>
