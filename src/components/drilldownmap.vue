<template>
  <div id="mapChart"
       class="map"></div>
</template>

<script>
import echarts from 'echarts';
import "echarts/map/js/china.js";
import "echarts/map/js/province/zhejiang.js";
import hangzhoushi from '../../static/echarts-mapJson/geometryCouties/hangzhoushi.json'//完成杭州json
import hangzhou_geo from '../../static/echarts-mapJson/geometryCouties/hz_geo.json'//删去部分杭州市县json
export default {
  data() {
    return {
      geoCoordMap: {
        '之江实验室': [119.971006, 30.276948],
        '浙一': [120.184319, 30.26161],
        '浙二': [120.183847, 30.256681]
      },
      HZData: [
        [{ name: '之江实验室' }, { name: '浙一', value: 10 }],
        [{ name: '之江实验室' }, { name: '浙二', value: 20 }],
      ],//起始地在前，目的地在后
      series: [],
    }
  },
  mounted() {
    this.getSeries()
    this.getMap()
  },
  methods: {
    //设定起始迁徙点
    convertData(data) {
      var res = []
      //data是HZData
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i]
        var fromCoord = this.geoCoordMap[dataItem[0].name]
        var toCoord = this.geoCoordMap[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord
            },
            {
              coord: toCoord,
              value: dataItem[0].value
            }
          ])
        }
      }
      return res//起始地在前，目的地在后
    },
    getSeries() {
      var _this = this
      var array = [['之江实验室', this.HZData]]
      var series = []
      array.forEach(function (item, i) {
        series.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 3,  // 特效动画的时间
              trailLength: 0.02,  // 特效尾迹的长度
              symbol: 'arrow',
              symbolSize: 5,
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: .5,
                curveness: 0.2  // 边的曲度
              }
            },
            data: _this.convertData(item[1])
          },
          {//根据数据展示点，并显示为波纹效果
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            //波纹效果
            rippleEffect: {
              period: 2,
              brushType: 'stroke',
              scale: 3
            },
            label: {
              normal: {
                show: true,
                color: '#fff',
                position: 'right',
                formatter: '{b}'
              }
            },
            //圆点大小
            symbolSize: 5,
            data: [
              { name: '之江实验室', value: [119.971006, 30.276948] },
              { name: '浙一', value: [120.184319, 30.26161] },
              { name: '浙二', value: [120.183847, 30.256681] },
            ],
          },
        )
      })
      this.series = series

    },
    getMap() {
      let that = this
      let mapOption = {
        animation: false,
        legend: { //标签
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['行踪轨迹'],
          textStyle: {
            color: '#fff'
          }
        },
        // visualMap: {//颜色轴，可以根据数据点的值大小，展示不同的颜色，或用来展示地图块的不同颜色
        //   min: 0,
        //   max: 200,
        //   calculable: true,
        //   inRange: {
        //     color: ["#3dda8e", "#eac736", "#d94e5d"]
        //   },
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        geo: {//配置地图参数
          map: '浙江',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#058bd2",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#1e67b2"
            }
          }
        },
        series: this.series
        // [
        //   {//根据数据展示点，并显示为波纹效果
        //     type: 'effectScatter',
        //     coordinateSystem: 'geo',
        //     zlevel: 2,
        //     //波纹效果
        //     rippleEffect: {
        //       period: 2,
        //       brushType: 'stroke',
        //       scale: 3
        //     },
        //     label: {
        //       normal: {
        //         show: true,
        //         color: '#fff',
        //         position: 'right',
        //         formatter: '{b}'
        //       }
        //     },
        //     //圆点大小
        //     symbolSize: 5,
        //     data: [
        //       { name: '之江实验室', value: [119.971006, 30.276948] },
        //       { name: '浙一', value: [120.184319, 30.26161] },
        //       { name: '浙二', value: [120.183847, 30.256681] },
        //     ],
        //   },
        // ]
      }
      //用$echarts是因为上面注册使用的 Vue.prototype.$echarts
      let myChart = this.$echarts.init(document.getElementById('mapChart'))
      myChart.setOption(mapOption)
      that.$echarts.registerMap('浙江', hangzhou_geo);
      myChart.setOption(mapOption)

    }
  },

}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>


