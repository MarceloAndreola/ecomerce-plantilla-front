<template>
  <div>
    <nav class="mb-4" style="margin-top: 10px;">
      <!-- Links relativos -->
      <router-link to="users" class="mr-2">Usuarios</router-link> |
      <router-link to="productos">Productos</router-link> |
      <router-link to="modificaciones">Modificaciones</router-link> |
      <router-link to="Eliminar">Eliminar</router-link> |
      <router-link to="Historial">Historial</router-link> |
      <router-link to="Datos bancarios">Datos bancarios</router-link> |
      <router-link to="Seguimiento">Seguimiento</router-link>
      
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
