import { createRouter, createWebHistory } from 'vue-router'
import inicial from '../components/inicial.vue'
import detalhe from '../components/detalhe.vue'
const routes = [
  {
    path: '/',
    name: 'inicial',
    component: inicial,
    title: 'Valida Siga',
  },

  {
    path: '/protocolo/:id',
    name: 'detalhe',
    // route level code-splitting
    // this generates a separate chunk (protocolo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: detalhe,
    title: 'Valida Siga',
    

  }, {
    path: '/protocolo',
    name: 'none',
    // route level code-splitting
    // this generates a separate chunk (protocolo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: inicial,
    title: 'Valida Siga',
  },

]


export const router = createRouter({
  history: createWebHistory("/validasiga/"),
  routes,
  data(){
    return{
      status:0
    }
  },
  methods:{
    setStatusSearch: function(a){
      console.log("listen router",a)
      this.status = a
    }

  }
})
router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  console.log(to, from)
  window.history.pushState("", "", to.href)
  return true
})

