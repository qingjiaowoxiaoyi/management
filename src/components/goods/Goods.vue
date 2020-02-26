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
    <ChangeGoods ref="GoodsChange" @putGoods='putGoods' @postGoods='postGoods'></ChangeGoods>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Table,Button,Page,Row,Col } from 'view-design';
import ChangeGoods from './model/Goods-change.vue';
import {get,post,put,deletefn} from '@/api/axios';
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
      key: 'itemName',
      align: 'center',
      minWidth:80,
    },
    {
      title: '库存数量',
      key: 'stock',
      align: 'center',
      minWidth:50,
    },
    // {
    //   title: '优惠券',
    //   key: 'coupon',
    //   align: 'center',
    //   minWidth:50,
    // },
    {
      title: '商品参数',
      key: 'type',
      align: 'center',
      minWidth:50,
    },
    {
      title: '销售量',
      key: 'salesCount',
      align: 'center',
      minWidth:50,
    },
    {
      title: '收藏量',
      key: 'collectCount',
      align: 'center',
      minWidth:50,
    },
    {
      title: '评价量',
      key: 'rateCount',
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
  Params:any=[]
  data: Array<any> = [];

  // 要查询数据
  queryData: any = {
    page: 1,
    pageSize: 10,
    keyword: undefined
  };

  // 查询
  queryname(){
    this.queryData.page=1;
    this.getParams();
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

  // 添加商品
  addgoods(){
    (this.$refs.GoodsChange as any).open();
    (this.$refs.GoodsChange as any).setInitParams('添加商品',this.Params);
  }

  // 获取参数选择
  getParams(){
    get('http://127.0.0.1:3000/category')
    .then(res=>{
      this.Params=(res as any).resList;
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
  }

  // 获取商品信息
  getGoods(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/goods')
    .then(res=>{
      this.data=(res as any).resList;
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
    .finally(() => {
      loading.finish();
    });
  }

  // 修改商品信息
  putGoods(row?:any,url?:any){
    put('http://127.0.0.1:3000/goods',row)
    .then(res=>{
      this.getGoods();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }

  // 新增商品信息
  postGoods(row?:any){
    post('http://127.0.0.1:3000/goods',row)
    .then(res=>{
      this.getGoods();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }

  created() {
   this.getParams();
   this.getGoods();
  }
}
</script>

<style scoped>
</style>
