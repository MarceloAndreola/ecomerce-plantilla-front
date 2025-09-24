<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
    <h1 class="text-3xl font-bold mb-4">❌ Pago fallido</h1>
    <p class="mb-6">Hubo un problema con tu pago. Intenta nuevamente.</p>
    <router-link to="/checkout" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
      Reintentar pago
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Failure"
}
</script>
