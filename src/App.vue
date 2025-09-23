<template>
  <div id="app">
    <!--
      -->
      <nav style="display: flex; justify-content: center; gap: 10px; padding: 20px; border: 2px solid grey;">
        <router-link to="/">Home</router-link>
        <router-link to="/admin/ingreso">Admin</router-link>
      </nav>    
      
    <!-- Aquí se carga PublicLayout o AdminLayout según la ruta -->
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted() {
      // Despierta el backend en Render
      fetch("https://ecomerce-plantilla-back-1.onrender.com/productos/test")
        .then(() => console.log("Backend despertado"))
        .catch(err => console.error("Error despertando backend:", err));
    }
  }

  
  
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
