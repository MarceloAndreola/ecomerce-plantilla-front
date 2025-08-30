import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AdminIngresoViews from '@/views/AdminIngresoViews.vue'
import UserViews from '@/views/UserViews.vue'
import CardsProdViews from '@/views/CardsProdViews.vue'
import HomeViews from '@/views/HomeViews.vue'
import ModViews from '@/views/ModViews.vue'
import DeleteViews from '@/views/DeleteViews.vue'
import CheckoutViews from '@/views/CheckoutViews.vue'
import CheckoutLayout from '@/layouts/CheckoutLayout.vue';
import CheckPayViews from '@/views/CheckPayViews.vue';
import BankDetailsViews from '@/views/BankDetailsViews.vue'
import ConfirmPayViews from '@/views/ConfirmPayViews.vue'
import HistorialPayViews from '@/views/HistorialPayViews.vue'
import SeguimientoViews from '@/views/SeguimientoViews.vue'
import CategoriasViews from '@/views/CategoriasViews.vue'


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
      { path: 'eliminar', name: 'Eliminar', component: DeleteViews },
      { path: 'bankdetails', name: 'BankDetails', component: BankDetailsViews },
      { path: 'confirmPay', name: 'ConfirmPay', component: ConfirmPayViews },
      { path: 'historialPay', name: 'HistorialPay', component: HistorialPayViews },
      { path: 'seguimiento', name: 'Seguimiento', component: SeguimientoViews },
      { path: 'categorias', name: 'Categorias', component: CategoriasViews }
    ]
  },
  {
    path: '/checkout',
    component: CheckoutLayout,
    children: [
      { path: '', name: 'Checkout', component: CheckoutViews },
      { path: 'pay', name: 'CheckPay', component: CheckPayViews  }
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
