<template>
   <div v-if='flag'>
     <Tag v-for="(item,index) in count" :key="index" :name="item.style" closable @on-close="handleClose(item.style,item._id)">{{item.style}}</Tag>
     <Input style="width:200px;" v-model="addtag" size="small" placeholder="请输入" @on-blur="handleAdd"/>
   </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
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
    @Prop({default:''}) specID?:string;

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
      (this.count as any).push({style:this.addtag});
      this.addSpec({specID:this.specID,data:{style:this.addtag}})
      this.addtag='';
    }

    handleClose (name:any,_id:any) {
        // const index = this.count!.indexOf(name);
        // this.count!.splice(index, 1);
        this.delSpec({specID:this.specID,styleID:_id})
    }
    
    @Emit('addSpec') private addSpec(row:any): void {
    }
    @Emit('delSpec') private delSpec(row:any): void {
    }
}
</script>

<style scoped>
</style>
