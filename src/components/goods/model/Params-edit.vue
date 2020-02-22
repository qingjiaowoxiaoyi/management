<template>
    <div v-if="flag">
        <Modal v-model="flag" @on-ok='editParams' :title="title">
            <Form ref="formInline" :model="row" :rules="ruleInline" :label-width="100" inline >
                <FormItem label="分类名称：" prop="paramsName">
                    <Input v-model="row.paramsName" placeholder="请输入需要编辑的名称"></Input>
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
    this.row=row;
    this.title=title;
  }  

  // 编辑商品分类
  editParams(){
    if(this.row.paramsName===undefined){
       this.$Message.error('请填写分类名称')
       return;
    }
    this.requestParams();
  }

  @Emit('requestParams') private requestParams(): void {
  }
}
</script>

<style scoped>
</style>
