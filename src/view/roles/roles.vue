<template>
  <div>
    <Row>
      <!-- 左侧部分 -->
      <Col span="16">
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
              <Button icon="md-add">Add</Button>
              <Button icon="md-create">Edit</Button>
              <Button icon="md-trash">Delete</Button>
              <Button icon="md-refresh">Refresh</Button>
            </Col>
            <!-- 过滤按钮 -->
            <Col span="6" style="text-align:right"><Button>>> Filter</Button></Col>
          </Row>
          <Table :columns="columns1" :data="data1"></Table>
          <Page :total="100" show-total style="text-align:center" />
        </Card>
        <!-- 下半部分-------------------------- -->
        <Card>
          <Tabs value="name1">
            <TabPane label="标签一" name="Description" icon="ios-alert">
              <Table :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane label="标签二" name="Permissions" icon="ios-checkmark-circle"
              >Permissions</TabPane
            >
            <TabPane label="标签三" name="Granted User" icon="ios-color-filter"
              >Granted User</TabPane
            >
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
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      searchContent: { name: '', description: '' },
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Description',
          key: 'description'
        },
        {
          title: 'Modified On',
          key: 'Modified On'
        },
        {
          title: 'Modified By',
          key: 'Modified By'
        }
      ]
    }
  },
  components: {}
}
</script>

<style lang="less" scoped></style>
