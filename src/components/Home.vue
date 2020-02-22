<template>
    <div class="layout">
        <Layout>
            <Header>
                <div>
                  <img style="height: 35px;" src="../assets/logo.png" alt />
                  <span style="font-size: 40px; color: #fff; margin-left: 15px;">电商后台管理系统</span>
                  <Button size="large" type="info" style="background-color: #4A5064; font-size: 10px; line-height: 24px; color: #fff; text-align: center; letter-spacing: 0.2em; cursor: pointer; float:right; margin-top:12px;">退出</Button>
                </div>
            </Header>
            <Layout>
                <Sider :style="{ background:'#fff', height: '100vh', left: 0, overflow: 'auto'}">
                    <!-- <Menu active-name="商品分类" theme="light" width="auto" :open-names="['用户管理']" @on-select='selectName' accordion>
                        <Submenu name="用户管理">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="用户信息">用户信息</MenuItem>
                        </Submenu>
                        <Submenu name="商品管理">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                商品管理
                            </template>
                            <MenuItem name="商品信息">商品信息</MenuItem>
                            <MenuItem name="商品分类">商品分类</MenuItem>
                            <MenuItem name="分类参数">分类参数</MenuItem>
                        </Submenu>
                        <Submenu name="信息管理">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                信息管理
                            </template>
                            <MenuItem name="文章新闻">文章新闻</MenuItem>
                        </Submenu>
                        <Submenu name="总数据统计(日)">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                总数据统计(日)
                            </template>
                            <MenuItem name="购买统计(日)">购买统计(日)</MenuItem>
                            <MenuItem name="收藏统计(日)">收藏统计(日)</MenuItem>
                        </Submenu>
                    </Menu> -->
                    <Menu :active-name="activeName" theme="light" width="auto" :open-names="[openName]" @on-select='selectName' @on-open-change='openChange' accordion>
                        <Submenu :name="item.meta.title" v-for="(item,index) in menulist" :key='index'>
                            <template slot="title">
                                <Icon :type="item.meta.icon"></Icon>
                                {{item.meta.title}}
                            </template>
                            <MenuItem v-for="(element,num) in item.children" :key='num' :name="element.meta.title" :to="element.path">{{element.meta.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <!-- <BreadcrumbItem>{{openName}}</BreadcrumbItem>
                        <BreadcrumbItem>{{activeName}}</BreadcrumbItem> -->
                        <BreadcrumbItem v-for="(item,index) in breadlist" :key="index">{{item.meta.title}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                    <!-- <router-view></router-view> -->
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue , Watch } from 'vue-property-decorator';
import { Menu,Button } from 'view-design';

@Component({
  components: {
    Menu,
    Button
  },
})

export default class HelloWorld extends Vue {
  menulist:Array<any>=[];// 菜单列表
  openName:string='';// 获取展开的 Submenu 的 name 集合
  activeName:string='';// 获取菜单的 name 值
  breadlist:Array<any>=[];// 面包屑容器

  // 获取展开的 Submenu 的 name 集合
  openChange(openName:any){
    window.sessionStorage.setItem('openName', openName)
    this.openName = window.sessionStorage.getItem('openName') as string;
  }

  // 获取菜单的 name 值
  selectName(activeName:any){
    window.sessionStorage.setItem('activeName', activeName)
    this.activeName = (window.sessionStorage.getItem('activeName')) as string;
  }

  // 当获取到的name值改变时，改变面包屑容器
  @Watch('activeName')changeBreadlist(){
      this.breadlist = this.$route.matched;
  }
//   @Watch('$route') //监控路由变化
//   routechange(to: any, from: any) {
//       this.breadlist = this.$route.matched;
//   }

  created() {
    this.menulist=(this.$router as any).options.routes[2].children.splice(1,(this.$router as any).options.routes[2].children.length);
    this.openName = window.sessionStorage.getItem('openName') as string;
    this.activeName = (window.sessionStorage.getItem('activeName')) as string;
    this.breadlist = this.$route.matched;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
