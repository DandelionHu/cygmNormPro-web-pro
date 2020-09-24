<template>
  <div>
    <biaoqing @contentChange="contentChange"
              :type="0"
              width="50%"
              height="300px"
              id="biaoqing1"
              value="😱🍓🍺123456☕🍀🌱" />
    <div style="width: 80%;margin: 20px auto;">
      <h1>使用：</h1>
      <h2>import biaoqing from './biaoqing.vue'</h2>
      <h2>components: { biaoqing }</h2>
      <h2>
        <div>页面元素</div>{{text}}
      </h2>
      <h1 class="mt20">现有的bug:</h1>
      <div class="red">当文本框里多个表情相连时，点击表情之间，文本框无法获取焦点问题。</div>
      <div>在网上也看过好多表情插件，貌似都有这个问题存在。试过好多方法，我暂时未想到解决方案。</div>
      <h1 class="mt20">props</h1>
      <el-table :data="tableData"
                center>
        <el-table-column prop="name"
                         label="参数">
        </el-table-column>
        <el-table-column prop="text"
                         label="说明">
        </el-table-column>
        <el-table-column prop="type"
                         align="center"
                         label="类型">
        </el-table-column>
        <el-table-column prop="value"
                         label="可选值">
        </el-table-column>
        <el-table-column prop="defaultVal"
                         label="默认值">
        </el-table-column>
      </el-table>

      <h1 class="mt20">Events</h1>
      <el-table :data="incident"
                center>
        <el-table-column prop="name"
                         label="事件名称">
        </el-table-column>
        <el-table-column prop="text"
                         label="说明">
        </el-table-column>

        <el-table-column prop="callBack"
                         label="回调参数">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import biaoqing from './biaoqing.vue'
export default {
  components: {
    biaoqing
  },
  data () {
    return {
      text: ' <biaoqing @contentChange="contentChange" width="80%" height="300px" id="biaoqing1" value="😱🍓🍺123456☕🍀🌱"/>',
      tableData: [
        {
          name: 'width',
          text: '表情输入框宽度',
          type: 'String',
          value: '--',
          defaultVal: '50%',
        },
        {
          name: 'height',
          text: '表情输入框高度',
          type: 'String',
          value: '--',
          defaultVal: '200px',
        },
        {
          name: 'id',
          text: '表情输入框ID,页面多个表情输入框时传唯一值，区分',
          type: 'String',
          value: '--',
          defaultVal: 'text',
        },
        {
          name: 'value',
          text: '表情输入框默认内容',
          type: 'String',
          value: '--',
          defaultVal: '',
        },

      ],
      incident: [
        {
          name: 'contentChange',
          text: '表情文本框失去焦点时触发',
          callBack: '回调一个对象回来 {id:"你传过去的id",value:"文本框里的内容"}'

        }
      ]
    };
  },

  methods: {
    contentChange (date) {
    },

  },

  created () {
  },
  mounted () {
  },
};
</script>
<style lang='less' scoped>
.mt20 {
  margin-top: 20px;
}
.red {
  color: red;
  font-size: 14px;
}
</style>














3
