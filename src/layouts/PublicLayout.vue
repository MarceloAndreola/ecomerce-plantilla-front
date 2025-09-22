<template>
  <div style="background: #f3f4f6;">
    <header>
      <nav
        style="display: flex; justify-content: space-between; align-items: center; background: #1f2937; padding: 10px 20px; border-radius: 10px;"
      >
        <!-- Logo -->
        <a href="#" style="color: white; font-weight: bold; font-size: 1.2rem;">
          Logo de la marca
        </a>

        <!-- Carrito -->
        <div style="position: relative; cursor: pointer;" @click="mostrar = !mostrar">
          <ShoppingCartIcon
            style="width: 28px; height: 28px; color: #3b82f6; transition: transform 0.2s ease;"
          />
          <span
            style="position: absolute; top: -6px; right: -6px; background: red; color: white; font-size: 0.7rem; font-weight: bold; padding: 2px 6px; border-radius: 50%;"
          >
            {{ carrito.cantidad }}
          </span>
        </div>
      </nav>
    </header>

    <!-- Dropdown del carrito con overlay -->
    <div v-if="mostrar">
      <div
        @click="mostrar = false"
        style="position: fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.3); z-index:10;"
      ></div>

      <div
        style="position: fixed; right:20px; top:70px; background:white; border:1px solid #ddd; border-radius:10px; padding:15px; width:250px; box-shadow:0 4px 10px rgba(0,0,0,0.2); z-index:20;"
      >
        <h3 style="margin-bottom:10px;">Carrito de prueba</h3>
        <div v-if="carrito.items.length === 0">Vacío</div>
        <ul style="display: flex; flex-direction: column; align-items: start; list-style-type: none; padding: 0;">
          <li v-for="(item, index) in carrito.items" :key="item.id" style="margin-bottom:5px; display:flex; justify-content: space-between; align-items:center; width: 100%;">
            <div>
              {{ item.name_prod }} - ${{ item.precio }} 
            </div>
            <div>
              <button @click="sumar(item)">+</button>
              x {{ item.cantidad }}
              <button @click="restar(item)">-</button>
            </div>
          </li>
        </ul>
        <div v-if="carrito.items.length > 0" style="margin-top:10px; text-align:right;">
          <div v-if="carrito.items.length > 0" style="margin-top:10px; text-align:right;">
          <br><br>
          <strong>Total: ${{ total }}</strong>
          <br><br>
          <button @click="finalizarCompra" 
                  style="background:#3b82f6; color:white; padding:5px 10px; border:none; border-radius:5px; cursor:pointer;">
            Finalizar compra
          </button>
        </div>
        </div>
      </div>
    </div>

    <main>
      <div style="margin:5px 0;">
        <img src="/img/img-prueba-1.jpg" alt="imagen principal" style="filter: brightness(70%); max-width: 100%; max-height: 100%;">
      </div>
      <router-view />
    </main>

    <footer style="background: #1f2937; color: white; padding: 30px 20px; margin-top: 40px; border-radius: 10px;">
      <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
        <h3 style="margin-bottom: 20px; font-size: 1.3rem;">Contactos</h3>
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
          <a href="#" style="background: #3b82f6; padding: 10px 20px; border-radius: 30px; text-decoration: none; color: white; font-weight: bold;"
             @mouseover="e => e.target.style.background = '#2563eb'" @mouseleave="e => e.target.style.background = '#3b82f6'">
            Instagram
          </a>
          <a href="#" style="background: #10b981; padding: 10px 20px; border-radius: 30px; text-decoration: none; color: white; font-weight: bold;"
             @mouseover="e => e.target.style.background = '#059669'" @mouseleave="e => e.target.style.background = '#10b981'">
            Whatsapp
          </a>
        </div>
        <p style="margin-top: 25px; font-size: 0.9rem; color: #9ca3af;">© 2025 E-commerce - Todos los derechos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { carrito } from '@/cart.js'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'PublicLayout',
  components: { ShoppingCartIcon },
  setup() {
    const mostrar = ref(false)
    const router = useRouter()

    const total = computed(() =>
      carrito.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
    )

    const sumar = (item) => {
      item.cantidad++
      carrito.cantidad = carrito.items.reduce((acc, i) => acc + i.cantidad, 0)
    }

    const restar = (item) => {
      if (item.cantidad > 1) {
        item.cantidad--
      } else {
        carrito.items = carrito.items.filter(i => i.id !== item.id)
      }
      carrito.cantidad = carrito.items.reduce((acc, i) => acc + i.cantidad, 0)
    }

    const finalizarCompra = () => {
    mostrar.value = false
    router.push('/checkout')
  }

    return { carrito, mostrar, sumar, restar, total, finalizarCompra }
  }
}
</script>
