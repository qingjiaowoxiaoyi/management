<template>
  <div>
    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key='index'>
        <template v-if="item.status === 'finished'">
            <span>
                <viewer>
                    <img :src="item.url" style="width: 100%">
                </viewer>
                <!--图片-->
                <div class="demo-upload-list-cover">
                    <!-- <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon> -->
                    <!--删除按钮-->
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </span>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        v-if="uploadList.length<1"
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="nulls"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
        </div>
    </Upload>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Modal,Card } from 'view-design';
import Viewer from "v-viewer";
@Component({
name: 'UploadImage',
components: {
    
}
})
export default class UploadImage extends Vue {
  @Prop({ default: [] }) defaultList?: Array<any>;
  @Prop({ default: '' }) picture?: any;

  imgUrl:string= ''
  uploadList:Array<any>= []
  imgbase:any;//获取图片的base64
  
  handleView (url:any) {
      this.imgUrl = url;
  }
  handleRemove (file:any) {
    //   const fileList = (this.$refs.upload as any).fileList;
    //   (this.$refs.upload as any).fileList.splice(fileList.indexOf(file), 1);
    this.uploadList = this.uploadList.filter(item => item.url != file.url);
    this.imgbase='';
    this.$emit('update:picture', '');
  }
  handleSuccess (res:any, file:any) {
    //   file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
    //   file.name = '7eb99afb9d5f317c912f08b5212fd69a';
  }
  handleFormatError (file:any) {
      this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
  }
  handleMaxSize (file:any) {
      this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
  }
  handleBeforeUpload (file:any) {
    const check = this.uploadList.length < 5;
    if (!check) {
        this.$Notice.warning({
            title: 'Up to five pictures can be uploaded.'
        });
    }

    // console.log(window.URL.createObjectURL(file))
    // this.uploadList.push(window.URL.createObjectURL(file))
    
    // 创建一个 FileReader 对象
    let reader = new FileReader()
    // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
    // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串示文件的数据）
    // 读取文件作为 URL 可访问地址
    reader.readAsDataURL(file);
    const _this = this;
    reader.onloadend = function (e) {
        file.url = reader.result;
        file.status='finished';
        _this.uploadList.push(file);
        _this.$emit('update:picture', (e.target as any).result);
    }
    return false;

    // this.file = file //需要传给后台的file文件
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onload = () => {
    //     const _base64 = reader.result
    //     this.imgUrl = _base64 //将_base64赋值给图片的src，实现图片预览
    //   }
    //   return false//阻止图片继续上传，使得form表单提交时统一上传
  }

  mounted () {
      this.uploadList = (this.$refs.upload as any).fileList;
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