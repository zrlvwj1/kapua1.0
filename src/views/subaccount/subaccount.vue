<template>
  <div style="height: 100%">
    <el-container style="height: 100%; padding-top: 5px">
      <el-main style="height: 100%; padding: 0px; padding-top: 0px"></el-main>
      <el-aside style="height: 100%; margin-right: 5px" width="220px">
        <div class="account-filter">
          <div class="account-filter-title">
            <h6>用户过滤</h6>
          </div>

          <div class="account-filter-form">
            <span style="display: block; line-height: 20px"
              >All non-empty fields will be compiled and applied into the query
              taken into consideration in the filter.
            </span>
            <form class="search-form">
              <div class="form-item">
                <span>账户名</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>组织名</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>截至时间</span>
                <input type="date" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>联系姓名</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>电话</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>地址1</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>地址2</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>账户名</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>zip/post code</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>城市</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>州/省份</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="form-item">
                <span>国家</span>
                <input type="text" class="my-input-class" />
              </div>
              <div class="button-container">
                <button class="my-button-class">search</button>
                <button class="my-button-class">reset</button>
              </div>
            </form>
          </div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
      },
    };
  },
};
</script>
<style>
.account-filter-title {
  border-bottom: 1px solid white;
  background-color: #e5e5e5;
  height: 25px;
  line-height: 25px;
}
.account-filter {
  height: 100%;
  border: 1px solid #d0d0d0;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #f0f0f0;
}
.my-input-class {
  height: 20px;
  width: 185px;
  margin-bottom: 5px;
  border: 1px solid #b5b8c8;
}
.my-input-class:focus {
  outline: none;
  border: 1px solid #7eadd9;
}
.search-form {
  margin-top: 10px;
}
.button-container {
  margin-top: 10px;
}
.my-button-class {
  padding: 5px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  margin-right: 8px;
  outline: none;
}
.my-button-class:hover {
  background-color: #c5dbf5;
}
</style>