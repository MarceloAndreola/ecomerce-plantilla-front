<template>
  <div class="cards_prod">
    <h1>Modificaciones de productos</h1>

    <!-- Buscar producto -->
    <input 
      type="text"
      v-model="buscarNombre"
      placeholder="Buscar por nombre"
    />
    <button @click="buscarProducto">Buscar</button>

    <ul v-if="resultados.length > 0">
      <li v-for="prod in resultados" :key="prod.id" style="list-style-type: none;">
        nombre: {{ prod.name_prod }} <br>
        precio: ${{ prod.precio }} <br>
        descripcion: {{ prod.descripcion }} <br><br>
        <button @click="seleccionarProducto(prod)">Seleccionar</button>
      </li>
    </ul>

    <br><br>

    <!-- Formulario cargado -->
    <div v-if="productoId">
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

      <br><br>

      <input
        type="file"
        @change="handleFile"
        ref="fileInput"
      />

      <br><br>

      <button @click="modificarProd">Subir modificación</button>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/authService'
const authService = new AuthService();

export default {
  data() {
    return {
      buscarNombre: '',
      resultados: [],
      productoId: null,
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
    const res = await fetch('https://ecomerce-plantilla-back-1.onrender.com/lista_categorias')
    this.categorias = await res.json()
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },

    async buscarProducto() {
      try {
        const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/buscar_prod/${this.buscarNombre}`);
        if (!res.ok) throw new Error('No se encontraron productos');
        this.resultados = await res.json();
      } catch (err) {
        alert(err.message);
      }
    },

    seleccionarProducto(prod) {
      this.productoId = prod.id;
      this.name_prod = prod.name_prod;
      this.descripcion = prod.descripcion;
      this.precio = prod.precio;
      this.stock = prod.stock;
      this.categoria_id = prod.categoria_id;
    },

    async modificarProd() {
        if (!this.productoId) {
            alert('Primero seleccione un producto');
            return;
        }

        console.log('Enviando modificación', {
            name_prod: this.name_prod,
            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            categoria_id: this.categoria_id,
            file: this.file
        });

        const formData = new FormData();
        formData.append('name_prod', this.name_prod);
        formData.append('descripcion', this.descripcion);
        formData.append('precio', this.precio);
        formData.append('stock', this.stock);
        formData.append('categoria_id', this.categoria_id);

        if (this.file) {
            formData.append('image', this.file);
        }

        try {
            const response = await authService.makeAuthenticatedRequest(
                `https://ecomerce-plantilla-back-1.onrender.com/productos/modificar_prod/${this.productoId}`, 
                {
                    method: 'PUT',
                    body: formData
                }
            );

            console.log('Response', response);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Error: ${response.status} - ${text}`);
            }

            alert('Producto modificado correctamente');
        } catch (error) {
            console.error('Error al modificar producto:', error);
            alert('Error al modificar producto: ' + error.message);
        }
    }

  }
}
</script>
