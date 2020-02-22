<template>
    <div v-if="flag">
        <Modal v-model="flag" @on-ok='addType' :title="title" :loading='loading'>
            <Form ref="formInline" :rules="ruleInline" :label-width="100" inline>
                <FormItem label="分类名称：" prop="typeName">
                    <Input v-model="row" placeholder="请输入分类名称"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
@Component({
  name:'TypeChange',
  components: {
    Button,
    Table,
    Page,
    Modal
  },
})

export default class TypeChange extends Vue {
  /**
  * 【选中数据初始化】
  */
  row?:any='';
  loading:boolean=true;
  flag:boolean=false;
  title:string='';

  // 自定义验证
  ruleInline:any= {
    typeName: [
        { required: true, message: '请输入需要添加的名称', trigger: 'blur' }
    ]
  }

  open(){
    this.flag=true;
  }
  setInitType(title:string,row?:any){
    this.title=title;
    if(row){
        this.row=row;
        return;
    }
    this.row='';
  }  

  // 编辑商品分类
  addType(){
    if(this.row===''){
       this.$Message.error('请填写分类名称');
       setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500);
      return
    }else{
        this.requestType();
    }
    this.flag=false;
  }

  @Emit('requestType') private requestType(): void {
  }

}
</script>

<style scoped>
</style>
