<template>
   <div>
    <Input v-model="queryData.keyword" placeholder="请输入商品名称查询" style="margin:10px 0;width:200px;" @on-enter="queryname" @on-blur="queryname" />
    <Button type="info" style="margin-left:10px;" @click="queryname">搜  索</Button>
    <Table :columns="columns" :data="data" stripe border ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
      </div>
    </div>
    <buyShopName ref="buyShopName"></buyShopName>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Table,Button,Page,Row,Col } from 'view-design';
import {get,post,put,deletefn} from '@/api/axios';
import buyShopName from './buyShopName.vue';
@Component({
  components: {
    Page,
    Table,
    Button,
    buyShopName
  },
})

export default class orderMessage extends Vue {
  columns: Array<any> = [
    {
      title: '订单id',
      key: 'orderId',
      align: 'center',
      minWidth:80,
    },
    {
      title: '下单时间',
      key: 'orderTime',
      align: 'center',
      minWidth:50,
    },
    {
      title: '下单总价',
      key: 'total',
      align: 'center',
      minWidth:30,
    },
    {
      title: '下单物流',
      key: 'express',
      align: 'center',
      minWidth:50,
    },
    {
      title: '下单留言',
      key: 'message',
      align: 'center',
      minWidth:50,
    },
    {
      title: '下单商品信息',
      align: 'center',
      minWidth:80,
      render:(h:any,params: any)=>{
          return h(
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
                      (this.$refs.buyShopName as any).open();
                      (this.$refs.buyShopName as any).setInitParams('商品信息',params.row.item);
                    }
                  }
                },
                '点击查询'
              )
      }
    },
    {
      title: '商品状态',
      align: 'center',
      minWidth:100,
      render:(h:any,params: any)=> {
        if(params.row.status==='未发货'){
            return h(
                'div',[
                    h(
                        'span',
                        {
                            style: {
                                marginRight: '5px',
                                fontSize: '12px'
                            }
                        },
                        params.row.status+':'
                    ),
                    h(
                        'Button',
                        {
                        props: {
                            type: 'info',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px',
                            fontSize: '12px'
                        },
                        on: {
                            click: () => {
                                this.changeStatus(params.row._id,'已发货');
                            }
                        }
                        },
                        '确认发货'
                    )
                ]
            )
        }
        else if(params.row.status==='申请退货'){
            return h(
                'div',[
                    h(
                        'span',
                        {
                            style: {
                                marginRight: '5px',
                                fontSize: '12px'
                            }
                        },
                        params.row.status+':'
                    ),
                    h(
                        'Button',
                        {
                        props: {
                            type: 'info',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px',
                            fontSize: '12px'
                        },
                        on: {
                            click: () => {
                                this.changeStatus(params.row._id,'退货成功');
                            }
                        }
                        },
                        '同意'
                    ),
                    h(
                        'Button',
                        {
                        props: {
                            type: 'error',
                            size: 'small',
                        },
                        style: {
                            marginRight: '5px',
                            fontSize: '12px'
                        },
                        on: {
                            click: () => {
                                this.changeStatus(params.row._id,'退货失败');
                            }
                        }
                        },
                        '拒绝'
                    )
                ]
            )
        }
        else{
            return  h(
                'div',
                {
                    style: {
                        marginRight: '5px',
                        fontSize: '12px'
                    }
                },
                params.row.status
            )
        }
      }
    }
  ];
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
    this.getOrder();
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.getOrder();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.getOrder();
  }

  // 改变商品状态
  changeStatus(_id:string,status:string){
    const loading = this.$Loading;
    loading.start();
    post('http://127.0.0.1:3000/order/status',{_id,status})
    .then(res=>{
      this.data=(res as any).data;
      this.getOrder();
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
    .finally(() => {
      loading.finish();
    });
  }

  // 获取订单信息
  getOrder(){
    const loading = this.$Loading;
    loading.start();
    // get('http://127.0.0.1:3000/goods')
    // .then(res=>{
    //   this.data=(res as any).data;
    //   this.$Message.info((res as any).msg);
    // })
    // .catch(err => {
    //    this.$Message.error('加载失败');
    // })
    // .finally(() => {
    //   loading.finish();
    // });
    setTimeout(()=>{
        this.data=[
            {
                item: [
                    {
                        name: "商品3",
                        type: "storage: 500g graphic: 1080",
                        price: 969,
                        count: 3
                    },
                    {
                        name: "商品4",
                        type: "口味: 香蕉味 产地: 广州",
                        price: 970,
                        count: 3
                    }
                ],
                _id:'5e760c09c0b1663f34ddca20',
                total: "42.00",
                orderId: "202032120435310",
                orderTime:"2020-3-21 20:43:53",
                express: "申通",
                message: "",
                status: "申请退货"
            },
            {
                item: [
                    {
                        name: "商品3",
                        type: "storage: 500g graphic: 1080",
                        price: 969,
                        count: 3
                    },
                    {
                        name: "商品4",
                        type: "口味: 香蕉味 产地: 广州",
                        price: 970,
                        count: 3
                    }
                ],
                _id:'5e760c09c0b1663f34ddca21',
                total: "42.00",
                orderId: "202032120435311",
                orderTime:"2020-3-21 20:43:53",
                express: "圆通",
                message: "记得弄好看点",
                status: "已发货"
            },
            {
                item: [
                    {
                        name: "商品3",
                        type: "storage: 500g graphic: 1080",
                        price: 969,
                        count: 3
                    },
                    {
                        name: "商品4",
                        type: "口味: 香蕉味 产地: 广州",
                        price: 970,
                        count: 3
                    }
                ],
                total: "42.00",
                _id:'5e760c09c0b1663f34ddca22',
                orderId: "202032120435312",
                orderTime:"2020-3-21 20:43:53",
                express: "顺丰",
                message: "快点发货",
                status: "未发货"
            },
            {
                item: [
                    {
                        name: "商品3",
                        type: "storage: 500g graphic: 1080",
                        price: 969,
                        count: 3
                    },
                    {
                        name: "商品4",
                        type: "口味: 香蕉味 产地: 广州",
                        price: 970,
                        count: 3
                    }
                ],
                total: "42.00",
                orderId: "202032120435312",
                orderTime:"2020-3-21 20:43:53",
                express: "顺丰",
                message: "快点发货",
                status: "退货成功"
            },
            {
                item: [
                    {
                        name: "商品3",
                        type: "storage: 500g graphic: 1080",
                        price: 969,
                        count: 3
                    },
                    {
                        name: "商品4",
                        type: "口味: 香蕉味 产地: 广州",
                        price: 970,
                        count: 3
                    }
                ],
                total: "42.00",
                orderId: "202032120435312",
                orderTime:"2020-3-21 20:43:53",
                express: "顺丰",
                message: "快点发货",
                status: "退货失败"
            }
        ]
        loading.finish();
    },50)
  }

  created() {
   this.getOrder();
  }
}
</script>

<style scoped>
</style>
