<template>
  <div>
    <el-row class="rowDiv">
      <!--      span:表示该行所占的列数字-->
      <el-col :span="7">
        节点编号
        <el-select v-model="nodeId" filterable placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14">
        <div>
          <span class="demonstration">查询日期</span>
          <el-date-picker
            v-model="timeDate"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
      </el-col>
      <el-button type="primary" @click="queryData">查询</el-button>
    </el-row>
    <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        height="380"
        border
        style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        :index="indexMethod"
        width="50"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ph"
        label="pH"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        prop="temperature"
        label="温度/℃"
        width="300"
        align="center">
      </el-table-column>
    </el-table>
    <div class="block">
<!--通过this.变量来绑定html属性      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="this.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  export default {
    name: "findData",
    data() {
      return {
        //节点编号数据
        options: [],
        //时间日期数据操作
        pickerOptions: {},
        //被选择的节点编号
        nodeId: '',
        //被选择的时间日期
        timeDate: '',
        //表格显示的数据
        tableData: [],
        //当前页
        currentPage: 1,
        //每页显示个数选择器的选项设置
        pageSizes: [10, 50, 100, 200],
        //每页显示个书
        pageSize:10,
        //查询到的数据总数
        total:0,
        loading:false
      }
    },
    //vue示例被创建后执行
    created() {
      this.options = [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }];
      this.pickerOptions = {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
      // this.tableData =
    },
    mounted() {
      console.log("value" + this.value);
    },
    watch: {
      nodeId(val) {
        console.log("变化" + val)
      },
      timeDate(newVar, oldVar) {
        console.log("olderVal" + oldVar)
        console.log("start"+newVar[0])
        console.log("start"+newVar[1])
      }
    },

    methods: {
      //每页显示个数改变时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
      },
      //当前页的页码改变时触发该事件
      handleCurrentChange(val) {
        this.currentPage=val;
        this.queryData();
      },
      indexMethod(index) {
        return index + 1
      },
      queryData(){
        this.loading=true;
        let start=this.timeDate[0].getTime()
        let finish=this.timeDate[1].getTime()
        let url ='/data/?'+'currentPage='+this.currentPage+'&'+'pageSize='+this.pageSize+'&'+'nodeId='+this.nodeId+'&'+'start='+start+'&'+'finish='+finish
        console.log(url)
        //按照key-value形式发数据
        this.getRequest(url).then(resp=>{
          if (resp.status==200){
            this.loading=false;
            console.log("请求成功")
            console.log(resp.data.data)
            this.tableData=resp.data.data
            this.total=resp.data.total
          }
        })
      }
    }
  }
</script>

<style scoped>
  .rowDiv {
    border: 1px solid #e2f6ff;
    border-radius: 5px;
    height: 50px;
    margin: 20px 0 0 0;
    padding: 10px 0 0 5px;
  }

</style>
