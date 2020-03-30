<template>
   <div>
     <Select v-model="quaryName" style="width:200px;margin-bottom:10px;" @on-change='changeselect'>
        <OptionGroup :label="item.category" v-for="(item,index) in selectData" :key="index">
            <Option v-for="(element,num) in item.children" :value="element.propID" :key="num">{{ element.property }}</Option>
        </OptionGroup>
     </Select>
     <!-- <div style="margin-bottom:10px;">
        <Input v-model="quaryName" placeholder="请输入二级分类名称" style="width:200px;margin-right:10px;"/>
        <Button type="info" @click="changeselect">搜 索</Button>
     </div> -->
     <Card>
      <Button type="info" style="margin-bottom:10px;" @click="addType">添加属性</Button>
      <Table row-key="id" :columns="columns" :data="data" stripe border ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
        </div>
      </div>
     </Card>
     <TypeChange ref="TypeChange" @putType='putType' @postType='postType'></TypeChange>
     <expandRow ref="expandRow"></expandRow>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button,Table,Page,Modal,Card } from 'view-design';
import expandRow from './component/Expand-row.vue';
import TypeChange from './model/Type-change.vue';
import {get,post,put,deletefn} from '@/api/axios';
@Component({
  components: {
    Button,
    Table,
    Page,
    Modal,
    Card,
    expandRow,
    TypeChange,
  },
})

export default class Type extends Vue {
  quaryName:string='';// 查询分类名字
  count:Array<any>=[];
  _id:any='';// 总分类id
  columns: Array<any> = [
    {
      title: '',
      type: 'expand',
      width:'30px',
      render: (h:any, params:any) => {
          return h('div',[
            h(
              expandRow, 
              {
                props: {
                    count: params.row.specList,
                    flag:true,
                    specID:params.row._id
                },
                on:{
                    addSpec:(rowID?:any)=>{
                      this.postType(rowID,'http://127.0.0.1:3000/category/specification');
                    },
                    delSpec:(row?:any)=>{
                      this.deleteType(row,'http://127.0.0.1:3000/category/specification');
                    }
                }
              }
            )
          ])
      }
    },
    {
      title: '属性',
      key: 'specType',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render:(h:any,params: any)=> {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small',
                icon: 'ios-create'
              },
              style: {
                marginRight: '5px',
                fontSize: '12px'
              },
              on: {
                click: () => {
                  (this.$refs.TypeChange as TypeChange).open();
                  (this.$refs.TypeChange as TypeChange).setInitType('编辑分类',params.row);
                }
              }
            },
            '编辑'
          ),
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small',
                icon: 'ios-trash-outline'
              },
              style: {
                marginRight: '5px',
                fontSize: '12px'
              },
              on: {
                click: () => {
                  // 删除分类，以id为判断标准，后端接受id查询后删除,再重新请求
                  this.deleteType({specID:params.row._id},'http://127.0.0.1:3000/category/spec')
                }
              }
            },
            '删除'
          )
        ])
      }
    },
  ];

  data: Array<any> = []

  // 要查询数据
  queryData: any = {
    page: 1,
    pageSize: 10
  };

  // 添加商品分类
  addType(){
    (this.$refs.TypeChange as TypeChange).open();
    (this.$refs.TypeChange as TypeChange).setInitType('增加分类',this._id);
  }

  // 改变了选择类型
  changeselect(){
    this.getType(this.quaryName);
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.getType();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.getType();
  }

  // 获取分类api
  selectData:Array<any>=[];
  getParams(){
    const loading = this.$Loading;
    get('http://127.0.0.1:3000/category',this.queryData)
    .then(res=>{
      this.selectData=(res as any).resList;
      this.total=(res as any).total;
      this.data.forEach((item,index)=>{
        if(item.children&&item.children.length>0){
          item.children.forEach((element:any,num:number)=>{
            element.category = element.property;
          })
        }
      })
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
  }
  created() {
   this.getParams(); 
  }

  // 查询属性api
  getType(row?:any){
    const loading = this.$Loading;
    loading.start();
    post('http://127.0.0.1:3000/category/getspec',{property:row})
    .then(res=>{
        if((res as any).code === '200'){
            this.data=(res as any).doc.specs;
            this._id=(res as any).doc._id;
            this.$Message.info((res as any).msg);
        } else {
            this.$Message.error((res as any).msg);
        }
    }).catch(err => {
       this.$Message.error('加载失败');
    }).finally(() => {
      loading.finish();
    });
  }
  // 新增属性api
  postType(row?:any,url?:any){
    post(url,row)
    .then(res=>{
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
  // 修改属性api
  putType(row?:any,url?:any){
    put(url,row)
    .then(res=>{
      this.getType(this.quaryName);
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
  // 删除属性api
  deleteType(row?:any,url?:any){
    deletefn(url,{data:row})
    .then(res=>{
      this.getType(this.quaryName);
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
}
</script>

<style scoped>
</style>
