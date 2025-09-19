<template>
  <div class="home p-6 max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Crear usuario</h1>

    <input 
      type="text"
      v-model="name"
      placeholder="Nombre"
      class="border rounded w-full px-3 py-2 mb-4"
    >
    <input 
      type="password"
      v-model="password"
      placeholder="Contraseña"
      class="border rounded w-full px-3 py-2 mb-4"
    >
    
    <button @click="createUser" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-6">
      Crear Usuario
    </button>

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
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    },
    async createUser() {
      if (!this.name || !this.password) {
        alert('Por favor ingresa nombre y contraseña');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('password', this.password);

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/user/create-users', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${token}`  // ✅ token JWT
          },
          body: formData
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const newUser = await response.json();
        this.users.push(newUser);

        this.name = '';
        this.password = '';
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>
