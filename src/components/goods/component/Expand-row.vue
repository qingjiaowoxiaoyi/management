<template>
   <div v-if='flag'>
     <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose">{{item}}</Tag>
     <Input style="width:200px;" v-model="addtag" size="small" placeholder="请输入" @on-blur="handleAdd"/>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tag,Input } from 'view-design';

@Component({
  components: {
    Tag,
    Input
  },
})

export default class Type extends Vue {
    // @Prop({default:function(){return []}}) row?:Array<any>=[];
    @Prop({default:function(){return []}}) count?:Array<any>;
    @Prop({default:false}) flag?:boolean;

    addtag:string='';

    handleAdd () {
       if(this.addtag===''){
         return ;
       }
      //  if (this.count!.length) {
      //      this.count!.push(this.addtag);
      //      this.addtag='';
      //  } else {
      //      this.count!.push(0);
      //      this.addtag='';
      //  }
      (this.count as any).push(this.addtag);
      this.addtag='';
    }

    handleClose (event:any, name:any) {
        const index = this.count!.indexOf(name);
        this.count!.splice(index, 1);
    }
    
}
</script>

<style scoped>
</style>
