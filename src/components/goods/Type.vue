<template>
   <div>
     <Select v-model="selectParams" style="width:200px;margin-bottom:10px;" @on-change='changeselect'>
        <OptionGroup v-for="(item,index) in selectdata" :label="item.paramsName" :key='index'>
            <Option v-for="(element,num) in item.children" :value="element.paramsName" :key="num">{{ element.paramsName }}</Option>
        </OptionGroup>
     </Select>
     <Card>
      <Button type="info" style="margin-bottom:10px;" @click="addType">添加分类</Button>
      <Table row-key="id" :columns="columns" :data="data" stripe border ></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
        </div>
      </div>
     </Card>
     <TypeChange ref="TypeChange" @requestType='requestType'></TypeChange>
     <expandRow ref="expandRow"></expandRow>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Button,Table,Page,Modal,Card } from 'view-design';
import expandRow from './component/Expand-row.vue';
import TypeChange from './model/Type-change.vue';
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
  selectParams:string='';// 选择的分类
  count:Array<any>=[];
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
                    count: params.row.attributeContext,
                    flag:true,
                }
              }
            )
          ])
      }
    },
    {
      title: '属性',
      key: 'attribute',
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
                type: 'primary',
                size: 'small',
                icon: 'ios-create'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  (this.$refs.TypeChange as TypeChange).open();
                  (this.$refs.TypeChange as TypeChange).setInitType('编辑分类',params.row.attribute);
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
      attribute:'口味',
      // attributeContext:['香草','麻辣']
    },
    {
      id:'200',
      attribute:'包装',
      attributeContext:['500g','250g']
    }
  ]

  selectdata: Array<any> = [
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
  addType(){
    (this.$refs.TypeChange as TypeChange).open();
    (this.$refs.TypeChange as TypeChange).setInitType('增加分类');
  }

  // 改变了选择类型
  changeselect(){
    console.log(this.selectParams)
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.requestType();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.requestType();
  }

  // api
  requestType(){
    console.log('ok')
  }
}
</script>

<style scoped>
</style>
