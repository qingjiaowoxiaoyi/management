<template>
  <div>
    <Modal v-model="flag" :title="title" @on-ok='saveOrder'>
      <div v-if="!order">
        <div v-for="(item,index) in row" :key='index' style="margin-bottom:10px;">
          <Card>
            {{item}}
          </Card>
        </div>
      </div>

      <div v-if="order" >
        <div v-for="(item,index) in row" :key='index' style="margin-bottom:10px;">
          <Card>
            {{item.orderName}}
            <div style="float:right;">
              <RadioGroup v-model="item.orderType" type="button" size='small'>
                <Radio label="到货"></Radio>
                <Radio label="未到货"></Radio>
                <Radio label="已退款"></Radio>
              </RadioGroup>
            </div>
          </Card>
        </div>
        <!-- <div v-if="!order" slot="footer">
          <Button type="info" @click="flag = false;">取消</Button>
          <Button type="success" @click="saveOrder">保存</Button>
        </div> -->
      </div>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Modal,Card } from 'view-design';
@Component({
name: 'AllModal',
components: {
}
})
export default class AllModal extends Vue {
  /**
   * 【选中数据初始化】
   */
  row:any={};
  flag:boolean=false;
  title:string='';
  order?:boolean=true;
  // type?:number;// 识别类型 0.收货地址 1.用户评价 2.优惠券 3.收藏
  open(){
    this.flag=true;
  }
  setInitParams(row:any,title:string,order?:boolean){
    this.row=row;
    this.title=title;
    this.order=order;
  }

  // 保存订单信息
  saveOrder(){
    if(!this.order){
      return;
    }
  }

}
</script>

<style scoped>

</style>