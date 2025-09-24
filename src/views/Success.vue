<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-800">
    <h1 class="text-3xl font-bold mb-4">✅ ¡Pago exitoso!</h1>
    <p class="mb-6">Tu compra fue procesada correctamente.</p>
    <router-link to="/" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
      Volver al inicio
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Success"
}
</script>
