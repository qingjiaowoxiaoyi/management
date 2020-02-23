<template>
    <div v-if="flag">
        <Modal v-model="flag" @on-ok='editParams' :title="title">
            <Form ref="formInline" :model="row" :rules="ruleInline" :label-width="100" inline >
                <FormItem label="分类名称：" prop="paramsName">
                    <Input v-model="row.category" placeholder="请输入需要编辑的名称"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
@Component({
  name:'ParamsEdit',
  components: {
    Button,
    Table,
    Page,
    Modal
  },
})

export default class ParamsEdit extends Vue {
  /**
  * 【选中数据初始化】
  */
  row?:any;
  flag:boolean=false;
  title:string='';
  judge:boolean=true;//判断一级还是二级 一级为true 二级为false
  old:string='';//一级的旧名字

  // 自定义验证
  ruleInline:any= {
    paramsName: [
        { required: true, message: '请输入需要编辑的名称', trigger: 'blur' }
    ]
  }

  open(){
    this.flag=true;
  }
  setInitParams(row:any,title:string){
    this.title=title;
    this.row=row;
    if(row.children&&row.children.length>0){
      // 一级
      this.old = row.category;
      this.judge = true;
      return
    }
    // 二级
    this.judge = false;
  }  

  // 编辑商品分类
  editParams(){
    if(this.row.category===undefined){
       this.$Message.error('请填写分类名称')
       return;
    }
    if(this.judge){
      this.requestParams({old:this.old,new:this.row.category});
      return;
    }
    this.requestParams(
      {
        propID:this.row.propID,
        data:{
          property:this.row.category
        }
      }
    );
  }

  @Emit('requestParams') private requestParams(rowdata:any): void {
  }
}
</script>

<style scoped>
</style>
