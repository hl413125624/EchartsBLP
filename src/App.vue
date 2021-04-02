<template>
  <div id="app">
    <EchartsBLP :id='id' :boundaryGap='boundaryGap' :radius='radius' :Xkdata='Xkdata'  :splitLineShow_y='splitLineShow_y' :splitLineShow_x='splitLineShow_x'  :legendShow ='legendShow' :tooltipshow ='tooltipshow' :type='type' :widths='widths' :heights='heights' :Xdata='Xdata' :Ydata ='Ydata' ></EchartsBLP>
  </div>
</template>

<script>
import EchartsBLP from './bin/EchartsBLP'
export default {
  name: 'app',
  data () {
    return{
      id: 'EchartsBLPs',
      type: 'line',
      widths: 500,
      heights: 600,
      Xkdata:  ['星期一','星期二','星期三','星期四','星期五'],
      Xdata: ['星期一','星期二','星期三','星期四','星期五'],
      Ydata: [[20,151,56,9,80],[65,33,14,62,60],[46,50,42,30,58],[16,61,12,13,19],[26,20,26,23,28]],
      tooltipshow: true,
      legendShow: true,
      splitLineShow_x: true,
      splitLineShow_y: true,
      radius: ['50%'],
      boundaryGap: false
    }
  },
  components:{
    EchartsBLP
  }
}
</script>

<style>

</style>
