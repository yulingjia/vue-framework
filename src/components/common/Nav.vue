<template>
  <el-row class="tac">
    <el-col :span="24">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
            v-for="menu in menus" :key="menu.id"
            router
            >
            <el-submenu v-if="menu.secondMenus" :index="menu.mid">
                <template slot="title">
                    <i class="iconfont" :class="menu.icon"></i>
                    <span>{{menu.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="item in menu.secondMenus" :key="item.id" :index="item.path">
                      <i class="el-icon-caret-right"></i>
                      {{item.name}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else-if="!menu.secondMenus" :index="menu.path">
                <i class="iconfont" :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Nav',
  data () {
    return {
      openeds: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      /* loading = Loading.service({fullscreen: true, text: '拼命加载中....'}) */
      /* console.log(key, keyPath) */
    },
    handleOpen (key, keyPath) {
      /* console.log(key, keyPath) */
    },
    handleClose (key, keyPath) {
      /* console.log(key, keyPath) */
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  created () {
    this.$store.dispatch('getMenus')
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  border:none;
  .el-submenu{
    .el-submenu__title{
      i{
        color:#fff;
        margin-right: 5px;
      }
    }
    .el-menu{
      .el-menu-item{
        padding-left: 20px!important;
      }
    }
  }
}
</style>
