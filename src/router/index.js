import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminIngresoViews from '@/views/AdminIngresoViews.vue'
import UserViews from '@/views/UserViews.vue'
import CardsProdViews from '@/views/CardsProdViews.vue'
import HomeViews from '@/views/HomeViews.vue'
import ModViews from '@/views/ModViews.vue'
import DeleteViews from '@/views/DeleteViews.vue'

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'Home', component: HomeViews }
    ]
  },

  // Login del admin
  { path: '/admin/ingreso', name: 'AdminLogin', component: AdminLayout },

  // Vistas protegidas del admin
  { 
    path: '/admin/productos',
    redirect: '/admin/productos/users', // por defecto va a Users
    component: AdminIngresoViews,
    meta: { requiresAuth: true },
    children: [
      { path: 'users', name: 'Users', component: UserViews },
      { path: 'productos', name: 'Productos', component: CardsProdViews },
      { path: 'modificaciones', name: 'Modificaciones', component: ModViews },
      { path: 'eliminar', name: 'Eliminar', component: DeleteViews }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Protección de rutas
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("adminAuth") === "true";
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuth) {
    next('/admin/ingreso'); // si no está logueado, va al login
  } else {
    next();
  }
})

export default router
