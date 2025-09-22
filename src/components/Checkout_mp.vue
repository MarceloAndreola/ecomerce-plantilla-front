<template>
  <div id="checkout-button-container"></div>
</template>

<script>
import mercadopago from "mercadopago";

export default {
  props: ["product"],
  mounted() {
    const mp = new mercadopago(window.VUE_APP_MP_PUBLIC_KEY);

    fetch("http://localhost:5000/payment/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.product),
    })
      .then(res => res.json())
      .then(preference => {
        mp.checkout({
          preference: { id: preference.id },
          render: {
            container: "#checkout-button-container",
            label: "Pagar con Mercado Pago",
          },
        });
      });
  },
};
</script>
