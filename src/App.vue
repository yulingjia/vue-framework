<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside style="width:200px;">
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <div class="main-container" v-loading="loading">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './components/common/Header'
import Nav from './components/common/Nav'

export default {
  name: 'app',
  data () {
    return {
      loading: true
    }
  },
  components: {
    'v-header': Header,
    'v-nav': Nav
  },
  created () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
#app {
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display: flex;
  min-width:1200px;
  overflow: auto;
  & > .el-container {
    flex: 1;
    display: flex;
    background-color: #f2f2f2;
    & > .el-header {
      height: 60px;
      background-color: #545c64;
      color: #333;
      line-height: 60px;
    }
    & > .el-container {
      flex: 1;
      display: flex;
      .el-aside {
        background-color: #545c64;
        border-right:1px solid #f2f2f2;
        color: #333;
        font-size:12px;
        overflow: hidden;
      }
      .el-main{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding:10px;
        overflow: hidden;
        background: #f2f2f2;
        .main-container{
          display: flex;
          flex: 1;
          background: #fff;
        }
      }
    }
  }
}
</style>
