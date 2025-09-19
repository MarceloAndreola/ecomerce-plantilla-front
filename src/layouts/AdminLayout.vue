<template>
  <div class="p-6 max-w-md mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-6 text-center">Ingreso al Panel Admin</h1>
    
    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label class="block mb-1">Usuario</label>
        <br>
        <input v-model="username" type="text" class="border rounded w-full px-3 py-2" required />
      </div>
      <br>
      <div>
        <label class="block mb-1">Contraseña</label>
        <br>
        <input v-model="password" type="password" class="border rounded w-full px-3 py-2" required />
      </div>

      <br>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Ingresar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("https://ecomerce-plantilla-back-1.onrender.com/admin_auth/login", {
          method: 'POST', 
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            name_admin: this.username,
            password :  this.password
          })
        });

        if (!response.ok) throw new Error("Credenciales invalidas");

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        this.$router.push("/admin/productos/users");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>



