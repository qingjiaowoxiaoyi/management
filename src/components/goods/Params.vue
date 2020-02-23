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
                  this.deleteParams('http://127.0.0.1:3000/category',{cateID:params.row.propID})
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
      this.data=(res as any).doc;
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

    // setTimeout(()=>{
    //   this.data = [
    //     {
    //     id:'100',
    //     category:'蛋糕',
    //     isok:true,
    //     level:'一级',
    //     children:[
    //       {
    //         propID:'101',
    //         property:'蒸蛋糕',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'102',
    //         property:'脱水蛋糕',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'103',
    //         property:'马卡龙',
    //         isok:true,
    //         level:'二级',
    //       }
    //     ]
    //     },
    //     {
    //     id:'200',
    //     category:'电脑',
    //     isok:true,
    //     level:'一级',
    //     children:[
    //       {
    //         propID:'201',
    //         property:'联想',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'202',
    //         property:'戴尔',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'203',
    //         property:'外星人',
    //         isok:true,
    //         level:'二级',
    //       }
    //     ]
    //     },
    //     {
    //     id:'300',
    //     category:'水果',
    //     isok:true,
    //     level:'一级',
    //     children:[
    //       {
    //         propID:'301',
    //         property:'苹果',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'302',
    //         property:'香蕉',
    //         isok:true,
    //         level:'二级',
    //       },
    //       {
    //         propID:'303',
    //         property:'凤梨',
    //         isok:true,
    //         level:'二级',
    //       }
    //     ]
    //     }
    //   ]
    //   this.data.forEach((item,index)=>{
    //     if(item.children&&item.children.length>0){
    //       item.children.forEach((element:any,num:number)=>{
    //         element.category = element.property;
    //       })
    //     }
    //   })
    // },50)
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
  putParams(row?:any){
    put('http://127.0.0.1:3000/category',row)
    .then(res=>{
      this.getParams();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }
  // 删除分类api
  deleteParams(url?:any,row?:any){
    deletefn(url,row)
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
