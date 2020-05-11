<template>
   <div>
    <Input v-model="queryData.keyword" placeholder="请输入用户账号查询" style="margin:10px 0;width:200px;" @on-enter="queryname" />
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
      key: '_id',
      align: 'center',
      minWidth:80,
    },
    {
      title: '昵称',
      key: 'nickname',
      align: 'center',
      minWidth:50,
    },
    {
      title: '姓名',
      key: 'userName',
      align: 'center',
      minWidth:50,
    },
    {
      title: '性别',
      key: 'userSex',
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
      key: 'userTel',
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
                  let addressList = [] as any
                  get('http://127.0.0.1:3000/address',{id: params.row._id}).then((res: any) => {
                      res.data.forEach((element: any) => {
                      addressList.push('' + element.province + element.city + element.district + element.location + `, 收件人: ${element.receiver}`)
                    });
                  });
                //   console.log(addressList);
                  (this.$refs.AllModal as any).open();
                  (this.$refs.AllModal as any).setInitParams(addressList,params.column.title,false);
                }
              }
            },
            '收货地址'
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
                  let commentList = [] as any;
                  // 评论名获取
                  get('http://127.0.0.1:3000/comment',{id: params.row._id, commentType: 1, page: 1, size: 10000})
                  .then((res:any)=>{
                    res.data.forEach((item:any)=>{
                      commentList.push(`商品名: ${item.itemName}` + `\n商品参数: ${item.type}` + `\n评论内容${item.content}` + `\n评论时间: ${item.time}`);
                    });

                    (this.$refs.AllModal as any).open();
                    (this.$refs.AllModal as any).setInitParams(commentList,params.column.title,false);
                  })
                  .catch(err => {
                    this.$Message.error('加载失败'+err);
                  })
                  .finally(() => {
                    
                  });
                  // setTimeout(()=>{
                  //   let data = [{
                  //     itemName: "商品2",
                  //     type: "gpu 5700 ram 16",
                  //     time: "2020-4-4 20:7:40",
                  //     content: "测试人1在商品2的评论"
                  //   },
                  //   {
                  //     itemName: "商品1",
                  //     type: "gpu 5700 ram 16",
                  //     time: "2020-4-4 20:7:42",
                  //     content: "测试人1在商品1的评论"
                  //   }];

                  //   data.forEach((item:any)=>{
                  //     commentList.push(item.itemName +  ' 评论：' + item.content);
                  //   });

                  //   (this.$refs.AllModal as any).open();
                  //   (this.$refs.AllModal as any).setInitParams(commentList,params.column.title,false);
                  // },50);
                  
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
                  // (this as tableComponent).followData(params.row);params.row.comment.userId
                  // 获取用户券
                  let couponList = [] as any;
                  get('http://127.0.0.1:3000/coupon/user',{userId: params.row._id})
                  .then((res:any)=>{
                    res.data.forEach((item:any)=>{
                    //   couponList.push(' 折扣：' + item.coupon.discount +  ' 过期时间：' + item.coupon.endTime + ' 是否使用：' + item.isUsed);
                      couponList.push(`折扣：${item.coupon.discount}元 过期时间：${item.coupon.endTime} 是否使用：${item.isUsed ? '是' : '否'}`)
                    });

                    (this.$refs.AllModal as any).open();
                    (this.$refs.AllModal as any).setInitParams(couponList,params.column.title,false);
                  })
                  .catch(err => {
                    this.$Message.error('加载失败'+err);
                  })
                  .finally(() => {
                    
                  });
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
                  // (this as tableComponent).followData(params.row);params.row.comment.userId
                  // 获取用户券
                  let collectsList = [] as any;
                  get('http://127.0.0.1:3000/collect',{id: params.row._id})
                  .then((res:any)=>{
                    res.data.forEach((item:any)=>{
                    //   couponList.push(' 折扣：' + item.coupon.discount +  ' 过期时间：' + item.coupon.endTime + ' 是否使用：' + item.isUsed);
                      collectsList.push(`商品名: ${item.itemName}`)
                    });

                    (this.$refs.AllModal as any).open();
                    (this.$refs.AllModal as any).setInitParams(collectsList,params.column.title,false);
                  })
                  .catch(err => {
                    this.$Message.error('加载失败'+err);
                  })
                  .finally(() => {
                    
                  });
                }
              }
            },
            '用户收藏'
          )
        ])
      }
    },
  ];
  data: Array<any> = [];

  // 要查询数据
  queryData: any = {
    page: 1,
    size: 10,
    keyword: undefined,
    flag:1
  };

  // 查询API
  getUsers(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/admin/getuser', this.queryData)
    .then((res:any)=>{
      this.data=(res as any).data;
      this.total=(res as any).total;

    // 地址转换
    (this.data as any).forEach((item:any)=>{
      let addressList = [] as any;
      item.addressList.forEach((element:any) => {
        let address = element.province + element.city + element.district + element.location + element.receiver;
        addressList.push(address);
      });
      item.addressList = addressList;
    });

    

      this.$Message.info((res as any).msg);
    })
    .catch((err:any) => {
       this.$Message.error('加载失败');
    })
    .finally(() => {
      loading.finish();
    });

    setTimeout(()=>{
      this.data = [
    {
      _id:'5e53e854f159f364ff694dd8',
      nickname:'小一',
      userName:'admin',
      userSex:'男',
      birth:'2016-03-01',
      userTel:'13138041921',
      addressList:[{
          receiver: "收件人",
          phone: "1",
          province: "广东省",
          city: "广州市",
          district: "从化区",
          location: "详细地址",
        },
        {
          receiver: "收件人",
          phone: "1",
          province: "广东省",
          city: "广州市",
          district: "从化区",
          location: "详细地址",
        }],
      comment:[
        {
          content: "在商品2的评论",
          type: "gpu 5700 ram 16",
          time: "2020-4-4 20:7:40"
        },
        {
          content: "在商品2的评论",
          type: "gpu 5700 ram 16",
          time: "2020-4-4 20:7:40"
        }
      ],
      coupon:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100'],
      orderList:[
        {
          item: [
            {
              name: "联想thinkpad x1",
              type: "aaa封官许愿封官许愿肺结核aa",
              price: 1,
              count: 1
            }
          ],
          _id: "5e80723cdf4be9360c31d12a",
          orderId: "202032918236161",
          userId: "5e639977001a8f3a7c007248",
          orderTime: "2020-3-29 18:2:36",
          total: "",
          status: "未发货",
        }
      ],
      collects:[
        {
          itemName: "商品2"
        },
        {
          itemName: "商品2"
        }
      ]
    },
    {
      _id:'5e8870916468542f48ba5f0e',
      nickname:'一仔',
      userName:'admin',
      userSex:'男',
      birth:'2016-01-01',
      userTel:'13138041921',
      addressList:[{
          receiver: "收件人",
          phone: "1",
          province: "广东省",
          city: "广州市",
          district: "从化区",
          location: "详细地址",
      }],
      orderList:[
        {
          item: [
            {
              name: "联想thinkpad x1",
              type: "aaa封官许愿封官许愿肺结核aa",
              price: 1,
              count: 1
            }
          ],
          _id: "5e80723cdf4be9360c31d12a",
          orderId: "202032918236161",
          userId: "5e639977001a8f3a7c007248",
          orderTime: "2020-3-29 18:2:36",
          total: "",
          status: "未发货",
        }
      ],
      collects:[
        {
          itemName: "商品2"
        },
        {
          itemName: "商品2"
        }
      ],  
      comment:[
        {
          content: "测试人1在商品2的评论",
          type: "gpu 5700 ram 16",
          time: "2020-4-4 20:7:40"
        },
        {
          content: "测试人1在商品2的评论",
          type: "gpu 5700 ram 16",
          time: "2020-4-4 20:7:40"
        }
      ],
      coupon:['【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑，电脑好评','【正常发货】联想 340C 十代酷睿i3 256G傲腾增强型SSD i3-1005G1/8G 15.6英寸轻薄本笔记本电脑,满200减100']
    }
  ];

    // 地址转换
    (this.data as any).forEach((item:any)=>{
        let addressList = [] as any;
        item.addressList.forEach((element:any) => {
          let address = element.province + element.city + element.district + element.location + element.receiver;
          addressList.push(address);
        });
        item.addressList = addressList;
      });

     // 收藏转换
     (this.data as any).forEach((item:any)=>{
        let collectsList = [] as any;
        item.collects.forEach((element:any) => {
          let address = element.itemName;
          collectsList.push(address);
        });
        item.collects = collectsList;
      })
      console.log(this.data);

    });

    loading.finish();
  }

  queryname(){
    this.queryData.page=1;
    this.queryData.flag=1;
    this.search();
  }

  // 搜索
  search(){
    const loading = this.$Loading;
    loading.start();
    get('http://127.0.0.1:3000/search/admin',this.queryData)
    .then((res:any)=>{
      this.data=(res as any).data;
      this.total=(res as any).total;
      this.$Message.info((res as any).msg);
    })
    .catch((err:any) => {
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
    this.getUsers();
  }
  onPageSizeChange(newPageSize: number) {
    this.queryData.size = newPageSize;
    this.getUsers();
  }

  created() {
   this.getUsers(); 
  }
}
</script>

<style scoped>
</style>
