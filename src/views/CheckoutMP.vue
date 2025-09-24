<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
    <h1>Mercado Pago</h1>

    <!-- Listado del carrito -->
    <ul style="list-style: none; padding: 0; width: 300px;">
      <li v-for="item in carrito.items" :key="item.id" style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        {{ item.name_prod }} x {{ item.cantidad }} = ${{ item.precio * item.cantidad }}
      </li>
    </ul>

    <p><strong>Total a pagar: ${{ total }}</strong></p>

    <!-- Botón de redirección -->
    <button @click="pagar" style="padding: 10px 20px; background: #009EE3; color: white; border: none; border-radius: 5px; cursor: pointer;">
      Pagar con Mercado Pago
    </button>
  </div>
</template>

<script>
import { carrito, totalCompra } from '@/cart.js'
import { ref } from 'vue'

export default {
  setup() {
    const total = totalCompra

    const pagar = async () => {
      try {
        // Crear preferencia en el backend
        const res = await fetch("https://ecomerce-plantilla-back-1.onrender.com/payment/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: carrito.items.map(i => ({
              title: i.name_prod,
              quantity: i.cantidad,
              unit_price: i.precio
            })),
            total: total.value
          })
        })

        const data = await res.json()
        console.log("Preferencia creada:", data)

        // Redirigir a la página de pago
        if (data.init_point) {
          window.location.href = data.init_point
        } else {
          console.error("No se encontró init_point en la respuesta:", data)
        }
      } catch (err) {
        console.error("Error al crear preferencia de Mercado Pago:", err)
      }
    }

    return { carrito, total, pagar }
  }
}
</script>
