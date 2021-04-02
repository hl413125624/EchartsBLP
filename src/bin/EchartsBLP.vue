<template>
  <div :id="id" :style="{ width: widths + 'px', height: heights + 'px' }"></div>
</template>
<script>
import Colors from './color'
export default {
  name: "EchartsBLP",
  props: {
    // 唯一的id 必须
    id: {
      type: String,
      default: "",
    },
    // 类型
    type: {
      type: String,
    },
    // 宽度
    widths: {
      type: Number,
      default: "",
    },
    // 高度
    heights: {
      type: Number,
      default: "",
    },
    // 折线 柱状  xy轴数据  必传    饼图Ydata就是数据[]  Xdata就是名字[]
    Xdata: {
      type: Array,
    },
    Ydata: {
      type: Array,
    },
    // pie 名字
    PieName: {
      type: String,
    },
    // 环形/饼形
    radius: {
      type: Array,
    },
    // // Xkdata x默认数据 非饼图才传
    Xkdata: {
      type: Array,
    },
    // 颜色Color
    Color: {
      type: Array,
    },
    // 缩略图显示/隐藏
    legendShow: {
      type: Boolean,
    },
    // line折线 true 为平滑曲线，false为直线
    smooth: {
      type: Boolean,
    },
    //line折线 去掉折线图中的节点
    symbol: {
      type: String,
    },
    // 折线填充色 colorStops不传没得填充色 数据格式为：  [{offset:0.2,color:'rgba(255,0,0,0.1)'},{offset:1,color:'rgba(255,0,0,0.6)'}] 0.6 为透明度
    colorStops: {
      type: Array,
    },
    // 显示/隐藏 x轴(包括数值) true是显示/false是隐藏
    xAxiShow: {
      type: Boolean,
    },
    // 显示/隐藏 y轴（包括数值) true是显示/false是隐藏
    yAxiShow: {
      type: Boolean,
    },
    //  true 隐藏 false 显示 网格线x
    splitLineShow_x: {
      type: Boolean,
    },
    // true 隐藏 false 显示 网格线y
    splitLineShow_y: {
      type: Boolean,
    },
    // 设置y轴颜色 轴色 默认'#000'
    lineStyleColor_y: {
      type: String,
    },
    // 设置x轴颜色 轴色 默认'#000'
    lineStyleColor_x: {
      type: String,
    },
    // 设置 y轴隐藏
    axisLineShow_y: {
      type: Boolean,
    },
    //设置 x轴隐藏
    axisLineShow_x: {
      type: Boolean,
    },
    // 显示x 刻度线
    axisTickShow_x: {
      type: Boolean,
    },
    // 显示y 刻度线
    axisTickShow_y: {
      type: Boolean,
    },
    // 默认 是否从0刻度线开始 默认从0 刻度开始 ture/不从0刻度开始 false/从0刻度开始
    boundaryGap: {
      type: Boolean,
    },
    titlePosition: {
      type: String,
    },
    tooltipshow: {
      type: Boolean,
    },
    // 柱形图刻度线在中间还是两边
    alignWithLabel:{
      type: Boolean,
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.linePieType();
    });
  },
  methods: {
    linePieType() {
      let _this = this;
      let {
        PieName,
        type,
        Xdata,
        Xkdata,
        Color,
        legendShow,
        yAxiShow,
        xAxiShow,
        lineStyleColor_y,
        splitLineShow_x,
        splitLineShow_y,
        axisLineShow_y,
        axisLineShow_x,
        lineStyleColor_x,
        axisTickShow_x,
        axisTickShow_y,
        boundaryGap,
        titlePosition,
        tooltipshow,
        alignWithLabel
      } = _this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = _this.$echarts.init(document.getElementById(`${this.id}`));
      var option = {
        //   名字
        title: {
          show: PieName != "" ? true : false,
          text: PieName,
          left: titlePosition ? titlePosition : "center",
        },
        // 饼图 移入显示
        tooltip: {
          trigger: type == "pie" ? "item" : "axis",
          show: tooltipshow,
        },
        // 缩略图位置 及 名字
        legend: {
          show: legendShow,
          // orient: "vertical",
          // left: "left",
          data: type=='pie'?Xdata: Xkdata,
        },
        grid: {
          top: PieName ? "8%" : "5%",
          left: "8%",
          right: "4%",
          bottom: "18%",
          // containLabel: true
        },
        // 颜色 color
        color: Color ? Color : Colors.Color,
        xAxis: {
          show: type == "pie" ? false : !xAxiShow ? true : false,
          type: "category",
          boundaryGap: !boundaryGap ? false : true,
          data: Xdata,
          splitLine: {
            show: !splitLineShow_x ? true : false,
            lineStyle: {
              type: "dashed",
            },
          },
          axisTick: {
            //决定是否显示坐标刻度
            show: !axisTickShow_x? true : false,
            alignWithLabel: !alignWithLabel? true : false,
          },
          axisLine: {
            show: !axisLineShow_x ? true : false,
            lineStyle: {
              color: lineStyleColor_x ? lineStyleColor_x : "#000",
            },
          },
        },
        yAxis: {
          show: type == "pie" ? false : !yAxiShow ? true : false,
          type: "value",
          splitLine: {
            show: !splitLineShow_y ? true : false,
            lineStyle: {
              type: "dashed",
            },
          },
          axisTick: {
            //决定是否显示坐标刻度
            // alignWithLabel: false,
            show: !axisTickShow_y ? true : false,
          },
          axisLine: {
            show: !axisLineShow_y ? true : false,
            lineStyle: {
              color: lineStyleColor_y ? lineStyleColor_y : "#000",
            },
          },
        },
        series: _this.Pie_line_Series(),
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // pie series
    Pie_line_Series() {
      let _this = this;
      let {
        Xdata,
        Ydata,
        Xkdata,
        PieName,
        type,
        radius,
        symbol,
        smooth,
        colorStops,
      } = _this;
      let seriseData = [];
      if (type == "pie") {
        seriseData = [
          {
            name: PieName,
            type: type,
            radius: radius.length == 2 ? radius : radius[0],
            center: radius.length == 2 ? "50%" : ["50%", "40%"],
            data: _this.picFun(),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ];
        return seriseData;
      } else if (type == "line") {
        seriseData = [];
        if (Xkdata.length == Ydata.length) {
          Xkdata.forEach((item, index) => {
            let arr = {
              name: item,
              type: type,
              data: Ydata[index],
            };
            //去掉折线图中的节点
            if (_this.symbol) arr.symbol = symbol;
            //true 为平滑曲线，false为直线
            if (_this.smooth) arr.smooth = smooth;
            seriseData.push(arr);
          });
        } else {
          let jklow = {
            name: Xkdata, //
            type: type,
            data: Ydata,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: colorStops ? colorStops : [],
                global: false, // 缺省为 false
              },
            },
          };
          //去掉折线图中的节点
          if (_this.symbol) jklow.symbol = symbol;
          //true 为平滑曲线，false为直线
          if (_this.smooth) jklow.smooth = smooth;
          seriseData = jklow;
        }
        return seriseData;
      }else{
        let arrObj =  {
          name: Xkdata[0],
          type: 'bar',
          barWidth: '50%',
          data: Ydata
        }
        seriseData = arrObj
        console.log(arrObj)
       return seriseData;
      }
    },
    picFun() {
      let _this = this;
      let { Xdata, Ydata } = _this;
      let dataSun = [];
      Xdata.forEach((item, index) => {
        let picket = {
          name: item,
          value: Ydata[index],
        };
        dataSun.push(picket);
      });
      return dataSun;
    },
  },
  watch: {
    Xdata: {
      handler(newold, old) {
        this.linePieType();
      },
    },
    Ydata: {
      handler(newold, old) {
        this.linePieType();
      },
    },
  },
};
</script>
<style>
</style>