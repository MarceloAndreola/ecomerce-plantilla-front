<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
    <h1>Mercado Pago</h1>

    <!-- Listado del carrito -->
    <ul style="list-style: none; padding: 0; width: 300px;">
      <li
        v-for="item in carrito.items"
        :key="item.id"
        style="display: flex; justify-content: space-between; margin-bottom: 5px;"
      >
        {{ item.name_prod }} x {{ item.cantidad }} = ${{ item.precio * item.cantidad }}
      </li>
    </ul>

    <p><strong>Total a pagar: ${{ total }}</strong></p>

    <!-- Botón de Mercado Pago -->
    <div id="mp-checkout-button"></div>
  </div>
</template>

<script>
import { carrito, totalCompra } from '@/cart.js'
import { onMounted } from 'vue'

export default {
  setup() {
    const total = totalCompra

    onMounted(async () => {
      const MP_PUBLIC_KEY = process.env.VUE_APP_MP_PUBLIC_KEY
      console.log("Clave pública de MP:", MP_PUBLIC_KEY)

      if (!MP_PUBLIC_KEY) {
        console.error("No se encontró la clave pública de Mercado Pago")
        return
      }

      try {
        // Creamos la preferencia en backend
        const res = await fetch("https://ecomerce-plantilla-back-1.onrender.com/payment/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: carrito.items.map(i => ({
              title: i.name_prod,
              quantity: i.cantidad,
              unit_price: i.precio
            }))
          })
        })

        const data = await res.json()
        console.log("Preferencia creada:", data)

        // Instanciamos Mercado Pago
        const mp = new window.MercadoPago(MP_PUBLIC_KEY)

        // Renderizamos el checkout
        mp.checkout({
          preference: { id: data.id },
          render: {
            container: "#mp-checkout-button",
            label: "Pagar con Mercado Pago",
          },
        })
      } catch (err) {
        console.error("Error al crear preferencia de Mercado Pago:", err)
      }
    })

    return { carrito, total }
  }
}
</script>
