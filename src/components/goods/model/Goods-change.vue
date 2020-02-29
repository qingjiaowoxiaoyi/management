<template>
  <div>
    <Modal v-model="flag" :title="title" @on-ok='saveOrder'>
      <Form :model="row" :rules="rules" :label-width="100" ref="dataForm" class="user-from" label-colon>
        <FormItem label="商品名称" prop="itemName">
            <Input placeholder="商品名称" :maxlength="30" v-model="row.itemName"/>
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

        <FormItem label="库存数量" prop="stock">
            <Input v-model="row.stock" placeholder="库存数量"/>
        </FormItem>

        <!-- <FormItem label="商品优惠" prop="coupon">
            满<Input :maxlength="5" v-model="row.couponfirst" style="width:50px;"/>减<Input :maxlength="5" v-model="row.couponsecond" style="width:50px;"/>
        </FormItem> -->

        <FormItem label="商品分类" prop="type">
            <Select v-model="row.junior" @on-change='requestSelect'>
                <OptionGroup :label="item.category" v-for="(item,index) in Params" :key="index">
                    <Option v-for="(element,num) in item.children" :value="element.propID" :key="num">{{ element.property }}</Option>
                </OptionGroup>
            </Select>
        </FormItem>

        <template v-if="row.junior">
            <FormItem label="商品参数" prop="type">
                <Select v-model="row.styleID" multiple @on-change='Select'>
                    <OptionGroup :label="item.specName" v-for="(item,index) in selectedData" :key="index">
                        <Option v-for="(element,num) in item.specList" :value="element._id" :key="num">{{ element.style }}</Option>
                    </OptionGroup>
                </Select>
            </FormItem>
        </template>
        
        <FormItem label="商品价格" prop="price">
            <Input placeholder="价格" v-model="row.price" type="text"/>
        </FormItem>

        <FormItem label="销售量" prop="salesCount">
            <!-- <Input placeholder="销售量" v-model="row.salesCount" type="text"/> -->
            {{row.salesCount}}
        </FormItem>

        <FormItem label="收藏量" prop="collectCount">
            <!-- <Input placeholder="collectCount" v-model="row.collectCount" type="text"/> -->
            {{row.collectCount}}
        </FormItem>

        <FormItem label="评价量" prop="rateCount">
            <!-- <Input placeholder="评价量" v-model="row.rateCount" type="text"/> -->
            {{row.rateCount}}
        </FormItem>

        <FormItem label="详情" prop="itemDetail">
            <Input v-model="row.itemDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入详情" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Modal,Card } from 'view-design';
import Viewer from "v-viewer";
import UploadImage from '../component/Upload-image.vue';
import {get,post,put,deletefn} from '@/api/axios';
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
  judge:boolean=false;//编辑为true 新增为false
  Params:any=[];//商品分类数据
  selectedData:Array<any>=[];//参数分类数据

  open(){
    this.flag=true;
  }
  setInitParams(title:string,row?:any){
    this.title=title;
    if(row){
        this.row=row;
        this.homeimg=[{'url':row.homeimg}];
        this.goodsimg=[{'url':row.goodsimg}];
        this.selectedData=row.styleList;
        this.judge=true;
        return;
    }
    this.row={};
    this.homeimg=this.goodsimg=[];
    this.row.salesCount=this.row.collectCount=this.row.rateCount=0;
    this.judge=false;
  }

  // 保存订单信息
  saveOrder(){
    if(this.judge){
        // 修改
        this.putGoods(this.row)
        this.flag=false;
        return;
      }
      // 新增
      this.postGoods(this.row);
      this.flag=false;
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

  Select(value:any){
      this.row.styleID=value;
  }

  async requestSelect(value:any){
      this.row.junior=value;
      this.row.styleID=[];
      
    //   await this.$nextTick();

    // 查询属性api
    const loading = this.$Loading;
    loading.start();
    post('http://127.0.0.1:3000/category/getspec',{property:value})
    .then(res=>{
        if((res as any).code === '200'){
            this.selectedData = (res as any).doc.specs;
            this.$Message.info((res as any).msg);
        } else {
            this.$Message.error((res as any).msg);
        }
    }).catch(err => {
       this.$Message.error('加载失败');
    }).finally(() => {
      loading.finish();
    });
  }

  @Emit('putGoods') private putGoods(row:any): void {
  }

  @Emit('postGoods') private postGoods(row:any): void {
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
 created() {
   this.getParams();
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