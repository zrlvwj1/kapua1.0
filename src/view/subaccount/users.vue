<template>
  <div class="users-container">
    <!-- 上部按钮组 -->
    <div class="my-button-group">
      <Button icon="md-add" size="small">Add</Button>
      <Button icon="md-create" size="small">Edit</Button>
      <Button icon="md-trash" size="small">Delete</Button>
      <Button icon="md-refresh" size="small">Refresh</Button>
    </div>
    <!-- 上部按钮组结束 -->
    <!-- 表格区域 -->
    <div class="my-table">
      <Table :columns="columns1" :data="data1"></Table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: { name: '', description: '' },
      columns1: [
        {
          title: "status",
          key: 'status'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: "display",
          key: 'display name'

        },
        {
          title: 'phone number',
          key: 'phoneNumber'
        },
        {
          title: 'email',
          key: 'email'
        },
        {
          title: 'expiration',
          key: 'expiration'
        },
        {
          title: "created by"
        },
        {
          title: "created on"
        }
      ]
    }
  }

}

</script>
<style scoped>
.users-container {
  height: 100%;
  width: 100%;
}
</style>