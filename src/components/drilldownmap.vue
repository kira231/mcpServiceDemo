<template>
  <div id="mapChart"
       class="map"></div>
</template>

<script>
import echarts from 'echarts';
import "echarts/map/js/china.js";
import "echarts/map/js/province/zhejiang.js";
import hangzhoushi from '../../static/echarts-mapJson/geometryCouties/hangzhoushi.json'
import hangzhou_geo from '../../static/echarts-mapJson/geometryCouties/hz_geo.json'
export default {
  data() {
    return {
      hangzhouJson: hangzhoushi

    }
  },
  mounted() {
    this.getMap()
  },
  methods: {
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
        series: [
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
            symbolSize: 16,
            // data: convertData(data),
          }
        ]
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


