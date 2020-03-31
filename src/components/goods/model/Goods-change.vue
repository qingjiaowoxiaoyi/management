<template>
  <div>
    <Modal v-model="flag" :title="title">
      <Form :model="row" ref="ruleValidate" :label-width="100" class="user-from" label-colon>
        <FormItem label="商品名称" prop="itemName" :rules="ruleValidate.itemName">
            <Input placeholder="商品名称" :maxlength="30" v-model="row.itemName"/>
        </FormItem>
        
        <FormItem label="首页图片" prop="homeimg">
            <div v-if="flag">
                <UploadImage :defaultList='homeimg'></UploadImage>
            </div>
        </FormItem>

        <FormItem label="商品图片" prop="goodsimg">
            <div v-if="flag">
                <UploadImage :defaultList='goodsimg'></UploadImage>
            </div>
        </FormItem>

        <FormItem label="库存数量" prop="stock" :rules="ruleValidate.stock">
            <Input v-model="row.stock" placeholder="库存数量"/>
        </FormItem>

        <FormItem label="商品分类" prop="junior" :rules="ruleValidate.junior">
            <Select v-model="row.junior" @on-change='requestSelect'>
                <OptionGroup :label="item.category" v-for="(item,index) in Params" :key="index">
                    <Option v-for="(element,num) in item.children" :value="element.propID" :key="num">{{ element.property }}</Option>
                </OptionGroup>
            </Select>
        </FormItem>

        <template v-if="row.junior">
            <FormItem label="商品参数" prop="styleID">
                <Select v-model="row.styleID" multiple @on-change='selectType'>
                    <OptionGroup :label="item.specType" v-for="(item,index) in selectedData" :key="index">
                        <Option v-for="(element,num) in item.specList" :value="element._id" :key="num">{{ element.style }}</Option>
                    </OptionGroup>
                </Select>
            </FormItem>
        </template>
        
        <FormItem label="商品价格" prop="oldPrice" :rules="ruleValidate.oldPrice">
            <InputNumber placeholder="价格" v-model="row.oldPrice" type="text"/>
        </FormItem>

        <FormItem label="是否促销" prop="promotion">
            <i-switch v-model="isPromotion">
                <Icon type="md-checkmark" slot="open"></Icon>
                <Icon type="md-close" slot="close"></Icon>
            </i-switch>
        </FormItem>

        <FormItem v-if="isPromotion" label="商品折扣价" prop="newPrice">
            <InputNumber placeholder="折扣价" v-model="row.newPrice" type="text"/>
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
      <template slot="footer">
        <Button type="info" @click="saveOrder">确认</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Modal,Card,Switch } from 'view-design';
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
  isPromotion:boolean=false;//是否促销

  // 输入控件数据约束
  ruleValidate: any = {
      itemName: [
          {
              required: true,
              min: 1,
              message: "名字不能为空",
              trigger: "blur"
          }
      ],
      stock: [
          {
              required: true,
              message: "请添加库存数量",
              trigger: "blur"
          }
      ],
      junior:[
          {
              required: true,
              message: "请添加商品属性",
              trigger: "change",
          }
      ],
      // styleID: [
      //     {
      //         required: true,
      //         message: "请添加商品参数",
      //         trigger: "change",
      //         type:'array',
      //         validator:(rule:any, value:any, callback:any) => {
      //           console.log(value,this.ruleValidate);
      //           callback('Fail!');
      //         }
      //     }
      // ],
      oldPrice: [
          {
              required: true,
              message: "请输入商品价格",
              trigger: "blur",
              type: "number",
          }
      ]
  }

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
    let close = true;
    (this.$refs['ruleValidate'] as any).validate((valid:any) => {
        if (valid) {
          close=true;
        } else {
          close=false;
        }
    })
    if(!close){
      return;
    }

    if(this.judge){
      // 修改
      this.putGoods(this.row)
      this.flag=false;
      return;
    }

    if(this.row.oldPrice<=this.row.newPrice){
      this.$Message.error('促销价禁止高于原价');
      return;
    }
    
    // 新增
    this.postGoods(this.row);
    this.flag=false;
  }

  selectType(value:any){
      this.row.styleID=value;
  }

  async requestSelect(value:any){
    this.row.junior=value;
    this.row.styleID=[];

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

    // setTimeout(()=>{
    //   this.selectedData=[
    //   {
    //     _id: "5e50db9c3d01c418f40eed4a",
    //     specType: "STORAGE",
    //     specList: [
    //       {
    //         _id:'5541',
    //         style:'东西'
    //       },
    //       {
    //         _id:'5542',
    //         style:'东西1'
    //       },
    //       {
    //         _id:'5543',
    //         style:'东西2'
    //       }
    //     ]
    //   }
    // ]
    // },50)
  }

  @Emit('putGoods') private putGoods(row:any): void {}

  @Emit('postGoods') private postGoods(row:any): void {}

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
    // setTimeout(()=>{
    //   this.Params=[
    //     {
    //       id: 1,
    //       category: "蛋糕",
    //       isok: true,
    //       level: "一级",
    //       children: [
    //         {
    //           propID: "5e50ce2445c74a3d48ec04dd",
    //           property: "蒸蛋糕",
    //           isok: true,
    //           level: "二级"
    //         },
    //         {
    //           propID: "5e50dcdc3d01c418f40eed4d",
    //           property: "年轮蛋糕",
    //           isok: true,
    //           level: "二级"
    //         },
    //         {
    //           propID: "5e522924870783457c03eead",
    //           property: "马卡龙",
    //           isok: true,
    //           level: "二级"
    //         }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       category: "电脑",
    //       isok: true,
    //       level: "一级",
    //       children: [
    //         {
    //           propID: "5e50ce2445c74a3d48ec04dc",
    //           property: "蒸蛋糕",
    //           isok: true,
    //           level: "二级"
    //         },
    //         {
    //           propID: "5e50dcdc3d01c418f40eed4c",
    //           property: "年轮蛋糕",
    //           isok: true,
    //           level: "二级"
    //         },
    //         {
    //           propID: "5e522924870783457c03eeac",
    //           property: "马卡龙",
    //           isok: true,
    //           level: "二级"
    //         }
    //       ]
    //     }
    //   ]
    // },50)
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