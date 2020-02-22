import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from './router/index';
import App from './App.vue';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import echarts from "echarts";
import axios from 'axios';
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(Viewer);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
