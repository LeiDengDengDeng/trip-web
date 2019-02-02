<template>
  <div>
    <div class="row">
      <div class="chart">
        <div class="title">审核通过人数</div>
        <div id="examinedChart" :style="{width: '200px', height: '200px'}"></div>
      </div>

      <div class="chart">
        <div class="title">待审核人数</div>
        <div id="unexaminedChart" :style="{width: '200px', height: '200px'}"></div>
      </div>

      <div class="chart">
        <div class="title">未提交审核人数</div>
        <div id="othersChart" :style="{width: '200px', height: '200px'}"></div>
      </div>
    </div>

    <div class="row">
      <div id="lineChart" :style="{width: '800px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      var e = 80
      var option = {
        title: {
          show: true,
          text: e + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontSize: '36',
            color: 'black',
            fontWeight: 'bolder'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false
        },
        series:
          {
            name: '',
            type: 'pie',
            radius: ['65%', '85%'],
            avoidLabelOverlap: true,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: e, name: ''},
              {value: 100 - e, name: ''}
            ]
          }
      }
      // 审核通过百分比
      let chart = this.$echarts.init(document.getElementById('examinedChart'))
      chart.setOption(option)
      // 待审核百分比
      chart = this.$echarts.init(document.getElementById('unexaminedChart'))
      chart.setOption(option)
      // 待审核百分比
      chart = this.$echarts.init(document.getElementById('othersChart'))
      chart.setOption(option)
      // 折线图
      chart = this.$echarts.init(document.getElementById('lineChart'))
      option = {
        title: {
          text: '注册人数变化',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['2019/1/17', '2019/1/28', '2019/1/29', '2019/1/30', '2019/1/31', '2019/2/1', '2019/2/2']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (val) {
              return val + '人'
            }
          }
        },
        series: [{
          data: [2, 3, 3, 4, 4, 4, 4],
          type: 'line'
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
  .row {
    width: 100%;
    margin: 30px 0;
    display: flex;
    justify-content: space-around;
  }

  .row .chart {
    display: flex;
    flex-direction: column;
  }

  .row .chart .title {
    font-size: 16pt;
    font-weight: bold;
  }
</style>
