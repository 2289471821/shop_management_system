<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~@/assets/system.jpg" alt="" />
        <span>管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu 
          background-color="#333744" 
          text-color="#fff" 
          active-text-color="#409eff" 
          :unique-opened='true' 
          :collapse="isCollapse" 
          :collapse-transition="false"
          :router="true"
          :default-active='activePath'
          >
          <!-- 一级菜单 -->
          <el-submenu 
            :index="item.id + ''" 
            v-for="item in menulist" 
            :key="item.id"
            >
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item 
              :index="'/' + subItem.path" 
              v-for="subItem in item.children" 
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
              >
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        // 左侧菜单数据
        menulist: [],
        // 字体图标的实现
        iconsObj: {
          '125': 'el-icon-user-solid',
          '103': 'el-icon-s-claim',
          '101': 'el-icon-s-goods',
          '102': 'el-icon-s-order',
          '145': 'el-icon-s-data'
        },
        // 是否折叠
        isCollapse: false,
        // 激活的二级菜单
        activePath: ''
      }
    },
    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      // 退出登录
      logout() {
        window.sessionStorage.clear()
        this.$router.replace("/login")
      },
      // 获取所有的菜单
      async getMenuList() {
        const { data: res } = await this.$http.get('menus')
        if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.menulist = res.data
      },
      // 点击按钮，切换菜单的折叠与展开
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      // 保存二级菜单的激活状态
      saveNavState(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #38485e;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      > span {
        margin-left: 15px;
      }
      > img {
        height: 60px;
        border-radius: 12px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border: 0;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .el-submenu i {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
