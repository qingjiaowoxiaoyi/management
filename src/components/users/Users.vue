<template>
   <div>
    <Input v-model="queryData.keyword" placeholder="请输入用户账号查询" style="margin:10px 0;width:200px;" @on-enter="queryname" @on-blur="queryname" />
    <Button type="info" style="margin-left:10px;" @click="queryname">搜  索</Button>
    <Table :columns="columns" :data="data" stripe border ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="1" size="small" show-elevator show-sizer show-total @on-change="onPageChange" @on-page-size-change="onPageSizeChange"></Page>
      </div>
    </div>
    <AllModal ref="AllModal"></AllModal>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Table,Button,Page } from 'view-design';
import AllModal from './model/All-modal.vue';
import {get,post,put,deletefn} from '@/api/axios';
@Component({
  components: {
    Page,
    Table,
    Button,
    AllModal
  },
})

export default class Users extends Vue {
    columns: Array<any> = [
    {
      title: '账号',
      key: 'id',
      align: 'center',
      minWidth:80,
    },
    {
      title: '昵称',
      key: 'nickName',
      align: 'center',
      minWidth:50,
    },
    {
      title: '姓名',
      key: 'fallName',
      align: 'center',
      minWidth:50,
    },
    {
      title: '性别',
      key: 'gender',
      align: 'center',
      minWidth:50,
    },
    {
      title: '生日',
      key: 'birth',
      align: 'center',
      minWidth:80,
    },
    {
      title: '电话号码',
      key: 'phoneNum',
      align: 'center',
      minWidth:85,
    },
    {
      title: '收货地址',
      align: 'center',
      minWidth:80,
      // renderHeader:(h:any,params: any)=>{
      //   return h('div',{
      //     style: {
      //       width: '200px',
      //     },
      //   },'收货地址')
      // },
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
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(params.row.address,params.column.title,false);
                }
              }
            },
            '收货地址'
          )
        ])
      }
    },
    {
      title: '用户订单',
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
                  // (this as tableComponent).followData(params.row);
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(params.row.orderList,params.column.title,true);
                }
              }
            },
            '用户订单'
          )
        ])
      }
    },
    {
      title: '用户评价',
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
                  // (this as tableComponent).followData(params.row);
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(params.row.comment,params.column.title,false);
                }
              }
            },
            '用户评价'
          )
        ])
      }
    },
    {
      title: '优惠券',
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
                  // (this as tableComponent).followData(params.row);
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(params.row.coupon,params.column.title,false);
                }
              }
            },
            '优惠券'
          )
        ])
      }
    },
    {
      title: '用户收藏',
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
                  // (this as tableComponent).followData(params.row);
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(params.row.collection,params.column.title,false);
                }
              }
            },
            '用户收藏'
          )
        ])
      }
    },
  ];
  data: Array<any> = [
    {
      id:'15121123',
      nickName:'小一',
      fallName:'admin',
      gender:'男',
      birth:'2016-03-01',
      phoneNum:'13138041921',
      address:['广东省梅州市梅县区小一','广东省梅州市梅县区小一','广东省梅州市梅县区小一'],
      comment:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑中评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑差评'],
      coupon:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100'],
      collection:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑','宁美国度 台式电脑主机i7 8700升9700/1660Super全套高配吃鸡游戏台式机水冷diy组装整机电竞主播','攀升 i7 8700升9700/GTX1660SUPER台式电脑主机高配吃鸡电竞游戏主机DIY网吧主播水冷组装台式机整机全套'],
      orderList:[{itemName:'【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑',itemStatus:'到货'},
      {itemName:'【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑',itemStatus:'未到货'},
      {itemName:'【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑',itemStatus:'已退款'}]
    },
    {
      id:'15121123',
      nickName:'一仔',
      fallName:'admin',
      gender:'男',
      birth:'2016-01-01',
      phoneNum:'13138041921',
      address:['广东省梅州市梅县区小一','广东省梅州市梅县区小一','广东省梅州市梅县区小一'],
      comment:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑中评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑差评'],
      coupon:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100'],
      collection:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑','宁美国度 台式电脑主机i7 8700升9700/1660Super全套高配吃鸡游戏台式机水冷diy组装整机电竞主播','攀升 i7 8700升9700/GTX1660SUPER台式电脑主机高配吃鸡电竞游戏主机DIY网吧主播水冷组装台式机整机全套']
    },
    {
      id:'15121123',
      nickName:'小一',
      fallName:'admin',
      gender:'女',
      birth:'2016-03-01',
      phoneNum:'13138041921',
      address:['广东省梅州市梅县区小一','广东省梅州市梅县区小一','广东省梅州市梅县区小一'],
      comment:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑中评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑差评'],
      coupon:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100'],
      collection:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑','宁美国度 台式电脑主机i7 8700升9700/1660Super全套高配吃鸡游戏台式机水冷diy组装整机电竞主播','攀升 i7 8700升9700/GTX1660SUPER台式电脑主机高配吃鸡电竞游戏主机DIY网吧主播水冷组装台式机整机全套']
    },
  ];

  // 要查询数据
  queryData: any = {
    page: 1,
    pageSize: 10,
    keyword: undefined
  };

  // 查询API
  getUsers(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/admin/getuser')
    .then(res=>{
      this.data=(res as any).data;
      this.$Message.info((res as any).msg);
    })
    .catch(err => {
       this.$Message.error('加载失败');
    })
    .finally(() => {
      loading.finish();
    });
  }

  queryname(){
    this.queryData.page=1;
    this.getUsers();
  }

  // 分页请求
  total:number=0;//总页数
  onPageChange(pageInfo: number) {
    this.queryData.page = pageInfo;
    this.getUsers();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.pageSize = newPageSize;
    this.getUsers();
  }

  created() {
   this.getUsers(); 
  }
}
</script>

<style scoped>
</style>
