<template>
    <el-container>
      <el-aside width="200px">
        <div class="headline"><span>系统模块</span></div>
        <el-tree
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
          ref="tree2">
        </el-tree>
      </el-aside>
      <el-main>
        <div class="headline"><span>权限管理</span></div>
        <div class="toolTab">
          <el-form :inline="true" class="demo-form-inline" size="mini">
            <el-form-item>
              <el-form-item>
                <el-input placeholder="请输入搜索关键字" prefix-icon="el-icon-search"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="success" icon="el-icon-circle-plus-outline" @click="addData('dialogFormData')">新增</el-button>
              <!-- <el-button type="warning" icon="el-icon-edit-outline">修改</el-button> -->
              <el-button type="danger" icon="el-icon-delete" @click="allDeleteForm()">删除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableList">
          <el-table
            height="100%"
            ref="tableList"
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              width="40px"
              >
            </el-table-column>
            <el-table-column
              type="selection"
              width="40px"
              >
            </el-table-column>
            <el-table-column
              sortable
              prop="date"
              label="日期"
              width="100px"
              >
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100px"
              show-overflow-tooltip
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="isDelet"
              label="是否删除"
              width="90px"
              :filters="[{ text: '已删除', value: '已删除' }, { text: '未删除', value: '未删除' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isDelet === '已删除' ? 'danger' : ''" close-transition>
                  {{scope.row.isDelet}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-view"
                  type="text"
                  size="mini"
                  @click="detailTable(scope.$index, scope.row)"
                  >查看详情</el-button>
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  size="mini"
                  @click="editForm(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  size="mini"
                  @click="deleteForm(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total=parseInt(tableData.length)>
          </el-pagination>
        </div>

        <!-- Form弹框 -->
        <el-dialog title="权限管理" :visible.sync="dialogFormVisible">
            <el-form :model="dialogFormData" ref="dialogFormData" :rules="rules" status-icon label-width="70px" label-position="left">
              <el-form-item label="日期" prop="date">
                <el-input v-model="dialogFormData.date" auto-complete="off" placeholder="请输入日期"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input v-model="dialogFormData.name" auto-complete="off" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="dialogFormData.address" auto-complete="off" placeholder="请输入地址"></el-input>
              </el-form-item>
              <el-form-item label="是否删除">
                <el-select v-model="dialogFormData.isDelet" disabled placeholder="请选择">
                  <el-option label="已删除" value="已删除"></el-option>
                  <el-option label="未删除" value="未删除"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveForm('dialogFormData')" :loading="btnLoading">保 存</el-button>
            </div>
        </el-dialog>

        <!-- detail弹框 -->
        <el-dialog title="详情" :visible.sync="dialogDetailVisible"></el-dialog>

      </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      currentPage: 0,
      pagesize: 10,
      /* tree数据 */
      filterText: '',
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      /* tree数据 */

      /* 表格数据 */
      tableDate: [],
      multipleSelection: [],
      /* 表格数据 */
      /* 分页 */
      currentPage4: 4,
      /* 分页 */

      /* 弹框显示 */
      dialogFormVisible: false,
      dialogDetailVisible: false,
      isEdit: '', // 判断是新增或是编辑
      editIndex: 0,
      selectionDate: null,
      /* 弹框数据 */
      btnLoading: false,
      dialogFormData: {
        date: '',
        name: '',
        address: '',
        idDelet: ''
      },
      rules: {}// 表单验证规则
    }
  },
  created () {
    /* 获取表格数据 */
    this.$http.get('/api/sysPermissionTableData').then(resp => {
      if (resp.data.errno === 0) {
        this.tableData = resp.data.data
      }
    }).catch(resp => {
      console.log(resp)
    })
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.isDelet === value
    },
    // 获取多选数据
    handleSelectionChange (val) {
      let _this = this
      _this.multipleSelection = val
      _this.selectionDate = val
    },
    // 新增
    addData (dialogFormData) {
      let _this = this
      _this.isEdit = false

      /* 清除验证 */
      if (_this.$refs[dialogFormData]) {
        _this.$refs[dialogFormData].clearValidate()
      }

      _this.dialogFormVisible = true
      _this.dialogFormData.date = ''
      _this.dialogFormData.name = ''
      _this.dialogFormData.address = ''
      _this.dialogFormData.isDelet = ''
    },
    // 查看详情
    detailTable (index, row) {
      let _this = this
      _this.dialogDetailVisible = true
    },
    // 编辑
    editForm (index, row) {
      let _this = this
      _this.isEdit = true
      _this.editIndex = index

      _this.dialogFormVisible = true
      _this.dialogFormData.date = row.date
      _this.dialogFormData.name = row.name
      _this.dialogFormData.address = row.address
      _this.dialogFormData.isDelet = row.isDelet
    },
    // 保存
    saveForm (dialogFormData) {
      let _this = this
      _this.btnLoading = true
      let params = {
        date: _this.dialogFormData.date,
        name: _this.dialogFormData.name,
        address: _this.dialogFormData.address,
        isDelet: _this.dialogFormData.isDelet
      }
      _this.$refs[dialogFormData].validate((valid) => {
        if (valid) {
          if (_this.isEdit) { // 编辑
            _this.tableData.splice(_this.editIndex, 1, params)
            _this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else { // 添加
            _this.tableData.push(params)
            _this.$message({
              message: '添加成功',
              type: 'success'
            })
          }
          _this.dialogFormVisible = false
        } else {
          this.$message.error('验证失败')
          return false
        }
      })
      _this.btnLoading = false
    },
    // 删除
    deleteForm (index, item) {
      let _this = this
      _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.tableData.splice(index, 1)
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {})
    },
    // 批量删除
    allDeleteForm () {
      let _this = this
      if (_this.selectionDate) {
        console.log(_this.selectionDate)
        /* _this.$message({
          type: 'success',
          message: '批量删除成功!'
        }) */
      } else {
        this.$message.error('没有选择要删除的数据哦！')
      }
    },
    /* table */
    /* 分页 */
    handleSizeChange (val) {
      this.pagesize = val
      console.log(val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
    /* 分页 */
  }
}
</script>

<style lang="less" scoped>
.el-container{
  flex: 1;
  & > .el-aside{
    border-right: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  & > .el-main{
    padding:0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .toolTab{
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 0;
      }
      .el-form--inline .el-form-item{
        margin-right: 0;
      }
    }
    .tableList{
      display: flex;
      flex: 1;
      overflow:hidden;
    }
    .block{
      .el-pagination{
        padding:10px;
      }
    }
  }
}
</style>
