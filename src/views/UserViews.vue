<template>
  <div class="home p-6 max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Crear usuario</h1>

    <input 
      type="text"
      v-model="name"
      placeholder="Nombre"
      class="border rounded w-full px-3 py-2 mb-4"
    >
    <br>
    <input 
      type="password"
      v-model="password"
      placeholder="Contraseña"
      class="border rounded w-full px-3 py-2 mb-4"
    >
    <br>
    <button @click="createUser" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-6">
      Crear Usuario
    </button>
    <br><br>
    <h3 class="text-xl mb-4">Usuarios creados:</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      users: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/user/lista_usuarios', {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        this.users = await response.json();
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    },
    async createUser() {
      if (!this.name || !this.password) {
        alert('Por favor ingresa nombre y contraseña');
        return;
      }

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/user/create-users', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.name,
            password: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || `Error: ${response.status}`);

        this.users.push({ id: data.id, name: data.name });
        alert(data.message); // 🔹 muestra confirmación del backend

        this.name = '';
        this.password = '';
      } catch (error) {
        console.error(error);
        alert(error.message || 'Error al crear el usuario');
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>
