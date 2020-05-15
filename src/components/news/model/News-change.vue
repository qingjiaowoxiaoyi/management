<template>
    <div v-if="flag">
        <Modal v-model="flag"  @on-ok='addParams' :title="title" :loading='loading'>
            <Form ref="formInline" :model="row" :rules="ruleInline" :label-width="100" inline>
                <FormItem label="新闻标题:" prop="title">
                    <Input v-model="row.title" placeholder="请输入新闻标题"/>
                </FormItem> 
                <FormItem label="新闻内容:" prop="content">
                    <Input v-model="row.content" type="textarea" :autosize="true" placeholder="请输入新闻内容" style="width:350px;"/>
                </FormItem>
                <FormItem label="新闻图片">
                    <div v-if="flag">
                        <UploadImage :defaultList='newsimg' :picture.sync='row.picture'></UploadImage>
                    </div>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Button,Table,Page,Modal } from 'view-design';
import UploadImage from '@/components/goods/component/Upload-image.vue';
@Component({
  name:'NewsChange',
  components: {
    Button,
    Table,
    Page,
    Modal,
    UploadImage
  },
})

export default class NewsChange extends Vue {
  /**
  * 【选中数据初始化】
  */
  loading:boolean=true;
  title:string='';
  flag:boolean=false;
  row?:any={
    title:'',
    content:'',
    picture:''
  };
  newsimg:Array<any>=[];
  isadd:boolean=false;

//    validateSequence:any = (rule:any, value:any, callback:any) => {
//     //   let regNum = /^.{1,5}$/;
//     //   if (value === '') {
//     //         callback(new Error('输入排序(升序)'));
//     //   } else if (!Number.isInteger(+value)) {
//     //         callback(new Error('输入数字'));
//     //   } else if (!regNum.test(value)) {
//     //         callback(new Error('长度过长'));
//     //   } else {
//     //         callback();
//     //   }
//     console.log(rule,value,this.quaryDate.title)
//   }

  // 自定义验证
  ruleInline:any= {
    title: [
        // { required: true, message: '请输入需要添加的新闻标题', validator: this.validateSequence, trigger: 'blur',type:'string',min:1 }
        { required: true, message: '请输入需要添加的新闻标题', trigger: 'blur',type:'string',min:1 }
    ],
    content: [
        { required: true, message: '请输入需要添加的新闻内容',  trigger: 'blur',type:'string',min:1 }
    ],
  }

  open(){
    this.flag=true;
  }
  setInitNews(title:string,row?:any){
    this.title=title;
    if(row){
        this.row=row;
        this.newsimg=[{'url':`http://127.0.0.1:3000${row.picture.replace(/-/g,'/')}`}];
        this.isadd=false;
        return;
    }
    this.row={}
    this.newsimg=[];
    this.isadd=true;
  }  

  // 添加或者编辑新闻
  addParams(){
    if((this.row as any).title===undefined||(this.row as any).title===''){
       this.$Message.error('请填写新闻标题');
       setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500);
      return
    }else if((this.row as any).content===undefined||(this.row as any).content===''){
      this.$Message.error('请填写新闻内容');
       setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500);
      return
    }
    else{
        if(this.isadd){
          this.row._id=new Date().getTime() + '' + Math.floor(Math.random()*1000) + '';
          this.postNews(this.row);
        }else{
          this.putNews(this.row);
        }
        this.row={
            title:'',
            content:'',
            picture:''
        }
    }
    this.flag=false;
  }

  @Emit('postNews') private postNews(row:any): void {
      // console.log(row)
  }

  @Emit('putNews') private putNews(row:any): void {
      // console.log(row)
  }

}
</script>

<style scoped>
</style>
