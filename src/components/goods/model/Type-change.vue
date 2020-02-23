<template>
    <div v-if="flag">
        <Modal v-model="flag" @on-ok='addType' :title="title" :loading='loading'>
            <Form ref="formInline" :rules="ruleInline" :label-width="100" inline>
                <FormItem label="分类名称：" prop="typeName">
                    <div v-if="judge">
                      <Input v-model="row.specType" placeholder="请输入分类名称"></Input>
                    </div>
                    <div v-if="!judge">
                      <Input v-model="row" placeholder="请输入分类名称"></Input>
                    </div>
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
  _id:any='';
  judge:boolean=true;//判断编辑还是添加 编辑true 添加false

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
    if(row.specType){
      this.row=row;
      this.judge=true;
      return;
    }
    this._id=row;
    this.row='';
    this.judge=false;
  }  

  // 编辑商品分类
  addType(){
    if(this.row.specType===''||this.row===''){
       this.$Message.error('请填写分类名称');
       setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500);
      return
    }else{
      if(this.judge){
        // 修改
        this.putType({
          specID:this.row._id,
          data:{
            specType:this.row.specType
          }
        },'http://127.0.0.1:3000/category')
        this.flag=false;
        return;
      }
      // 新增
      this.postType({
        cateID:this._id,
        data:{
          specType:this.row
        }
      },'http://127.0.0.1:3000/category/spec')
    }
    this.flag=false;
  }

  @Emit('putType') private putType(row:any,url?:any): void {
  }

  @Emit('postType') private postType(row:any,url?:any): void {
  }

}
</script>

<style scoped>
</style>
