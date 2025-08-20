<template>
  <div class="cards_prod">
    <h1>Carga de productos</h1>

    <input 
      type="text"
      v-model="name_prod"
      placeholder="Nombre del producto"
    />
    <br><br>

    <input 
      type="text"
      v-model="descripcion"
      placeholder="Descripción del producto"
    />
    <br><br>
    <input 
    type="text"
    v-model="precio"
    placeholder="precio del producto"
    />

    <br><br>

    <input 
    type="number"
    v-model="stock"
    placeholder="stock"
    />

    <br><br>

    <select v-model="categoria_id">
      <option disabled value="">Seleccione una categoria</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
        {{ cat.name_cat }}
      </option>
    </select>
    <br>
    <br>
    <input
      type="file"
      @change="handleFile"
      ref="fileInput"
    />
    <br><br>

    <button @click="createProd">Subir producto</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name_prod: '',
      descripcion: '',
      precio: '',
      stock: 0,
      file: null,
      categorias: [],
      categoria_id: ''
    }
  },
  async created() {
    const res = await fetch('https://ecomerce-plantilla-back.onrender.com/productos/lista_categorias')
    this.categorias = await res.json()
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async createProd() {
      if (!this.name_prod || !this.descripcion || !this.precio || !this.stock || !this.file || !this.categoria_id) {
        alert('Complete el formulario');
        return;
      }

      const formData = new FormData();
      formData.append('name_prod', this.name_prod);
      formData.append('descripcion', this.descripcion);
      formData.append('precio', this.precio);
      formData.append('stock', this.stock);
      formData.append('categoria_id', this.categoria_id);
      formData.append('image', this.file);


      try {
        const response = await fetch('https://ecomerce-plantilla-back.onrender.com/productos/create_prod', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        // Opcional: mostrar un mensaje de éxito
        alert('Producto subido correctamente');

        // Resetear valores
        this.name_prod = '';
        this.descripcion = '';
        this.precio = '';
        this.stock = 0;
        this.categoria_id = ''
        this.file = null;
        this.$refs.fileInput.value = '';

      } catch (error) {
        console.error('Error al subir el producto:', error);
      }
    }
  }
}
</script>
