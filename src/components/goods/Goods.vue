<template>
   <div>
     <Row>
        <Col span="21">
          <Input v-model="queryData.keyword" placeholder="请输入商品名称查询" style="margin:10px 0;width:200px;" @on-enter="queryname" @on-blur="queryname" />
          <Button type="info" style="margin-left:10px;" @click="queryname">搜  索</Button>
        </Col>
        <Col span="3">
          <Button type="info" style="margin-top:10px;" @click="addgoods">添加商品</Button>
        </Col>
    </Row>
    <Table :columns="columns" :data="data" stripe border ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
      </div>
    </div>
    <ChangeGoods ref="GoodsChange"></ChangeGoods>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Table,Button,Page,Row,Col } from 'view-design';
import ChangeGoods from './model/Goods-change.vue';
@Component({
  components: {
    Page,
    Table,
    Button,
    ChangeGoods
  },
})

export default class Goods extends Vue {
  columns: Array<any> = [
    {
      title: '商品名称',
      key: 'name',
      align: 'center',
      minWidth:80,
    },
    {
      title: '库存数量',
      key: 'storeNum',
      align: 'center',
      minWidth:50,
    },
    {
      title: '优惠券',
      key: 'coupon',
      align: 'center',
      minWidth:50,
    },
    {
      title: '商品参数',
      key: 'type',
      align: 'center',
      minWidth:50,
    },
    {
      title: '销售量',
      key: 'sellNum',
      align: 'center',
      minWidth:50,
    },
    {
      title: '收藏量',
      key: 'collectionNum',
      align: 'center',
      minWidth:50,
    },
    {
      title: '评价量',
      key: 'evaluateNum',
      align: 'center',
      minWidth:50,
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
                  (this.$refs.GoodsChange as any).open();
                  (this.$refs.GoodsChange as any).setInitParams(params.column.title,this.Params,params.row);
                }
              }
            },
            '编辑'
          )
        ])
      }
    }
  ];
  Params:any=[
        {
          category:'电脑',
          children:[
            {
              propID:'110',
              property:'联想',
            },
            {
              propID:'111',
              property:'华硕',
            }
          ]
        },
        {
          category:'蛋糕',
          children:[
            {
              propID:'112',
              property:'蒸蛋糕',
            },
            {
              propID:'113',
              property:'马卡龙',
            }
          ]
        }
      ]
  data: Array<any> = [
    {
      name:'联想笔记本',
      storeNum:20,
      coupon:'满100减50',
      couponfirst:100,
      couponsecond:50,
      type:'512G固态、i7八代处理器',
      sellNum:10,
      collectionNum:5,
      evaluateNum:8,
      homeimg:require('@/assets/photo-1542273917363-3b1817f69a2d.jpg'),
      goodsimg:'https://images.pexels.com/photos/2929290/pexels-photo-2929290.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      details:'品牌名称：宁美国度 产品参数：产品名称：宁美国度 Intel B360 i7-...品牌: 宁美国度内存容量: 8GB 16GB硬盘容量: 配置一 配置二 配置三 配置四 配置五电源功率: 400W显存容量: 5GB主板结构: M-ATX光驱类型: 无光驱机箱类型: 中塔生产企业: 宁美国度电源80 PLUS认证: 不支持显卡系列: GTX 1060散热方式: 水冷硬盘类型: 固态硬盘(SSD)CPU系列: Intel/英特尔酷睿i7主板芯片组类型: Intel B360保修期: 36个月CPU型号: i7-8700',
      userType:'110',
      styleList:[
          {
            specName:'固态内存',
            specList:[
              {
                styleId:'100',
                style:'512g'
              },
              {
                styleId:'101',
                style:'256G'
              }
            ]
          },
          {
            specName:'处理器',
            specList:[
              {
                styleId:'102',
                style:'i7八代'
              },
              {
                styleId:'103',
                style:'i9八代'
              }
            ]
          }
      ],
      style:['100','102']
    },
    {
      name:'联想笔记本',
      storeNum:20,
      coupon:'满100减50',
      couponfirst:100,
      couponsecond:50,
      type:'512G固态、i7八代处理器',
      sellNum:10,
      collectionNum:5,
      evaluateNum:8,
      homeimg:'https://images.pexels.com/photos/1738976/pexels-photo-1738976.jpeg?cs=srgb&dl=woman-sitting-on-dock-1738976.jpg&fm=jpg',
      goodsimg:'https://images.pexels.com/photos/3646206/pexels-photo-3646206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      details:'品牌名称：宁美国度 产品参数：产品名称：宁美国度 Intel B360 i7-...品牌: 宁美国度内存容量: 8GB 16GB硬盘容量: 配置一 配置二 配置三 配置四 配置五电源功率: 400W显存容量: 5GB主板结构: M-ATX光驱类型: 无光驱机箱类型: 中塔生产企业: 宁美国度电源80 PLUS认证: 不支持显卡系列: GTX 1060散热方式: 水冷硬盘类型: 固态硬盘(SSD)CPU系列: Intel/英特尔酷睿i7主板芯片组类型: Intel B360保修期: 36个月CPU型号: i7-8700',
      userType:'111',
      styleList:[
        {
          specName:'固态内存',
          specList:[
              {
                styleId:'104',
                style:'64G'
              },
              {
                styleId:'105',
                style:'256G'
              }
            ]
        },
        {
          specName:'处理器',
          specList:[
              {
                styleId:'107',
                style:'i7八代'
              },
              {
                styleId:'108',
                style:'i9八代'
              }
            ]
        }
      ],
      style:["104"]
    },
    {
      name:'联想笔记本',
      storeNum:20,
      coupon:'满100减50',
      couponfirst:100,
      couponsecond:50,
      type:'512G固态、i7八代处理器',
      sellNum:10,
      collectionNum:5,
      evaluateNum:8,
      homeimg:'https://images.pexels.com/photos/1738976/pexels-photo-1738976.jpeg?cs=srgb&dl=woman-sitting-on-dock-1738976.jpg&fm=jpg',
      goodsimg:'https://images.pexels.com/photos/3617460/pexels-photo-3617460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      details:'品牌名称：宁美国度 产品参数：产品名称：宁美国度 Intel B360 i7-...品牌: 宁美国度内存容量: 8GB 16GB硬盘容量: 配置一 配置二 配置三 配置四 配置五电源功率: 400W显存容量: 5GB主板结构: M-ATX光驱类型: 无光驱机箱类型: 中塔生产企业: 宁美国度电源80 PLUS认证: 不支持显卡系列: GTX 1060散热方式: 水冷硬盘类型: 固态硬盘(SSD)CPU系列: Intel/英特尔酷睿i7主板芯片组类型: Intel B360保修期: 36个月CPU型号: i7-8700',
      userType:'112',
      styleList: [
        {
            specName:'口味',
            specList:[
                {
                  styleId:'109',
                  style:'香草味'
                },
                {
                  styleId:'110',
                  style:'奶香味'
                }
            ]
        },
        {
            specName:'大小',
            specList:[
                {
                styleId:'112',
                style:'50g'
                },
                {
                styleId:'113',
                style:'100g'
                }
            ]
        }
      ],
      style:['110','113']
    },
  ];

  // 要查询数据
  queryData: any = {
    page: 1,
    pageSize: 10,
    keyword: undefined
  };

  // 查询API
  requestanswerQuestionList(){
    // answerQuestionList
    // .queryanswerQuestionList(this.queryData)
    // .then(res=>{
    //   (this.data as any)=(res as any).returnObject.list;
    //   this.total=res.returnObject.total;
    // })
  }

  // 查询
  queryname(){
    this.queryData.page=1;
    this.requestanswerQuestionList();
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.requestanswerQuestionList();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.requestanswerQuestionList();
  }

  // 添加商品
  addgoods(){
    (this.$refs.GoodsChange as any).open();
    (this.$refs.GoodsChange as any).setInitParams('添加商品',this.Params);
  }

  created() {
   this.requestanswerQuestionList(); 
  }
}
</script>

<style scoped>
</style>
