<template>
  <div>
    <Modal v-model="flag" :title="title" @on-ok='saveOrder'>
      <Form :model="row" :rules="rules" :label-width="100" ref="dataForm" class="user-from">
        <FormItem label="商品名称" prop="name">
            <Input placeholder="商品名称" :maxlength="30" v-model="row.name"/>
        </FormItem>
        
        <FormItem label="首页图片" prop="game">
            <div v-if="flag">
                <UploadImage :defaultList='homeimg'></UploadImage>
            </div>
        </FormItem>

        <FormItem label="商品图片" prop="orgname">
            <div v-if="flag">
                <UploadImage :defaultList='goodsimg'></UploadImage>
            </div>
        </FormItem>

        <FormItem label="库存数量" prop="storeNum">
            <Input v-model="row.storeNum" placeholder="库存数量"/>
        </FormItem>

        <FormItem label="商品优惠" prop="coupon">
            满<Input :maxlength="5" v-model="row.couponfirst" style="width:50px;"/>减<Input :maxlength="5" v-model="row.couponsecond" style="width:50px;"/>
        </FormItem>

        <FormItem label="商品参数" prop="type">
            <!-- <Select v-model="row.userType">
                <Option>
                    512G固态、i7八代处理器
                </Option>
            </Select> -->
            512G固态、i7八代处理器
        </FormItem>

        <FormItem label="销售量" prop="sellNum">
            <Input placeholder="销售量" v-model="row.sellNum" type="text"/>
        </FormItem>

        <FormItem label="收藏量" prop="collectionNum">
            <Input placeholder="collectionNum" v-model="row.collectionNum" type="text"/>
        </FormItem>

        <FormItem label="评价量" prop="evaluateNum">
            <Input placeholder="评价量" v-model="row.evaluateNum" type="text"/>
        </FormItem>

        <FormItem label="详情" prop="details">
            <Input v-model="row.details" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详情" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Modal,Card } from 'view-design';
import Viewer from "v-viewer";
import UploadImage from '../component/Upload-image.vue';
@Component({
    name: 'ChangeGoods',
    components: {
        UploadImage
    }
})
export default class ChangeGoods extends Vue {
  /**
   * 【选中数据初始化】
   */
  homeimg:Array<any>=[];
  goodsimg:Array<any>=[];
  flag:boolean=false;
  title:string='';
  row?:any={};

  open(){
    this.flag=true;
  }
  setInitParams(title:string,row?:any){
    this.title=title;
    if(row){
        this.row=row;
        this.homeimg=[{'url':row.homeimg}];
        this.goodsimg=[{'url':row.goodsimg}];
        return;
    }
    this.row={};
    this.homeimg=this.goodsimg=[];
  }

  // 保存订单信息
  saveOrder(){
    this.updateadd();
  }

  // 添加api
  updateadd(){
      
  }

  // 输入控件数据约束
  rules: any = {
      username: [
          {
              required: true,
              min: 1,
              message: "名字不能为空",
              trigger: "blur"
          }
      ],
      password: [
          {
              required: true,
              min: 6,
              message: "密码不能小于6位的字符",
              trigger: "blur"
          }
      ]
  }
}
</script>

<style scoped>
.user-from FormItem input {
    width: 100%;
}

.popClass {
    position: absolute;
    right: 30px;
    top: 130px;
}

.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 20px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>