<template>
  <el-container>
    <el-aside width="200px" style="color:#fff;">百得思维</el-aside>
    <el-main>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          欢迎你，喻玲佳<i class="user-icon"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            哈哈哈哈
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          消息<i class="el-icon-message el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-main>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.el-container{
  .el-main{
    padding:0 10px;
    .el-dropdown{
      cursor: pointer;
      float: right;
      color:#fff;
      outline: none;
      margin-left:20px;
      .user-icon{
        float: right;
        width:30px;
        height: 30px;
        margin:15px;
        background: red;
        border-radius: 30px;
      }
    }
  }
}
</style>
