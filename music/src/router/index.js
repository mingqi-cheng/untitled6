import { createRouter, createWebHistory } from 'vue-router';

    //路由表映射
	const routes = [
	  {
	    path: '/',
	    name: 'Home',
	    component: ()=>import('../components/HelloWorld.vue'),  //设置对应路径要加载的组件
	  },
	  {
	    path: '/about',
	    name: 'About',
	  
	    component: () => import('../components/xiaoyemian.vue'),  
	  },
	  {
		path:'/songlist',
		name:"songlist",
		component:()=>import("../components/songlist.vue")
	  }
	 
	]
    const router = createRouter({
        history: createWebHistory(),  //历史模式
        routes,  //路由规则
      });
     
  export default router;  //将路由缺省暴露出去，其他文件才可访问
  