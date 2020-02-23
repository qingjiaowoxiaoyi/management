<template>
   <div>
     <Button type="info" style="margin-bottom:10px;" @click="addParams">添加分类</Button>
     <Table row-key="id" :columns="columns" :data="data" stripe border ></Table>
     <div style="margin: 10px;overflow: hidden">
       <div style="float: right;">
         <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
       </div>
     </div>
     <ParamsAdd ref="ParamsAdd" @requestParams='postParams'></ParamsAdd>
     <ParamsEdit ref="ParamsEdit" @requestParams='putParams'></ParamsEdit>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
import ParamsEdit from './model/Params-edit.vue';
import ParamsAdd from './model/Params-add.vue';
import {get,post,put,deletefn} from '@/api/axios';
@Component({
  name:'Params',
  components: {
    Button,
    Table,
    Page,
    Modal,
    ParamsEdit,
    ParamsAdd
  },
})

export default class Params extends Vue {
  columns: Array<any> = [
    {
      title: '分类名称',
      key: 'category',
      align: 'center',
      tree: true,
      minWidth:80
    },
    {
      title: '是否有效',
      align: 'center',
      key: 'isok',
      minWidth:80,
      render:(h:any,params: any)=> {
        return h('div', [
                h('Icon', {
                    props: {
                      size: 'small',
                      type: params.row.isok?'md-checkmark-circle':'md-close-circle'
                    },
                    style:{
                      color:params.row.isok?'#00ff33':'red',
                      cursor: 'pointer',
                      fontSize:'15px'
                    }
                })
          ]);
      }
    },
    {
      title: '排序',
      align: 'center',
      minWidth:80,
      render:(h:any,params: any)=> {
        return h('Tag',{
              props: {
                color: 'blue',
                icon: 'ios-create'
              },
              style: {
                color:'blue'
              }
            },
            params.row.level
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      minWidth:80,
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
                  (this.$refs.ParamsEdit as ParamsEdit).open();
                  (this.$refs.ParamsEdit as ParamsEdit).setInitParams(params.row,'编辑分类');
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
                  if(params.row.children&&params.row.children.length>0){
                    this.deleteParams('http://127.0.0.1:3000/category/senior',{category:params.row.category})
                    return;
                  }
                  this.deleteParams('http://127.0.0.1:3000/category',{propID:params.row.propID})
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
  addParams(){
    (this.$refs.ParamsAdd as ParamsAdd).open();
    (this.$refs.ParamsAdd as ParamsAdd).setInitParams(this.data,'增加分类');
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.getParams();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.getParams();
  }

  // 获取分类api
  getParams(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/category')
    .then(res=>{
      this.data=(res as any).resList;
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
    .finally(() => {
      loading.finish();
    });
  }
  // 新增分类api
  postParams(row?:any){
    post('http://127.0.0.1:3000/category',row)
    .then(res=>{
      this.getParams();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
  // 修改分类api
  putParams(row?:any,url?:any){
    put(url,row)
    .then(res=>{
      this.getParams();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
  // 删除分类api
  // delete 和 post 、put 的参数不一样，post、put都有三个参数，分别为url、data还有config，而delete只有两个参数，第一个是url，第二个是config，post 和 put 第二个参数是data，所以可以直接在第二个参数的位置写上数据，后台可以访问到，而delete第二个参数是 config ，所以要通过 config 里面的 data 来传参
  deleteParams(url?:any,row?:any){
    deletefn(url,{data:row})
    .then(res=>{
      this.getParams();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }

  created() {
    this.getParams()
  }
}
</script>

<style scoped>
</style>
