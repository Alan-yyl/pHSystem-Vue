<template>
  <div id="container" style="height: 490px ;width:100%">
    Hello singleNode
  </div>
  <!--  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>-->
</template>

<script>
  export default {
    name: "singleNode",

    data() {
      return {
        pH: [],
        temperature: [],
        timeData: []
      }
    },

    //在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {
      this.initData();
      this.drawLine();

    },

    watch: {
      dataArr(val) {//监听数据发生改变 刷新图表数据
        this.drawLine();
      }
    },


    beforeMount() {
      let that = this
      setInterval(refresh, 3000)


      function refresh() {
        let pHData=(Math.random() * 140 / 10).toFixed(1)
        //生成-50~50摄氏度的随机数
        let a = [-1, 1];
        // let temperatureData=a[Math.random()*2]
        let index = a[Math.floor(Math.random() * 2)];
        let temperatureData=(Math.random() * 50 * index).toFixed(1)
        //把数组的第一个元素从其中删除
        that.pH.shift();
        that.pH.push(pHData);
        that.temperature.shift();
        that.temperature.push(temperatureData)
        let first = that.timeData.shift();
        that.timeData.push(that.randomData(first))
        that.drawLine()
      }
    },

    methods: {
      //模拟数据,返回10分钟后的数据
      randomData(first) {
        let date = new Date(first);
        let afterTime = new Date(date.getTime() + 10 * 60 * 1000);
        let returnTime = afterTime.toDateString();
        return returnTime;
      },

      //初始化pH、温度、时间的数据
      initData() {
        //指定日期形如：'2020/3/19 0:00:00'
        let date = new Date("2020/3/19 0:00:00");
        //每一分钟显示一次数据，一天存在1440个数据
        for (let i = 0; i < 24 * 6; i++) {
          //生成0-14之间的随机数
          let phData = (Math.random() * 140 / 10).toFixed(1)
          this.pH.push(phData)
          //生成-50~50摄氏度的随机数
          let a = [-1, 1];
          // let temperatureData=a[Math.random()*2]
          let index = a[Math.floor(Math.random() * 2)];
          let temperatureData = (Math.random() * 50 * index).toFixed(1);
          this.temperature.push(temperatureData);
          //生成指定日期形如：'2009/6/12 2:00:05'后1444天的数据
          let afterTime = new Date(date.getTime() + 10 * 60 * 1000)
          //转换为指定的格式
          let dateFormat = afterTime.toDateString()
          this.timeData.push(new Date(dateFormat).Format("yyyy-MM-dd HH:mm:ss"))
          date = new Date(dateFormat)
        }
        // console.log(pH+"  "+temperature+" "+timeData)

      },

      //画折线图
      drawLine() {
        //基于准备好的dom，初始化echarts实例
        let dom = this.$echarts.init(document.getElementById("container"));

        // dom.options()
        //

        //绘制折线图
        dom.setOption({
          title: {
            text: 'pH-温度实时数据',
            left: 'center'
          },
          //提示框组件
          tooltip: {
            trigger: 'axis',

            axisPointer: {
              //是否开启动画
              animation: false
            }
          },
          //图例组件
          legend: {
            data: ['流量', '降雨量'],
            left: 10
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 30,
              end: 70,
              xAxisIndex: [0, 1]
            },
            {
              type: 'inside',
              realtime: true,
              start: 30,
              end: 70,
              xAxisIndex: [0, 1]
            }
          ],
          grid: [{
            left: 50,
            right: 50,
            height: '35%'
          }, {
            left: 50,
            right: 50,
            top: '55%',
            height: '35%'
          }],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: true},
              data: this.timeData,
              // data: []
            },
            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: true},
              data: this.timeData,
              position: 'top'
            }
          ],
          yAxis: [
            {
              name: 'pH',
              type: 'value',
              max: 14
            },
            {
              gridIndex: 1,
              name: '温度(℃)',
              type: 'value',
              inverse: true,
              min: -60
            }
          ],
          series: [
            {
              name: 'pH值',
              type: 'line',
              symbolSize: 8,
              hoverAnimation: false,
              data: this.pH
            },
            {
              name: '温度值',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              hoverAnimation: false,
              data: this.temperature
            }
          ]
        }, true)
      }
    }

  }


</script>

<style scoped>

</style>
