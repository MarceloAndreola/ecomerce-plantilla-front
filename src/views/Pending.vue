<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-yellow-800">
    <h1 class="text-3xl font-bold mb-4">⏳ Pago pendiente</h1>
    <p class="mb-6">Tu pago está siendo procesado. Te notificaremos cuando se confirme.</p>
    <router-link to="/" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
      Volver al inicio
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Pending"
}
</script>
