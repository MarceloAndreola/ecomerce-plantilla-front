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

      // Instanciamos Mercado Pago con la Public Key de .env
      const mp = new window.MercadoPago("TU_PUBLIC_KEY_DE_PRUEBA") // probar con la key directamente

      mp.checkout({
        preference: { id: data.id },
        render: {
          container: "#mp-checkout-button",
          label: "Pagar con Mercado Pago",
        },
      })
    }

    loadMPCheckout()

    return { total }
  }
}
</script>
