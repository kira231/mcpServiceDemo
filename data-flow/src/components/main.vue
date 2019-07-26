<template>
  <div>
    <el-row></el-row>
    <el-row type="flex"
            justify="center"
            class="platformName">
      多中心协同生物医学智能信息技术平台
    </el-row>
    <el-row type="flex"
            justify="space-between"
            style="margin:20px">
      <el-col :span="6">
        <chart title="研究列表">
          <el-row style="height:800px">
            <el-row style="margin:20px">
              <div class="block"
                   v-for="content in contents"
                   :key="content">
                <el-row type="flex"
                        align="middle"
                        style="margin-top:20px">
                  <span class="demonstration"><i class="el-icon-document"> {{ content }}</i></span>
                </el-row>
              </div>
              <!-- <div id="echartbirth"
                   style="margin-top:10px;height:300px;"></div>
              <div id="echartbirth2"
                   style="margin-top:10px;height:300px;"></div> -->
            </el-row>
          </el-row>
        </chart>
      </el-col>
      <el-col :span="10">
        <el-row style="height:800px">
          <el-row style="margin:20px">
            <div id="echartbirth4"
                 style="margin-top:10px;height:700px;"></div>
            <div id="echartbirth">
            </div>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <chart title="研究总览">
            <el-row style="height:400px">
              <el-row style="margin:10px">
                <div v-for="item in researchView"
                     :key="item.label"
                     class="text item">
                  <span v-if="item.label==0"><i class="el-icon-thumb"> </i> {{item.name}}</span>
                  <span v-if="item.label==1"><i class="el-icon-check"> </i> {{item.name}}</span>
                  <span v-if="item.label==2"><i class="el-icon-loading"> </i> {{item.name}}</span>
                  <div style="margin-top:10px;height:80px;background-color: rgba(250, 250, 253, 0.3)">
                    <el-row type="flex"
                            align="middle"
                            justify="space-between"
                            style="height:80px;margin-left:20px;">
                      <el-col :span="8">
                        <span class="researchNum0"
                              v-if="item.label==0">{{item.number}}</span>
                        <span class="researchNum1"
                              v-if="item.label==1">{{item.number}}</span>
                        <span class="researchNum2"
                              v-if="item.label==2">{{item.number}}</span>
                      </el-col>
                      <el-col :span="8">
                        <span class="researchNum">例</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-row>
          </chart>
        </el-row>
        <el-row style="margin-top:20px">
          <chart title="操作数据"
                 class="performdata">
            <el-row style="height:350px">
              <el-carousel indicator-position="outside">
                <el-carousel-item>
                  <el-row>
                    <i class="el-icon-thumb"
                       style="margin-top:20px;margin-left:20px"> 发起研究情况</i>
                  </el-row>
                  <el-scrollbar style="height:80%;margin-top:20px"
                                class-="el-scrollbar__wrap">
                    <el-row>
                      <!-- <el-col :span="12"> -->
                      <div class="block">
                        <el-timeline>
                          <el-timeline-item v-for="(activity, index) in activities"
                                            :key="index"
                                            :icon="activity.icon"
                                            :type="activity.type"
                                            :color="activity.color"
                                            :size="activity.size"
                                            :timestamp="activity.timestamp">
                            <div style="color:#FFF">
                              {{activity.content}}</div>
                          </el-timeline-item>
                        </el-timeline>

                      </div>
                    </el-row>
                  </el-scrollbar>
                </el-carousel-item>
                <el-carousel-item>
                  <el-row>
                    <i class="el-icon-user"
                       style="margin-top:20px;margin-left:20px"> 参与研究情况</i>
                  </el-row>
                  <el-scrollbar style="height:80%;margin-top:20px"
                                class-="el-scrollbar__wrap">
                    <el-row>
                      <!-- <el-col :span="12"> -->
                      <div class="block">
                        <el-timeline>
                          <el-timeline-item v-for="(activity, index) in activities2"
                                            :key="index"
                                            :icon="activity.icon"
                                            :type="activity.type"
                                            :color="activity.color"
                                            :size="activity.size"
                                            :timestamp="activity.timestamp">
                            <div style="color:#FFF">
                              {{activity.content}}</div>
                          </el-timeline-item>
                        </el-timeline>

                      </div>
                    </el-row>
                  </el-scrollbar>
                </el-carousel-item>
              </el-carousel>
            </el-row>
          </chart>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import chart from './chart.vue'
import echarts from 'echarts';
export default {
  components: {
    chart
  },
  data() {
    return {
      researchView: [
        {
          label: 0,
          name: '协同研究发起总数',
          number: 2000
        },
        {
          label: 1,
          name: '协同研究完成总数',
          number: 1588
        },
        {
          label: 2,
          name: '正在分布式计算协同研究总数',
          number: 32
        }
      ],
      activities: [{
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        size: 'large',
        timestamp: '2018-04-03 20:46',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }, {
        content: '邀请浙一发起了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#F56C6C'
      }],
      activities2: [{
        content: '作为发起者，参加了一个非常棒的研究',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为被邀请者，参加了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为发起者，参加了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为被邀请者，参加了一个非常棒的研究',
        size: 'large',
        timestamp: '2018-04-03 20:46',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为发起者，参加了一个非常棒的研究',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为被邀请者，参加了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为发起者，参加了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }, {
        content: '作为被邀请者，参加了一个非常棒的研究',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check',
        color: '#E6A23C'
      }],
      contents: ['浙江省糖尿病发病率研究', '浙江省肺癌发病率研究', '浙江省糖尿病发病率研究', '浙江省肺癌发病率研究', '浙江省糖尿病发病率研究', '浙江省肺癌发病率研究', '浙江省糖尿病发病率研究', '浙江省肺癌发病率研究',],
    }
  },
  mounted() {
    // this.getcharts1()
    this.getcharts2()
  },
  methods: {
    getcharts2() {
      var myChartbirth = echarts.init(document.getElementById('echartbirth4'));

      var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
      var days = ['Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

      var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

      myChartbirth.setOption({
        title: {
          text: 'Punch Card of Github',
          link: 'https://github.com/pissang/echarts-next/graphs/punch-card'
        },
        legend: {
          data: ['Punch Card'],
          left: 'right'
        },
        polar: {},
        tooltip: {
          formatter: function (params) {
            return params.value[2] + ' commits in ' + hours[params.value[1]] + ' of ' + days[params.value[0]];
          }
        },
        angleAxis: {
          type: 'category',
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            }
          }
        },
        radiusAxis: {
          type: 'category',
          data: days,
          axisLine: {
            show: false
          },
          axisLabel: {
            rotate: 45
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
            }
          }
        },
        series: [{
          name: 'Punch Card',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] * 2;
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          }
        }]
      })

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.platformName {
  color: white;
  font-size: 30px;
  font-family: "黑体";
  font-weight: bold;
}
.text {
  font-size: 16px;
  color: white;
}

.item {
  margin-bottom: 18px;
  /* background-color: rgba(6, 6, 94, 0.8); */
}
.researchNum0 {
  font-size: 20px;
  color: rgb(0, 0, 0);
}
.researchNum0 {
  font-size: 30px;
  color: rgb(91, 7, 112);
}
.researchNum1 {
  font-size: 30px;
  color: rgb(8, 219, 226);
}
.researchNum2 {
  font-size: 30px;
  color: rgb(200, 202, 81);
}
.performdata >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el_card {
  background-color: rgba(250, 250, 253, 0.3);
  height: 30px;
}
.main_context {
  color: #000;
  background-color: rgba(250, 250, 253, 0.3);
  height: 30px;
  font-size: 15px;
}
</style>
