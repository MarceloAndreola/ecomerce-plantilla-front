<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>Mercado Pago</h1>
    <p>Total a pagar: ${{ total }}</p>

    <div id="mp-checkout-button"></div>
  </div>
</template>

<script>
import { totalCompra } from '@/cart.js'

export default {
  setup() {
    const total = totalCompra

    // Función para cargar el checkout de Mercado Pago
    const loadMPCheckout = async () => {
      // Creamos la preferencia en backend
      const res = await fetch("http://localhost:5000/payment/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Compra ecommerce",
          quantity: 1,
          unit_price: total.value
        })
      })

      const data = await res.json()

      // Inicializamos Mercado Pago
      const script = document.createElement("script")
      script.src = "https://sdk.mercadopago.com/js/v2"
      script.onload = () => {
        const mp = new window.MercadoPago(import.meta.env.VUE_APP_MP_PUBLIC_KEY)
        mp.checkout({
          preference: { id: data.id },
          render: {
            container: "#mp-checkout-button",
            label: "Pagar con Mercado Pago",
          },
        })
      }
      document.body.appendChild(script)
    }

    loadMPCheckout()

    return { total }
  }
}
</script>
