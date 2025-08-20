<template>
  <div class="home">
    <h1>Crear usuario</h1>
    <input 
      type="text"
      v-model="name"
      placeholder="Nombre"
    >
    <br><br>
    <input 
      type="file" 
      @change="handleFile" 
      ref="fileInput"
    />    
    <br><br>
    <button @click="createUser">Enviar</button>
    
    <h3>Usuarios creados:</h3>
    <div 
    v-if="users.length" 
    style="
    display: 
    flex; flex-wrap: 
    wrap; justify-content: 
    space-around;
    "
    >
      <div 
        v-for="(user, index) in users" 
        :key="index" 
        class="card"

      >
        <p>Nombre: {{ user.name }}</p>
        <img 
          :src="`https://ecomerce-plantilla-back.onrender.com/uploads/${user.image_path}`" 
          alt="Imagen usuario" 
          style="max-width: 200px;" 
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      file: null,
      users: []
    }
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://ecomerce-plantilla-back.onrender.com/user/lista_usuarios');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        this.users = data; // Asignar todos los usuarios recibidos
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    },
    async createUser() {
      if (!this.name || !this.file) {
        alert('Por favor ingresa un nombre y selecciona una imagen');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('image', this.file);

      try {
        const response = await fetch('https://ecomerce-plantilla-back.onrender.com/user/create-users', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const newUser = await response.json();

        // Actualizo el array con el nuevo usuario
        this.users.push(newUser);

        // Resetear valores
        this.name = '';
        this.file = null;
        this.$refs.fileInput.value = '';

      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchUsers(); // Cargo los usuarios al iniciar el componente
  }
}
</script>
