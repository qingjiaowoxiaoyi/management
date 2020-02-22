<template>
   <div>
     <Button type="info" style="margin-bottom:10px;" @click="addParams">添加分类</Button>
     <Table row-key="id" :columns="columns" :data="data" stripe border ></Table>
     <div style="margin: 10px;overflow: hidden">
       <div style="float: right;">
         <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
       </div>
     </div>
     <ParamsAdd ref="ParamsAdd" @requestParams='requestParams'></ParamsAdd>
     <ParamsEdit ref="ParamsEdit" @requestParams='requestParams'></ParamsEdit>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
import ParamsEdit from './model/Params-edit.vue';
import ParamsAdd from './model/Params-add.vue';
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
      key: 'paramsName',
      align: 'center',
      tree: true,
      minWidth:80,
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
                type: 'primary',
                size: 'small',
                icon: 'ios-create'
              },
              style: {
                marginRight: '5px'
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
                icon: 'ios-create'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  // 删除分类，以id为判断标准，后端接受id查询后删除,再重新请求
                  console.log(params.row)
                }
              }
            },
            '删除'
          )
        ])
      }
    },
  ];

  data: Array<any> = [
    {
      id:'100',
      paramsName:'蛋糕',
      isok:true,
      level:'一级',
      children:[
        {
          id:'101',
          paramsName:'蒸蛋糕',
          isok:true,
          level:'二级',
        },
        {
          id:'102',
          paramsName:'脱水蛋糕',
          isok:true,
          level:'二级',
        },
        {
          id:'103',
          paramsName:'马卡龙',
          isok:true,
          level:'二级',
        }
      ]
    },
    {
      id:'200',
      paramsName:'电脑',
      isok:true,
      level:'一级',
      children:[
        {
          id:'201',
          paramsName:'联想',
          isok:true,
          level:'二级',
        },
        {
          id:'202',
          paramsName:'戴尔',
          isok:true,
          level:'二级',
        },
        {
          id:'203',
          paramsName:'外星人',
          isok:true,
          level:'二级',
        }
      ]
    },
    {
      id:'300',
      paramsName:'水果',
      isok:true,
      level:'一级',
      children:[
        {
          id:'301',
          paramsName:'苹果',
          isok:true,
          level:'二级',
        },
        {
          id:'302',
          paramsName:'香蕉',
          isok:true,
          level:'二级',
        },
        {
          id:'303',
          paramsName:'凤梨',
          isok:true,
          level:'二级',
        }
      ]
    }
  ]

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
    this.requestParams();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.requestParams();
  }

  // api
  requestParams(){
    console.log('ok')
  }
}
</script>

<style scoped>
</style>
