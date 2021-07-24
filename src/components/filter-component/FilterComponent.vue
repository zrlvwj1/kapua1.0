<template>
  <div>
    <Card>
      <!-- 头部header -->
      <p slot="title">
        <Icon type="md-search"></Icon>
        {{ `${title} Filter` }}
      </p>
      <!-- 文字提示 -->
      <p>
        All non-empty fields will be compiled and applied into the query taken into consideration in
        the filter.
      </p>
      <!-- 表单部分 -->
      <Form :model="searchContent" label-position="top">
        <FormItem label="Title">
          <Input v-model="formTop.input1"></Input>
        </FormItem>
        <FormItem label="Title name">
          <Input v-model="formTop.input2"></Input>
        </FormItem>
        <FormItem label="Aligned title">
          <Input v-model="formTop.input3"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
          <Button style="margin-left: 8px">Cancel</Button>
        </FormItem>
      </Form>
    </Card>
    <!-- 主体main -->
  </div>
</template>

<script>
export default {
  props: { title: { type: String, default: '' } },
  data() {
    return { searchContent: {} }
  }
}
</script>

<style lang="less" scoped></style>
