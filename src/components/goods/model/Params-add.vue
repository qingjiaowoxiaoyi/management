<template>
    <div v-if="flag">
        <Modal v-model="flag" @on-ok='addParams' :title="title" :loading='loading'>
            <Form :model="quaryDate" ref="formInline" :rules="ruleInline" :label-width="100" inline>
                <FormItem label="父级分类：" prop="category">
                    <Input v-model="quaryDate.category" placeholder="请输入父级分类名称"></Input>
                </FormItem>
                <!-- <FormItem label="父级分类：">
                    <Select v-model="parentParams" style="width:200px">
                        <Option v-for="(item,index) in row" :value="item.paramsName" :key="index">{{ item.paramsName }}</Option>
                    </Select>
                </FormItem> -->
                <FormItem label="分类名称：" prop="property">
                    <Input v-model="quaryDate.property" placeholder="请输入分类名称"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
@Component({
  name:'ParamsAdd',
  components: {
    Button,
    Table,
    Page,
    Modal
  },
})

export default class ParamsAdd extends Vue {
  /**
  * 【选中数据初始化】
  */
  loading:boolean=true;
  row?:Array<any>;
  flag:boolean=false;
  title:string='';
  parentParams:string='';  
  quaryDate:any={
    category:'',
    property:''
  }

  // 自定义验证
  ruleInline:any= {
    category: [
        { required: true, message: '请输入需要添加父级的名称', trigger: 'blur' }
    ],
    property:  [
        { required: true, message: '请输入需要添加的名称', trigger: 'blur' }
    ],
  }

  open(){
    this.flag=true;
  }
  setInitParams(row:any,title:string){
    this.row=row;
    this.title=title;
  }  

  // 编辑商品分类
  addParams(){
    if((this.quaryDate as any).category===''||(this.quaryDate as any).property===''){
       this.$Message.error('请填写分类名称');
       setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500);
      return
    }else{
        // if(this.parentParams===''){
        //     // 当没有填写父级分类，把当前this.quaryDate.paramsName作为父类，上传给服务器
        //     let name = this.quaryDate.paramsName;
        //     this.requestParams();
        //     this.quaryDate.paramsName='';
        // }else{
        //     // 当填写父级分类和分类名称，把当前parentParams作为父类，上传给服务器查询，this.quaryDate.paramsName作为子类上传并添加到父类，并返回新的数据，再次调用更新数据
        //     this.requestParams();
        //     this.parentParams='';
        // }
        this.requestParams(this.quaryDate);
        this.quaryDate = {
          category:'',
          property:''
        }
    }
    this.flag=false;
  }

  @Emit('requestParams') private requestParams(row:any): void {
  }

}
</script>

<style scoped>
</style>
