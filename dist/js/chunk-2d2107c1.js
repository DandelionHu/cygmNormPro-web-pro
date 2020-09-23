(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2107c1"],{b7a7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page-header-wrapper",[a("a-card",{attrs:{"body-style":{padding:"15px 20px"},bordered:!1}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showList,expression:"showList"}]},[a("a-form",{attrs:{layout:"inline"}},[a("a-form-item",{staticClass:"width250",attrs:{label:"关键字",labelCol:{span:8},wrapperCol:{span:16}}},[a("a-input",{attrs:{name:"keyword",placeholder:"请输入关键字"},on:{change:e.onSearch},model:{value:e.queryParam.keyword,callback:function(t){e.$set(e.queryParam,"keyword",t)},expression:"queryParam.keyword"}})],1),a("a-form-item",{attrs:{label:"创建日期",labelCol:{span:6},wrapperCol:{span:18}}},[a("a-range-picker",{attrs:{placeholder:["开始日期","结束日期"]},on:{change:e.onDateChange},model:{value:e.searchData,callback:function(t){e.searchData=t},expression:"searchData"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")]),a("a-button",{staticClass:"m-l10",attrs:{type:"primary",ghost:""},on:{click:e.onReset}},[e._v("重置")]),a("a-button",{staticClass:"m-l10",attrs:{type:"normal"},on:{click:e.onAdd}},[e._v("添加")])],1)],1),a("s-table",{ref:"table",staticClass:"m-t10",attrs:{size:"default",rowKey:"id",columns:e.columns,data:e.loadData,showPagination:"auto"},scopedSlots:e._u([{key:"picture",fn:function(e){return a("img",{attrs:{src:e}})}},{key:"state",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("state")(t))+" ")])}},{key:"isRecommend",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("isRecommend")(t))+" ")])}},{key:"releaseTime",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("dayjs")(t))+" ")])}},{key:"action",fn:function(t,n){return a("span",{},[[a("a",{staticClass:"table-look",on:{click:function(t){return e.handleLook(n)}}},[e._v("查看")]),a("a-divider",{attrs:{type:"vertical"}}),a("a",{staticClass:"table-edit",on:{click:function(t){return e.handleEdit(n)}}},[e._v("编辑")]),a("a-divider",{attrs:{type:"vertical"}}),1===n.state||3===n.state?[a("a",{staticClass:"table-again",on:{click:function(t){return e.handleState(n)}}},[e._v(e._s(1==n.state?"禁用":3==n.state?"启用":""))]),a("a-divider",{attrs:{type:"vertical"}})]:e._e(),2===n.state?[a("a",{staticClass:"table-again",on:{click:function(t){return e.handleState(n)}}},[e._v("审核")]),a("a-divider",{attrs:{type:"vertical"}})]:e._e(),a("a",{staticClass:"table-delete",on:{click:function(t){return e.handleDelete(n)}}},[e._v("删除")])]],2)}}])})],1),e.showInfo?a("news-info",{attrs:{editID:e.editID},on:{editClose:e.editClose}}):e._e(),e.showAdd?a("news-add",{attrs:{editID:e.editID},on:{editClose:e.editClose}}):e._e()],1)],1)},r=[],s=(a("99af"),a("96cf"),a("1da1")),i=a("e363"),o=a("2af9"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("a-descriptions",{attrs:{bordered:"",column:2,size:"middle"}},[a("template",{slot:"title"},[e._v(" 新闻详情 "),a("a-button",{staticClass:"f-r",attrs:{type:"primary",ghost:""},on:{click:e.onGoback}},[e._v("返回")])],1),a("a-descriptions-item",{attrs:{label:"标题"}},[e._v(e._s(e.info.title))]),a("a-descriptions-item",{attrs:{label:"封面图片"}},[a("img",{attrs:{src:e.info.picture}})]),a("a-descriptions-item",{attrs:{label:"来源于"}},[e._v(e._s(e.info.source))]),a("a-descriptions-item",{attrs:{label:"作者"}},[e._v(e._s(e.info.author))]),a("a-descriptions-item",{attrs:{label:"栏目"}},[e._v(e._s(e.info.fieldName))]),a("a-descriptions-item",{attrs:{label:"公司"}},[e._v(e._s(e.info.enterpriseName))]),a("a-descriptions-item",{attrs:{label:"点击次数"}},[e._v(e._s(e.info.clickNum))]),a("a-descriptions-item",{attrs:{label:"状态"}},[e._v(e._s(e._f("state")(e.info.state)))]),a("a-descriptions-item",{attrs:{label:"是否推荐"}},[e._v(e._s(e._f("isRecommend")(e.info.isRecommend)))]),a("a-descriptions-item",{attrs:{label:"发布时间"}},[e._v(e._s(e._f("dayjs")(e.info.releaseTime)))]),a("a-descriptions-item",{attrs:{label:"内容"}},[a("u-editor",{attrs:{value:e.info.content,contenteditable:!1,prefixCls:"ant-editor-info"}})],1)],2)],1)},l=[],u=(a("a9e3"),{name:"NewsInfo",components:{UEditor:o["c"]},props:{editID:{type:[Number,String],default:""}},data:function(){return{info:{}}},filters:{state:function(e){var t={1:"正常",2:"待审",3:"禁用",4:"不通过"};return t[e]||""},isRecommend:function(e){var t={1:"是",0:"否"};return t[e]||""}},mounted:function(){var e=this;this.$nextTick((function(){e.editID&&e.loadInfo(e.editID)}))},methods:{loadInfo:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(i["s"])({id:e});case 2:n=a.sent,r=n.returnValue,t.info=r;case 5:case"end":return a.stop()}}),a)})))()},onGoback:function(){this.$emit("editClose")}}}),d=u,p=a("2877"),m=Object(p["a"])(d,c,l,!1,null,"7c2a7c14",null),f=m.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-form",{attrs:{form:e.form}},[a("a-form-item",{attrs:{label:"标题",labelCol:{lg:{span:2},sm:{span:4}},wrapperCol:{lg:{span:6},sm:{span:8}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["title",{rules:[{required:!0,message:"请输入标题",whitespace:!0},{min:2,max:15,message:"请输入长度2到15位",whitespace:!0}]}],expression:"[\n        'title',\n        {rules: [{ required: true, message: '请输入标题',whitespace: true },\n                 { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}\n      ]"}],attrs:{name:"title",placeholder:"请输入标题"}})],1),a("a-form-item",{attrs:{label:"来源",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["source"],expression:"['source']"}],attrs:{name:"source",placeholder:"请输入来源"}})],1),a("a-form-item",{attrs:{label:"作者",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["author"],expression:"['author']"}],attrs:{name:"author",placeholder:"请输入作者"}})],1),a("a-form-item",{attrs:{label:"栏目",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["fieldId",{rules:[{required:!0,message:"请选择栏目",whitespace:!0}]}],expression:"[\n        'fieldId',\n        {rules: [{ required: true, message: '请选择栏目',whitespace: true }]}\n      ]"}],attrs:{name:"fieldId",placeholder:"请选择栏目"}},e._l(e.tagList,(function(t,n){return a("a-select-option",{key:n,attrs:{value:t.id}},[e._v(" "+e._s(t.title)+" ")])})),1)],1),a("a-form-item",{attrs:{label:"公司",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["enpId",{rules:[{required:!0,message:"请选择公司",whitespace:!0}]}],expression:"[\n        'enpId',\n        {rules: [{ required: true, message: '请选择公司',whitespace: true }]}\n      ]"}],attrs:{name:"enpId",placeholder:"请选择公司"}},e._l(e.enpList,(function(t,n){return a("a-select-option",{key:n,attrs:{value:t.id}},[e._v(" "+e._s(t.name)+" ")])})),1)],1),a("a-form-item",{attrs:{label:"是否推荐",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["isRecommend",{initialValue:0}],expression:"['isRecommend',{ 'initialValue': 0 }]"}]},[a("a-radio",{attrs:{value:0}},[e._v(" 否 ")]),a("a-radio",{attrs:{value:1}},[e._v(" 是 ")])],1)],1),a("a-form-item",{attrs:{label:"封面图片",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("upload-img",{directives:[{name:"decorator",rawName:"v-decorator",value:["picture",{rules:[{required:!0,message:"请上传图片",whitespace:!0}]}],expression:"[\n        'picture',\n        {rules: [{ required: true, message: '请上传图片',whitespace: true }]}\n      ]"}],attrs:{name:"picture",num:1,fileList:e.fileList},on:{uploadList:e.uploadList}})],1),a("a-form-item",{attrs:{label:"内容",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:16},sm:{span:16}}}},[a("u-editor",{directives:[{name:"decorator",rawName:"v-decorator",value:["content",{initialValue:"",rules:[{required:!0,message:"请输入内容",whitespace:!0}]}],expression:"['content',\n          {'initialValue': '',\n            rules: [{ required: true, message: '请输入内容',whitespace: true }]\n          }]"}],attrs:{name:"content"},on:{change:e.editorChange}})],1),a("a-form-item",{staticClass:"ta-c",attrs:{wrapperCol:{lg:{span:6},sm:{span:9}}}},[a("a-button",{attrs:{type:"primary",ghost:""},on:{click:e.onCancel}},[e._v("取消")]),a("a-button",{staticClass:"m-l10",attrs:{type:"primary",loading:e.lodingBtn,disabled:e.lodingBtn},on:{click:e.onSave}},[e._v("保存 ")])],1)],1)},v=[],w=(a("4160"),a("a15b"),a("d3b7"),a("159b"),a("5530")),g={name:"NewsAdd",components:{UploadImg:o["d"],UEditor:o["c"]},props:{editID:{type:[Number,String],default:""}},data:function(){return{form:this.$form.createForm(this),lodingBtn:!1,fileList:[],type:1,tagList:[],enpList:[],groups:"groups_news"}},mounted:function(){var e=this;this.getTagList(),this.getEnpList(),this.$nextTick((function(){e.handleReset(),e.editID&&e.loadInfo(e.editID)}))},methods:{handleReset:function(){this.form.resetFields()},onCancel:function(){this.$emit("editClose")},onSave:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){if(!e){t.lodingBtn=!0;var n=Object(w["a"])({},a);n.id=t.editID,n.type=t.type,Object(i["u"])(n).then((function(e){e.returnValue&&(t.editID?t.$message.info("编辑成功"):t.$message.info("保存成功"),t.onCancel())})).catch((function(e){})).finally((function(){t.lodingBtn=!1}))}}))},loadInfo:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r,s,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.form,a.next=3,Object(i["s"])({id:e});case 3:r=a.sent,s=r.returnValue,n.setFieldsValue({title:s.title,source:s.source,fieldId:s.fieldId,enpId:s.enpId,isRecommend:s.isRecommend,picture:s.picture,content:s.content,author:s.author}),s.picture&&(o={status:"done",uid:s.picture,name:s.picture,url:s.picture},t.fileList.push(o));case 7:case"end":return a.stop()}}),a)})))()},uploadList:function(e){var t=[];e.forEach((function(e,a){t.push(e.url)})),this.form.setFieldsValue({picture:t.join(",")})},editorChange:function(e){this.form.setFieldsValue({content:e})},getTagList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={groups:e.groups},t.next=3,Object(i["i"])(a);case 3:n=t.sent,r=n.returnValue,e.tagList=r;case 6:case"end":return t.stop()}}),t)})))()},getEnpList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["e"])({});case 2:a=t.sent,n=a.returnValue,e.enpList=n;case 5:case"end":return t.stop()}}),t)})))()}}},b=g,_=Object(p["a"])(b,h,v,!1,null,"331aad17",null),x=_.exports,y={name:"NewsList",components:{STable:o["b"],Ellipsis:o["a"],NewsInfo:f,NewsAdd:x},data:function(){var e=this;return{showList:!0,showAdd:!1,showInfo:!1,editID:"",columns:[{title:"序号",dataIndex:"id",customRender:function(e,t,a){return a+1}},{title:"标题",dataIndex:"title"},{title:"封面图片",dataIndex:"picture",scopedSlots:{customRender:"picture"}},{title:"来源于",dataIndex:"source"},{title:"作者",dataIndex:"author"},{title:"栏目",dataIndex:"fieldName"},{title:"公司",dataIndex:"enterpriseName"},{title:"状态",dataIndex:"state",scopedSlots:{customRender:"state"}},{title:"是否推荐",dataIndex:"isRecommend",scopedSlots:{customRender:"isRecommend"}},{title:"发布时间",dataIndex:"releaseTime",scopedSlots:{customRender:"releaseTime"}},{title:"点击次数",dataIndex:"clickNum"},{title:"操作",dataIndex:"action",width:"220px",scopedSlots:{customRender:"action"}}],queryParam:{},searchData:[],type:1,loadData:function(t){var a=Object.assign({},t,e.queryParam);return a.type=e.type,e.getList(a)}}},filters:{state:function(e){var t={1:"正常",2:"待审",3:"禁用",4:"不通过"};return t[e]||""},isRecommend:function(e){var t={1:"是",0:"否"};return t[e]||""}},computed:{},created:function(){},methods:{onSearch:function(){this.$refs.table.refresh(!0)},onReset:function(){this.queryParam={},this.searchData=[],this.onSearch()},onDateChange:function(e,t){this.queryParam.startDate=t[0],this.queryParam.endDate=t[1],this.onSearch()},getList:function(e){return Object(i["t"])(e).then((function(e){return e}))},onAdd:function(){this.editID="",this.showList=!1,this.showInfo=!1,this.showAdd=!0},handleLook:function(e){this.editID=e.id,this.showList=!1,this.showAdd=!1,this.showInfo=!0},handleEdit:function(e){this.editID=e.id,this.showList=!1,this.showInfo=!1,this.showAdd=!0},editClose:function(){this.showList=!0,this.showAdd=!1,this.showInfo=!1,this.onRefresh()},handleDelete:function(e){var t=this;this.$confirm({title:"删除提示",content:"真的要删除 ".concat(e.title," 吗?"),okText:"删除",okType:"primary",cancelText:"取消",onOk:function(){return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={ids:[]},n.ids.push(e.id),a.next=4,Object(i["r"])(n);case 4:r=a.sent,s=r.returnValue,s&&(t.$message.info("删除成功"),t.onRefresh());case 7:case"end":return a.stop()}}),a)})))()}})},onRefresh:function(){this.$refs.table.refresh()},handleState:function(e){var t=this,a={1:"禁用",2:"审核通过",3:"启用"};this.$confirm({title:a[e.state]+"提示",content:"真的要".concat(a[e.state]).concat(e.title," 吗?"),okText:"".concat(a[e.state]),okType:"primary",cancelText:2===e.state?"不通过":"取消",onOk:function(){return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={ids:[],state:1===e.state?3:1},r.ids.push(e.id),n.next=4,Object(i["v"])(r);case 4:s=n.sent,o=s.returnValue,o&&(t.$message.info("".concat(a[e.state],"成功")),setTimeout((function(){t.onRefresh()}),1e3));case 7:case"end":return n.stop()}}),n)})))()},onCancel:function(){return Object(s["a"])(regeneratorRuntime.mark((function n(){var r,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(2!==e.state){n.next=8;break}return r={ids:[],state:4},r.ids.push(e.id),n.next=5,Object(i["v"])(r);case 5:s=n.sent,o=s.returnValue,o&&(t.$message.info("".concat(a[e.state],"成功")),setTimeout((function(){t.onRefresh()}),1e3));case 8:case"end":return n.stop()}}),n)})))()}})}}},k=y,I=Object(p["a"])(k,n,r,!1,null,"0bdb5965",null);t["default"]=I.exports}}]);