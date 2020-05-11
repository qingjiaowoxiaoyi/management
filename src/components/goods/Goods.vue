<template>
   <div>
     <Row>
        <Col span="21">
          <Input v-model="queryData.keyword" placeholder="请输入商品名称查询" style="margin:10px 0;width:200px;" @on-enter="queryname" />
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
    {
      title: '价格',
      key: 'price',
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
        return h(
            'div',[
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
                      (this.$refs.GoodsChange as any).setInitParams(params.column.title,true,params.row);
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
                      this.deleteGoods(params.row.id)
                    }
                  }
                },
                '删除'
              )
            ]
          )
      }
    }
  ];
  data: Array<any> = [];

  // 要查询数据
  queryData: any = {
    page: 1,
    size: 10,
    keyword: undefined,
    flag:2
  };

  // 查询
  queryname(){
    this.queryData.page=1;
    this.queryData.flag=2;
    this.search();
  }

  // 搜索
  search(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/search/admin',this.queryData)
    .then(res=>{
      this.data=(res as any).data;
      this.total=(res as any).total;
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
    .finally(() => {
      loading.finish();
    });
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.getGoods();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.size = newPageSize;
    this.getGoods();
  }

  // 添加商品
  addgoods(){
    (this.$refs.GoodsChange as any).open();
    (this.$refs.GoodsChange as any).setInitParams('添加商品',false);
  }

  // 获取商品信息
  getGoods(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/goods',this.queryData)
    .then(res=>{
      this.data=(res as any).data;
      this.total=(res as any).total;
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

  // 删除商品信息
  // delete 和 post 、put 的参数不一样，post、put都有三个参数，分别为url、data还有config，而delete只有两个参数，第一个是url，第二个是config，post 和 put 第二个参数是data，所以可以直接在第二个参数的位置写上数据，后台可以访问到，而delete第二个参数是 config ，所以要通过 config 里面的 data 来传参
  deleteGoods(row?:any){
    deletefn('http://127.0.0.1:3000/goods',{data:{id: row}})
    .then(res=>{
      this.getGoods();
      this.$Message.info((res as any).msg);
    }).catch(err => {
       this.$Message.error('加载失败');
    })
  }

  created() {
   this.getGoods();
  }
}
</script>

<style scoped>
</style>
