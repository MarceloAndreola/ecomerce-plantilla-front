<template>
  <div class="checkout-container">
    <div class="checkout-card">
      <h1 class="checkout-title">Resumen de tu compra</h1>

      <!-- Listado del carrito -->
      <ul class="checkout-list">
        <li v-for="item in carrito.items" :key="item.id" class="checkout-item">
          <span>{{ item.name_prod }} x {{ item.cantidad }}</span>
          <span>${{ item.precio * item.cantidad }}</span>
        </li>
      </ul>

      <div class="checkout-total">
        <p>Total:</p>
        <p class="checkout-total-amount">${{ total }}</p>
      </div>

      <!-- Botón de redirección -->
      <button @click="pagar" class="checkout-btn">
        Pagar con Mercado Pago
      </button>
    </div>
  </div>
</template>

<script>
import { carrito, totalCompra } from '@/cart.js'

export default {
  setup() {
    const total = totalCompra

    const pagar = async () => {
      try {
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

        if (data.sandbox_url) {
          window.location.href = data.sandbox_url
        } else {
          console.error("No se encontró sandbox_url en la respuesta:", data)
        }
      } catch (err) {
        console.error("Error al crear preferencia de Mercado Pago:", err)
      }
    }

    return { carrito, total, pagar }
  }
}
</script>

<style scoped>
.checkout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.checkout-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.checkout-title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.checkout-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px;
}

.checkout-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #444;
}

.checkout-total {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.1rem;
}

.checkout-total-amount {
  color: #009EE3;
  font-size: 1.2rem;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: #009EE3;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.checkout-btn:hover {
  background: #007bb8;
}
</style>
