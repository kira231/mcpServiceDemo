<template>
  <div class="map_wrapper">
    <div id="mapChart"
         class="drilldownmap"></div>
    <div class="action">
      <el-button type="primary"
                 :class="{highlight: step===1}"
                 @click="setStart"
                 size="small">作为发起方</el-button>
      <el-button type="primary"
                 :class="{highlight: step===2}"
                 @click="setPartner"
                 size="small">作为参与方</el-button>
      <el-button type="primary"
                 :class="{highlight: step===3}"
                 size="small"
                 @click="run"
                 style="padding-right:10px">发起研究<i class="el-icon-caret-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts';
// import "echarts/map/js/china.js";
// import "echarts/map/js/province/zhejiang.js";
// import hangzhoushi from '../../static/echarts-mapJson/geometryCouties/hangzhoushi.json'//完成杭州json
import hangzhou_geo from '../../static/echarts-mapJson/geometryCouties/hz_geo.json'//删去部分杭州市县json
export default {
  data() {
    return {
      chart: null,
      geoCoordMap: [
        { name: '之江实验室', value: [119.971006, 30.276948] },
        { name: '浙一', value: [120.184319, 30.26161] },
        { name: '浙二', value: [120.183847, 30.256681] },
        { name: '浙江医院', value: [120.131249, 30.255508] },
        { name: '妇产科医院', value: [120.174951, 30.262362] },
        { name: '邵逸夫医院', value: [120.20858, 30.262494] },
        { name: '儿童医院', value: [120.172346, 30.266237] },
        { name: '肿瘤医院', value: [120.197778, 30.358383] },
      ],
      HZData: [
        ['之江实验室', '浙一'],
        ['之江实验室', '浙二'],
      ],  // 起始地在前，目的地在后
      series: [],
      chartOption: {},
      basicScatter: {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        //波纹效果
        rippleEffect: {
          period: 2,
          brushType: 'stroke',
          scale: 3
        },
        showEffectOn: 'emphasis',
        label: {
          normal: {
            show: true,
            color: '#fff',
            position: 'right',
            formatter: '{b}'
          }
        },
        itemStyle: {
          color: '#ecc729'
        },
        // 圆点大小
        symbolSize: 7
      },
      basicLine: {
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
            color: '#d6cc74',
            width: 1,
            opacity: .5,
            curveness: 0.2  // 边的曲度
          }
        },
      },
      ifHighLight: [false, false, false],
      step: 0,
      startPoint: {},
      partnerPoint: [],
    }
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById('mapChart'));
    this.getSeries();
    this.getMap();
  },
  methods: {
    // 设定起始迁徙点
    convertData(data) {
      // data是HZData
      let res = data.map(item => {
        return {
          coords: [
            this.geoCoordMap.find(v => v.name == item[0]).value,
            this.geoCoordMap.find(v => v.name == item[1]).value,
          ]
        }
      })
      return res  // 起始地在前，目的地在后
    },
    getSeries() {
      this.series = [
        Object.assign({}, this.basicScatter, {
          data: this.geoCoordMap
        }),
        Object.assign({}, this.basicScatter, {
          showEffectOn: 'render',
          symbolSize: 10,
          data: []
        }),
        Object.assign({}, this.basicScatter, {
          showEffectOn: 'render',
          symbolSize: 10,
          itemStyle: {
            color: '#f9953f'
          },
          data: []
        }),
        Object.assign({}, this.basicScatter, {
          symbolSize: 10,
          data: []
        }),
        Object.assign({}, this.basicScatter, {
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            period: 2,
            brushType: 'stroke',
            scale: 2
          },
          itemStyle: {
            color: '#67C23A'
          },
          data: []
        }),
        Object.assign({}, this.basicLine, {
          data: []
        }),
      ]
      console.log(this.series)
    },
    getMap() {
      this.chartOption = {
        animation: false,
        legend: {  // 标签
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['行踪轨迹'],
          textStyle: {
            color: '#fff'
          }
        },
        geo: {  // 配置地图参数
          map: '浙江',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#044061",
              borderColor: "#019fd4",
              borderWidth: 1
            },
            emphasis: {
              areaColor: "#1e67b2"
            }
          }
        },
        series: this.series
      };
      console.log(this.chartOption)
      // 用$echarts是因为上面注册使用的 Vue.prototype.$echarts
      this.$echarts.registerMap('浙江', hangzhou_geo);
      this.chart.setOption(this.chartOption);
      this.chart.on('click', (info) => {
        if (this.step >= 3 || info.componentType !== 'series' || info.name === '之江实验室') {
          return;
        }
        if (this.step <= 1) {
          this.series[1].data = [this.geoCoordMap.find(i => i.name === info.name)];
          this.series[0].data = this.geoCoordMap.filter(i => i.name !== info.name);
          this.chart.setOption(this.chartOption);
          this.step = 1;
          this.startPoint = this.geoCoordMap.find(i => i.name === info.name);
        } else if (this.step == 2 && info.name !== this.startPoint.name) {
          if (!this.partnerPoint.find(i => i.name == info.name)) {
            this.series[2].data.push(this.geoCoordMap.find(i => i.name === info.name));
            this.series[0].data = this.series[0].data.filter(i => i.name !== info.name);
            this.chart.setOption(this.chartOption);
            this.partnerPoint.push(this.geoCoordMap.find(i => i.name === info.name))
          } else {
            this.series[0].data.push(this.geoCoordMap.find(i => i.name === info.name));
            this.series[2].data = this.series[2].data.filter(i => i.name !== info.name);
            this.chart.setOption(this.chartOption);
            this.partnerPoint = this.partnerPoint.filter(i => i.name !== info.name);
          }
        }
      });
    },
    setStart() {
      if (this.step == 1) {
        this.step = 2;
      }
    },
    setPartner() {
      if (this.step == 2 && this.partnerPoint.length > 0) {
        this.step = 3;
      }
    },
    run() {
      this.step = 4;
      this.runAnimation1();
      setTimeout(this.runAnimation2, 6000);
      setTimeout(this.runAnimation3, 12000);
      setTimeout(this.endAnimation, 24000);
    },
    runAnimation1() {
      this.series[0].data = this.geoCoordMap.filter(i => i.name !== this.startPoint.name && i.name !== '之江实验室');
      this.series[2].data = [];
      this.series[3].data = [this.geoCoordMap.find(i => i.name === '之江实验室')];
      this.series[5].data = this.convertData([[this.startPoint.name, '之江实验室']]);
      this.chart.setOption(this.chartOption);
    },
    runAnimation2() {
      this.series[3].data.push(this.startPoint);
      this.series[2].data = this.partnerPoint;
      this.series[1].data = [];
      this.series[5].data = this.convertData(this.partnerPoint.map(item => ['之江实验室', item.name]));
      this.chart.setOption(this.chartOption);
    },
    runAnimation3() {
      this.series[3].data = [this.geoCoordMap.find(i => i.name === '之江实验室')];
      this.series[1].data = [this.startPoint];
      this.series[5].data.push(...this.convertData([['之江实验室', this.startPoint.name], [this.startPoint.name, '之江实验室']]));
      this.series[5].data.push(...this.convertData(this.partnerPoint.map(item => [item.name, '之江实验室'])))
      this.chart.setOption(this.chartOption);
    },
    endAnimation() {
      this.series[5].data = [];
      this.series[4].data = [...this.series[1].data, ...this.series[2].data, ...this.series[3].data];
      this.series[1].data = this.series[2].data = this.series[3].data = [];
      this.chart.setOption(this.chartOption);
    }
  },

}
</script>

<style>
.map_wrapper {
  height: 100%;
}
.map_wrapper .drilldownmap {
  height: 100%;
}
.map_wrapper .action {
  position: absolute; /* bootstrap对这个vue外面的div有设定relative，所以是针对那个div的。该div写在地图div后面，所以处在地图上方 */
  top: 5px;
}
.map_wrapper .action button {
  background-color: #1577a5;
}
.map_wrapper .action .highlight {
  background-color: #019fd4;
}
</style>


