import Vue from 'vue'
import App from './App'
import router from './router'
import {Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar,Tab,
  Tabs,Tabbar, TabbarItem,PullRefresh,Cell,CellGroup,Stepper} from 'vant'



Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)
  .use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(Tabbar).use(TabbarItem)
  .use(PullRefresh).use(Cell).use(CellGroup).use(Stepper);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
