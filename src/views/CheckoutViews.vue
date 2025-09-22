<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>Total de la compra de prueba</h1>
    <ul style="list-style-type: none;">
      <li v-for="item in carrito.items" :key="item.id">
        {{ item.name_prod }} x {{ item.cantidad }} = ${{ item.precio * item.cantidad }}
      </li>
    </ul>
    <p>Total a pagar: ${{ total }}</p>
    <button @click="transferencia">Tranferencia</button>
    <button @click="mercadoPago">Mercado Pago</button>
  </div>
</template>

<script>
import { carrito, totalCompra } from '@/cart.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const transferencia = () => {
      // No vaciamos el carrito todavía
      router.push('/checkout/pay')
    }

    const mercadoPago = () => {
      // No vaciamos el carrito todavía
      router.push('/checkout/mp')
    }

    return { carrito, total: totalCompra, transferencia, mercadoPago }
  }
}
</script>
