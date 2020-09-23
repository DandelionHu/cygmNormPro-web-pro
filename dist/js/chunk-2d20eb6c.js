(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20eb6c"],{b118:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("page-header-wrapper",[a("a-card",{attrs:{"body-style":{padding:"15px 20px"},bordered:!1}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.showList,expression:"showList"}]},[a("a-form",{attrs:{layout:"inline"}},[a("a-form-item",{staticClass:"width250",attrs:{label:"关键字",labelCol:{span:8},wrapperCol:{span:16}}},[a("a-input",{attrs:{name:"keyword",placeholder:"请输入关键字"},on:{change:e.onSearch},model:{value:e.queryParam.keyword,callback:function(t){e.$set(e.queryParam,"keyword",t)},expression:"queryParam.keyword"}})],1),a("a-form-item",{attrs:{label:"创建日期",labelCol:{span:6},wrapperCol:{span:18}}},[a("a-range-picker",{attrs:{placeholder:["开始日期","结束日期"]},on:{change:e.onDateChange},model:{value:e.searchData,callback:function(t){e.searchData=t},expression:"searchData"}})],1),a("a-form-item",[a("a-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")]),a("a-button",{staticClass:"m-l10",attrs:{type:"primary",ghost:""},on:{click:e.onReset}},[e._v("重置")]),a("a-button",{staticClass:"m-l10",attrs:{type:"normal"},on:{click:e.onAdd}},[e._v("添加")])],1)],1),a("s-table",{ref:"table",staticClass:"m-t10",attrs:{size:"default",rowKey:"id",columns:e.columns,data:e.loadData,showPagination:"auto"},scopedSlots:e._u([{key:"state",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("state")(t))+" ")])}},{key:"isStars",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("isStars")(t))+" ")])}},{key:"isNews",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("isNews")(t))+" ")])}},{key:"sortNo",fn:function(t,n,s){return a("span",{},[e._v(" "+e._s(s)+" ")])}},{key:"createTime",fn:function(t){return a("span",{},[e._v(" "+e._s(e._f("dayjs")(t))+" ")])}},{key:"action",fn:function(t,n){return a("span",{},[[a("a",{staticClass:"table-look",on:{click:function(t){return e.handleLook(n)}}},[e._v("查看")]),a("a-divider",{attrs:{type:"vertical"}}),a("a",{staticClass:"table-edit",on:{click:function(t){return e.handleEdit(n)}}},[e._v("编辑")]),a("a-divider",{attrs:{type:"vertical"}}),a("a",{staticClass:"table-again",on:{click:function(t){return e.handleReset(n)}}},[e._v("禁用")]),a("a-divider",{attrs:{type:"vertical"}}),a("a",{staticClass:"table-again",on:{click:function(t){return e.handleReset(n)}}},[e._v("审核")]),a("a-divider",{attrs:{type:"vertical"}}),a("a",{staticClass:"table-delete",on:{click:function(t){return e.handleDelete(n)}}},[e._v("删除")])]],2)}}])})],1),e.showInfo?a("enterprise-info",{attrs:{editID:e.editID},on:{editClose:e.editClose}}):e._e(),e.showAdd?a("enterprise-add",{attrs:{editID:e.editID},on:{editClose:e.editClose}}):e._e()],1)],1)},s=[],r=(a("b0c0"),a("96cf"),a("1da1")),i=a("e363"),o=a("2af9"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return Object.keys(e.info).length>0?a("div",[a("a-descriptions",{attrs:{bordered:"",column:2,size:"middle"}},[a("template",{slot:"title"},[e._v(" 管理员详情 "),a("a-button",{staticClass:"f-r",attrs:{type:"primary",ghost:""},on:{click:e.onGoback}},[e._v("返回")])],1),a("a-descriptions-item",{attrs:{label:"名称"}},[e._v(e._s(e.info.name))]),a("a-descriptions-item",{attrs:{label:"账号"}},[e._v(e._s(e.info.account))]),a("a-descriptions-item",{attrs:{label:"手机号码"}},[e._v(e._s(e.info.phone))]),a("a-descriptions-item",{attrs:{label:"性别"}},[e._v(e._s(e.info.sex))]),a("a-descriptions-item",{attrs:{label:"头像"}},[a("img",{attrs:{src:e.info.photo}})]),a("a-descriptions-item",{attrs:{label:"是否超级管理员"}},[e._v(e._s(e._f("isAdmin")(e.info.isAdmin)))]),a("a-descriptions-item",{attrs:{label:"创建人"}},[e._v(e._s(e.info.creator))]),a("a-descriptions-item",{attrs:{label:"创建时间"}},[e._v(e._s(e._f("dayjs")(e.info.createTime)))])],2)],1):e._e()},l=[],d=(a("a9e3"),{name:"ManagerInfo",props:{editID:{type:[Number,String],default:""}},data:function(){return{info:{}}},filters:{isAdmin:function(e){var t={1:"是",0:"否"};return t[e]||""}},mounted:function(){var e=this;this.$nextTick((function(){e.editID&&e.loadInfo(e.editID)}))},methods:{loadInfo:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(i["d"])({id:e});case 2:n=a.sent,s=n.returnValue,t.info=s;case 5:case"end":return a.stop()}}),a)})))()},onGoback:function(){this.$emit("editClose")}}}),u=d,p=a("2877"),m=Object(p["a"])(u,c,l,!1,null,"14464de4",null),h=m.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-form",{attrs:{form:e.form}},[a("a-form-item",{attrs:{label:"企业名称",labelCol:{lg:{span:2},sm:{span:4}},wrapperCol:{lg:{span:6},sm:{span:8}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请输入名称",whitespace:!0},{min:2,max:15,message:"请输入长度2到15位",whitespace:!0}]}],expression:"[\n        'name',\n        {rules: [{ required: true, message: '请输入名称',whitespace: true },\n                 { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}\n      ]"}],attrs:{name:"name",placeholder:"请输入企业名称"}})],1),a("a-form-item",{attrs:{label:"企业简称",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["account",{rules:[{required:!0,message:"请输入账号",whitespace:!0},{min:2,max:15,message:"请输入长度2到15位",whitespace:!0}]}],expression:"[\n        'account',\n        {rules: [{ required: true, message: '请输入账号',whitespace: true },\n                 { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}\n      ]"}],attrs:{name:"account",placeholder:"请输入企业简称"}})],1),a("a-form-item",{attrs:{label:"手机号码",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{rules:[{required:!0,message:"请输入手机号码",whitespace:!0},{len:11,message:"请输入长度11位的手机号码",whitespace:!0}]}],expression:"[\n        'phone',\n        {rules: [{ required: true, message: '请输入手机号码',whitespace: true },\n                 { len:11, message: '请输入长度11位的手机号码',whitespace: true }]}\n      ]"}],attrs:{name:"phone",placeholder:"请输入手机号码"}})],1),a("a-form-item",{attrs:{label:"性别",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["sex",{initialValue:1}],expression:"['sex',{ 'initialValue': 1 }]"}]},[a("a-radio",{attrs:{value:1}},[e._v(" 男 ")]),a("a-radio",{attrs:{value:2}},[e._v(" 女 ")])],1)],1),a("a-form-item",{attrs:{label:"上传头像",labelCol:{lg:{span:2},sm:{span:3}},wrapperCol:{lg:{span:6},sm:{span:6}}}},[a("upload-img",{directives:[{name:"decorator",rawName:"v-decorator",value:["photo",{rules:[{required:!0,message:"请上传图片",whitespace:!0}]}],expression:"[\n        'photo',\n        {rules: [{ required: true, message: '请上传图片',whitespace: true }]}\n      ]"}],attrs:{name:"photo",num:1,fileList:e.fileList},on:{uploadList:e.uploadList}})],1),a("a-form-item",{staticClass:"ta-c",attrs:{wrapperCol:{lg:{span:6},sm:{span:9}}}},[a("a-button",{attrs:{type:"primary",ghost:""},on:{click:e.onCancel}},[e._v("取消")]),a("a-button",{staticClass:"m-l10",attrs:{type:"primary",loading:e.lodingBtn,disabled:e.lodingBtn},on:{click:e.onSave}},[e._v("保存 ")])],1)],1)},v=[],w=(a("4160"),a("a15b"),a("d3b7"),a("159b"),a("5530")),b={name:"ManagerAdd",components:{UploadImg:o["d"]},props:{editID:{type:[Number,String],default:""}},data:function(){return{form:this.$form.createForm(this),lodingBtn:!1,fileList:[]}},mounted:function(){var e=this;this.$nextTick((function(){e.handleReset(),e.editID&&e.loadInfo(e.editID)}))},methods:{handleReset:function(){this.form.resetFields()},onCancel:function(){this.$emit("editClose")},onSave:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e,a){if(!e){t.lodingBtn=!0;var n=Object(w["a"])({},a);n.id=t.editID,n.sex=1===n.sex?"男":"女",Object(i["f"])(n).then((function(e){e.returnValue&&(t.editID?t.$message.info("编辑成功"):t.$message.info("保存成功"),t.onCancel())})).catch((function(e){})).finally((function(){t.lodingBtn=!1}))}}))},loadInfo:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s,r,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.form,a.next=3,Object(i["d"])({id:e});case 3:s=a.sent,r=s.returnValue,n.setFieldsValue({name:r.name,account:r.account,photo:r.photo,sex:"男"===r.sex?1:2,phone:r.phone}),r.photo&&(o={status:"done",uid:r.photo,name:r.photo,url:r.photo},t.fileList.push(o));case 7:case"end":return a.stop()}}),a)})))()},uploadList:function(e){var t=[];e.forEach((function(e,a){t.push(e.url)})),this.form.setFieldsValue({photo:t.join(",")})}}},g=b,_=Object(p["a"])(g,f,v,!1,null,"5d74b2f2",null),x=_.exports,y={name:"EnterpriseList",components:{STable:o["b"],Ellipsis:o["a"],EnterpriseInfo:h,EnterpriseAdd:x},data:function(){var e=this;return{showList:!0,showAdd:!1,showInfo:!1,editID:"",columns:[{title:"序号",dataIndex:"id",customRender:function(e,t,a){return a+1}},{title:"企业名称",dataIndex:"name"},{title:"账号",dataIndex:"account"},{title:"联系人",dataIndex:"contacts"},{title:"联系号码",dataIndex:"phone"},{title:"状态",dataIndex:"state",scopedSlots:{customRender:"state"}},{title:"是否明星企业",dataIndex:"isStars",scopedSlots:{customRender:"isStars"}},{title:"是否是新入驻企业",dataIndex:"isNews",scopedSlots:{customRender:"isNews"}},{title:"排序",dataIndex:"sortNo",scopedSlots:{customRender:"sortNo"}},{title:"创建时间",dataIndex:"createTime",scopedSlots:{customRender:"createTime"}},{title:"操作",dataIndex:"action",width:"220px",scopedSlots:{customRender:"action"}}],queryParam:{},searchData:[],loadData:function(t){var a=Object.assign({},t,e.queryParam);return e.getList(a)}}},filters:{state:function(e){var t={1:"正常",2:"待审",3:"禁用",4:"不通过"};return t[e]||""},isStars:function(e){var t={1:"是",0:"否"};return t[e]||""},isNews:function(e){var t={1:"是",0:"否"};return t[e]||""}},computed:{},created:function(){},methods:{onSearch:function(){this.$refs.table.refresh(!0)},onReset:function(){this.queryParam={},this.searchData=[],this.onSearch()},onDateChange:function(e,t){this.queryParam.startDate=t[0],this.queryParam.endDate=t[1],this.onSearch()},getList:function(e){return Object(i["e"])(e).then((function(e){return e}))},onAdd:function(){this.editID="",this.showList=!1,this.showInfo=!1,this.showAdd=!0},handleLook:function(e){this.editID=e.id,this.showList=!1,this.showAdd=!1,this.showInfo=!0},handleEdit:function(e){this.editID=e.id,this.showList=!1,this.showInfo=!1,this.showAdd=!0},editClose:function(){this.showList=!0,this.showAdd=!1,this.showInfo=!1,this.onRefresh()},handleDelete:function(e){var t=this;this.$confirm({title:"删除提示",content:"真的要删除 ".concat(e.name," 吗?"),okText:"删除",okType:"primary",cancelText:"取消",onOk:function(){return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={ids:[]},n.ids.push(e.id),a.next=4,Object(i["c"])(n);case 4:s=a.sent,r=s.returnValue,r&&(t.$message.info("删除成功"),t.onRefresh());case 7:case"end":return a.stop()}}),a)})))()}})},onRefresh:function(){this.$refs.table.refresh()},handleReset:function(e){var t=this;this.$confirm({title:"重置提示",content:"真的要重置 ".concat(e.name," 密码吗?"),okText:"重置",okType:"primary",cancelText:"取消",onOk:function(){return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(i["g"])({id:e.id});case 2:n=a.sent,s=n.returnValue,r=n.message,s&&t.$message.info(r);case 6:case"end":return a.stop()}}),a)})))()}})}}},k=y,I=Object(p["a"])(k,n,s,!1,null,"88c29346",null);t["default"]=I.exports}}]);