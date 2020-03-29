<template>
    <Modal v-model="flag" :title="title">
        <div v-for="(item,index) in row" :key='index' style="margin-bottom:10px;">
          <Card>
            {{item.name}}
            <br/>
            {{' 类型:'+item.type}}
            <br/>
            {{' 价格:'+item.price}}
            <br/>
            {{' 数量:'+item.count}}
          </Card>
        </div>
    </Modal>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { Modal,Card } from 'view-design';
@Component({
name: 'buyShopName',
components: {
}
})
export default class buyShopName extends Vue {
  /**
   * 【选中数据初始化】
   */
  row:any={};
  flag:boolean=false;
  title:string='';

  open(){
    this.flag=true;
  }

  setInitParams(title:string,row:any){
    this.row=row;
    this.title=title;
  }
}
</script>

<style scoped>

</style>