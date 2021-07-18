<template>
  <div style="width: 100%; height: 100%">
    <el-container style="height: 100%">
      <el-header
        height="60px"
        style="background-color: #1d1d1d; position: relative"
        ><i
          class="el-icon-s-fold expense-menu"
          :class="{ isrotate: !flag }"
          style="line-height: 60px"
          @click="changeAsideWidth"
        ></i>
        <span class="iconfont icon-dengchu login-out" @click="loginout"></span>
      </el-header>
      <el-container style="height: 100%">
        <el-aside
          ref="menuaside"
          :width="asideWidth + 'px'"
          style="
            height: 100%;
            background-color: #292e34;
            transition: all 0.8s ease;
          "
        >
          <ul class="menu-list">
            <li class="list-item" index="1">
              <a
                class="list-item-link"
                @click="selectItem(1)"
                :class="{ selectedItem: selectindex == 1 }"
              >
                <span class="iconfont icon-careful-full"></span>
                <transition name="my-slide-fade"
                  ><font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;欢迎</font
                  ></transition
                >
              </a>
            </li>
            <li class="list-item" index="2">
              <a
                to="/device"
                class="list-item-link"
                :class="{ selectedItem: selectindex == 2 }"
                @click="selectItem(2)"
              >
                <span class="iconfont icon-shebei"></span>
                <transition name="my-slide-fade">
                  <font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;设备</font
                  ></transition
                >
              </a>
            </li>
            <li class="list-item" index="3">
              <a
                class="list-item-link"
                :class="{ selectedItem: selectindex == 3 }"
                @click="selectItem(3)"
              >
                <span class="iconfont icon-jiaose"></span>
                <transition name="my-slide-fade">
                  <font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;用户</font
                  ></transition
                >
              </a>
            </li>
            <li class="list-item" index="4">
              <a
                class="list-item-link"
                :class="{ selectedItem: selectindex == 4 }"
                @click.stop="selectItem(4)"
              >
                <span class="iconfont icon-yonghu"></span>
                <transition name="my-slide-fade">
                  <font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;角色</font
                  ></transition
                >
              </a>
            </li>
            <li class="list-item" index="5">
              <a
                class="list-item-link"
                :class="{ selectedItem: selectindex == 5 }"
                @click="selectItem(5)"
              >
                <span class="iconfont icon-shezhi"></span>
                <transition name="my-slide-fade">
                  <font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;设置</font
                  ></transition
                >
              </a>
            </li>
            <li class="list-item" index="6">
              <a
                class="list-item-link"
                :class="{ selectedItem: selectindex == 6 }"
                @click="selectItem(6)"
              >
                <span class="iconfont icon-guanli"></span>
                <transition name="my-slide-fade">
                  <font class="item-font" v-show="flag"
                    >&nbsp;&nbsp;子账户</font
                  ></transition
                >
              </a>
            </li>
          </ul>
        </el-aside>
        <el-main style="padding: 0px">
          <transition name="slide-fade"><router-view /></transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      asideWidth: 250,
      flag: true,
      selectindex: 1
    }
  },
  created() {
    this.selectindex = window.sessionStorage.getItem('seletedItem')
  },
  methods: {
    changeAsideWidth() {
      if (this.asideWidth == 75) {
        this.asideWidth = 250
        this.flag = true
      } else {
        this.asideWidth = 75
        this.flag = false
      }
    },
    selectItem(index) {
      this.selectindex = index
      switch (index) {
        case 1:
          this.$router.push('/welcome')
          break
        case 2:
          this.$router.push('/device')
          break
        case 3:
          this.$router.push('/user')
          break
        case 4:
          this.$router.push('/roles')
          break
        case 5:
          this.$router.push('/setting')
          break
        case 6:
          this.$router.push('/subaccount')
          break
      }
      window.sessionStorage.setItem('selectedItem', index)
    },
    //登出功能
    loginout() {
      this.$confirm('此操作将登出, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '登出成功!'
          })
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('scopeId')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消登出'
          })
        })
    }
  }
}
</script>
<style>
.font-white {
  color: white;
}
.list-item {
  width: 100%;
  height: 65px;
  color: white;
  line-height: 30px;
  border-bottom: 1px solid #000;
  font-size: 14px;
}

.myfont-color {
  color: #72767b;
  font-size: 20px !important;
}
font {
  color: #d1d1d1;
  text-indent: 5px;
}
.list-item-link {
  display: block;
  color: white;
  width: 100%;
  height: 100%;
  padding: 17px 0 17px 25px;
}
.list-item-link:hover {
  background-color: #393f44;
  color: #39a5dc !important;
  cursor: pointer;
}

.list-item-link:hover {
  font-weight: 600;
}
.expense-menu {
  color: #d1d1d1;
  line-height: 60px;
  font-size: 35px;
}
.expense-menu:hover {
  color: white;
  cursor: pointer;
}
.selectedItem {
  color: #39a5dc !important;
  border-left: 3px solid #39a5dc;
  background-color: #393f44;
  color: #39a5dc;
  font-weight: 600;
}
.login-out {
  font-size: 35px !important;
  color: #d1d1d1;
  position: absolute;
  right: 20px;
}
.login-out:hover {
  cursor: pointer;
}
.isrotate {
  transform: rotate(180deg);
}
i {
  transition: all 0.8s ease;
}
/* 定义组件切换时的动画效果 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0.1;
}
/*定义左侧菜单栏字体出现效果*/
.my-slide-fade-enter-active {
  transition: all 0.7s ease;
}
.my-slide-fade-leave-active {
  transition: all 0.3s ease;
}
.my-slide-fade-enter, .my-slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
