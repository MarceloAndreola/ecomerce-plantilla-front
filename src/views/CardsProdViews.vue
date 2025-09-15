<template>
  <div class="cards_prod">
    <h1>Carga de productos</h1>

    <!-- Formulario de carga -->
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
      placeholder="Precio del producto"
    />
    <br><br>

    <input 
      type="number"
      v-model="stock"
      placeholder="Stock"
    />
    <br><br>

    <select v-model="categoria_id">
      <option disabled value="">Seleccione una categoría</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
        {{ cat.name_cat }}
      </option>
    </select>
    <br><br>

    <input
      type="file"
      @change="handleFile"
      ref="fileInput"
    />
    <br><br>

    <button @click="createProd">Subir producto</button>

    <hr>

    <!-- Listado de productos por categoría -->
    <h2>Productos por categoría</h2>
    <select v-model="selectedCategory" @change="fetchProductsByCategory">
      <option disabled value="">Seleccione categoría</option>
      <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
        {{ cat.name_cat }}
      </option>
    </select>

    <div v-if="productos.length === 0">No hay productos para esta categoría.</div>

    <div v-for="prod in productos" :key="prod.id" class="producto-card">
      <h3>{{ prod.name_prod }}</h3>
      <p>{{ prod.descripcion }}</p>
      <p>Precio: {{ prod.precio }}</p>
      <p>Stock: {{ prod.stock }}</p>

      <!-- Imagen usando la URL de Cloudinary -->
      <img :src="prod.image_path" alt="Imagen del producto" width="150" />
    </div>
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
      categoria_id: '',
      productos: [],             // Lista de productos por categoría
      selectedCategory: ''       // Categoría seleccionada para mostrar productos
    }
  },
  async created() {
    // Traigo categorías para formulario y listado
    const res = await fetch('https://ecomerce-plantilla-back-1.onrender.com/productos/lista_categorias')
    this.categorias = await res.json()
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async createProd() {
      if (!this.name_prod || !this.descripcion || !this.precio || !this.stock || !this.file || !this.categoria_id) {
        alert('Complete el formulario de prueba');
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
        const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/productos/create_prod', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        alert('Producto subido correctamente de prueba');

        // Resetear valores del formulario
        this.name_prod = '';
        this.descripcion = '';
        this.precio = '';
        this.stock = 0;
        this.categoria_id = ''
        this.file = null;
        this.$refs.fileInput.value = '';

        // Actualizo listado si está viendo productos de la misma categoría
        if(this.selectedCategory === this.categoria_id) {
          this.fetchProductsByCategory()
        }

      } catch (error) {
        console.error('Error al subir el producto:', error);
      }
    },

    // Trae productos por categoría usando el endpoint que devuelve URLs de Cloudinary
    async fetchProductsByCategory() {
      if (!this.selectedCategory) {
        this.productos = [];
        return;
      }
      const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/lista_prod_por_cat/${this.selectedCategory}`)
      this.productos = await res.json()
    }
  }
}
</script>
