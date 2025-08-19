<template>
  <div>
    <nav class="mb-4">
      <!-- Links relativos -->
      <router-link to="users" class="mr-2">Usuarios</router-link> |
      <router-link to="productos">Productos</router-link>
    </nav>

    <!-- Aquí se renderizan los hijos: Users o Productos -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AdminIngresoViews",
};
</script>
