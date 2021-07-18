<template>
  <div class="login-view">
    <div class="kapua-logo-container"></div>
    <div class="login-form-container">
      <div class="container">
        <div class="row">
          <div class="col-form1">
            <div
              class="form-title"
              style="
                height: 50px;
                line-height: 60px;
                font-size: 16px;
                text-align: center;
              "
            >
              控制台登录
            </div>
            <form class="login-form">
              <div class="username" style="margin-bottom: 15px">
                <el-input
                  placeholder="请输入用户名"
                  v-model="userForm.username"
                  size="small"
                  prefix-icon="el-icon-user"
                ></el-input>
              </div>
              <div class="password" style="margin-bottom: 15px">
                <el-input
                  placeholder="请输入密码"
                  v-model="userForm.password"
                  prefix-icon="el-icon-goods"
                  size="small"
                  type="password"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="login-button"
                @click="sendForm"
                >登录</el-button
              >
              <hr style="margin-bottom: 15px; margin-top: 15px" />
              <el-button
                type="info"
                size="small"
                style="width: 100%"
                class="sso-button"
                >sso单点登录</el-button
              >
            </form>
          </div>
          <div class="col-form2">
            <p>
              <strong>欢迎来到易道工业物联网管理平台!</strong> 本平台基于<a
                href="http://eclipse.org/kapua"
                >Eclipse Kapua™</a
              >开发， 提供管理物联网网关和智能边缘设备所需的服务。
              系统提供核心集成框架和一组初始的核心物联网服务，包括设备注册、设备管理服务、消息传递
              服务、数据管理和应用程序支持. 欢迎试用.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { defineComponent } from "@vue/composition-api";

export default {
  data() {
    return {
      userForm: { username: "", password: "" },
    };
  },
  methods: {
    async sendForm() {
      this.$router.push("/");
      const { data: res } = await this.$http.post(
        "/authentication/user",
        this.userForm
      );
      if (res.meta.status == 200) {
        this.$message({
          message: this.loginform.username + ",欢迎登录",
          type: "success",
        });
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      } else {
        this.$message({
          message: res.meta.msg + "",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped>
.login-view {
  background-image: url("./asset/login-bg.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right top;
  background-size: cover;
  height: 100%;
}
.kapua-logo-contain {
  height: 78px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.5);
}
.login-form-container {
  position: absolute;
  top: 45%;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 255px;
}
.container {
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;
  height: 100%;
}
.row {
  width: 1180px;
  height: 100%;
  margin: auto;
}
.col-form1 {
  width: 41.66666667%;
  height: 100%;
  float: left;
  padding-left: 15px;
  padding-right: 15px;
}
.col-form2 {
  width: 58.33333333%;
  height: 100%;
  float: right;
  padding: 15px 15px 0px 15px;
}
.login-form {
  text-align: right;
}
.sso-button {
  background-color: #f1f1f1;
  background-image: linear-gradient(to bottom, #fafafa 0%, #ededed 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffafafa', endColorstr='#ffededed', GradientType=0);
  background-repeat: repeat-x;
  border-color: #bbb;
  color: #4d5258;
}
</style>