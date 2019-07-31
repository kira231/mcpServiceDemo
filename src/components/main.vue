
<template>
  <div>
    <header class="header">
      <h3>多中心协同生物医学智能信息技术平台</h3>
    </header>

    <div class="wrapper">
      <div class="container-fluid">
        <div class="row fill-h">
          <div class="col-lg-3 fill-h">
            <div class="xpanel-wrapper xpanel-wrapper-2">
              <div class="xpanel">
                <div class="title">
                  <span style="margin-left:20px">研究列表</span>
                </div>
                <el-row style="height:80%">
                  <el-row v-for="content in contents"
                          :key="content.label"
                          style="margin:20px">
                    <el-popover placement="top-end"
                                width="200"
                                trigger="hover"
                                popper-class="my-popover">
                      <div class="el-popover-content">发起者： {{ content.initiator }}</div>
                      <div class="el-popover-content">参与者： {{ content.participator }}</div>
                      <div class="researchList"
                           slot="reference">
                        <p><i style="margin-right:20px">{{content.label}}</i>{{ content.name }}</p>
                      </div>
                    </el-popover>
                  </el-row>
                </el-row>
                <el-row>
                  <el-col :span="8"
                          :offset="16">
                    <el-button type="primary"
                               round
                               icon="el-icon-edit"
                               size="medium"
                               style="background-color:#5dc2fe">新建方案</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="col-lg-6 fill-h">
            <!-- <div class="xpanel-wrapper xpanel-wrapper-1">
              <div class="xpanel"> -->
            <!-- 地图散点 -->
            <!-- <s1Initiating ref="s1Initiating"></s1Initiating> -->
            <drilldownmap ref="drilldownmap"></drilldownmap>
          </div>
          <div class="col-lg-3 fill-h">
            <div class="xpanel-wrapper xpanel-wrapper-3">
              <div class="xpanel">
                <div class="fill-h">
                  <div class="title">
                    <span style="margin-left:20px">研究总览</span></div>
                  <el-row style="height:85%">
                    <table class="data-t">
                      <tr>
                        <th><img src="../static/img/icon-01.png" /></th>
                        <td>
                          <p><span>2000</span></p>
                          <p>协同研究发起总数</p>
                        </td>
                        <th><img src="../static/img/icon-02.png" /></th>
                        <td>
                          <p><span>1288</span></p>
                          <p>协同研究完成总数</p>
                        </td>
                      </tr>
                      <tr>
                        <th><img src="../static/img/icon-05.png" /></th>
                        <td>
                          <p><span>5236</span></p>
                          <p>正在分布式计算协同研究总数</p>
                        </td>
                        <th><img src="../static/img/icon-06.png" /></th>
                        <td>
                          <p><span>8567</span></p>
                          <p>还不知道叫什么</p>
                        </td>
                      </tr>
                    </table>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="xpanel-wrapper xpanel-wrapper-3">
              <div class="xpanel">
                <div class="title">
                  <span style="margin-left:20px">操作数据</span></div>
                <el-row style="height:80%"
                        class="performdata">
                  <el-carousel indicator-position="outside">
                    <el-carousel-item>
                      <el-row>
                        <i class="el-icon-thumb"
                           style="margin-top:20px;margin-left:20px;color:white;"> 发起研究情况</i>
                      </el-row>
                      <el-scrollbar style="height:80%;margin-top:20px"
                                    class-="el-scrollbar__wrap">
                        <el-row>
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
                           style="margin-top:20px;margin-left:20px;color:white;"> 参与研究情况</i>
                      </el-row>
                      <el-scrollbar style="height:80%;margin-top:20px"
                                    class-="el-scrollbar__wrap">
                        <el-row>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>

import echarts from 'echarts';
import s1Initiating from './s1Initiating.vue';
import drilldownmap from './drilldownmap';
export default {
  components: {
    s1Initiating,
    drilldownmap
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
      contents: [
        {
          label: 1,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 2,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 3,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 4,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 5,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 6,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 7,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
        {
          label: 8,
          name: '浙江省糖尿病发病率研究',
          initiator: '浙一',
          participator: '浙二、省肿瘤',
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SubTitle3 {
  font-size: 18px;
  color: #fafbfd;
  font-weight: 600;
}

.SubTitle3 i {
  font-size: 21px;
}
.block {
  color: #fafbfd;
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
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 14px;
  color: #333333;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  word-wrap: break-word;
}
table.gridtable th {
  border: 1px solid rgb(235, 238, 245);
  padding: 3px 7px 2px 7px;
  /* background-color: #eeeeee; */
  color: #eef0f5;
  width: 30%;
}
table.gridtable td {
  border: 1px solid rgb(235, 238, 245);
  padding: 3px 7px 2px 7px;
  background-color: #ffffff;
  width: 70%;
  word-wrap: break-word;
  text-align: center;
}
</style>
