<template>
  <div class="users-table">
    <transition name="el-zoom-in-center">
      <el-table
        :data="rolesList"
        style="width: 100%"
        :default-sort="{ prop: 'id', order: 'descending' }"
        border
      >
        <el-table-column prop="id" label="id" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" sortable width="180">
        </el-table-column>
        <el-table-column prop="creater" label="创建者"> </el-table-column>
        <el-table-column prop="time" label="创建于"> </el-table-column>
      </el-table>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
    };
  },
};
</script>
<style>
.users-table {
  color: black !important;
}
</style>