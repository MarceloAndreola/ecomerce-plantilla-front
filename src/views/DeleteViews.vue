<template>
  <div class="cards_prod">
    <h1>Eliminar producto</h1>

    <!-- Buscar producto -->
    <input 
      type="text"
      v-model="buscarNombre"
      placeholder="Buscar por nombre"
    />
    <button @click="buscarProducto">Buscar</button>

    <ul v-if="resultados.length > 0">
      <li v-for="prod in resultados" :key="prod.id" style="list-style-type: none; border: 2px solid gray; padding-top: 10px;">
        nombre: {{ prod.name_prod }} <br>
        precio: ${{ prod.precio }} <br>
        descripcion: {{ prod.descripcion }} <br><br>
        <button @click="seleccionarProducto(prod)">Seleccionar</button>
        <br><br>
      </li>
    </ul>

    <br><br>

    <!-- Botón eliminar -->
    <div v-if="productoId">
      <button @click="eliminarProducto" style="background-color:red; color:white; padding:8px 12px; border-radius:5px; border:none; cursor:pointer;">
        Eliminar producto
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscarNombre: '',
      resultados: [],
      productoId: null,
      name_prod: ''
    }
  },
  methods: {
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
    },

    async eliminarProducto() {
      if (!this.productoId) {
        alert('Primero seleccione un producto');
        return;
      }

      const confirmado = confirm(`¿Estás seguro que quieres eliminar "${this.name_prod}"?`);
        if (!confirmado) return; // Si el usuario cancela, salir del método

      try {
        const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/delete_productos/${this.productoId}`, {
          method: 'DELETE'
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();
        alert(data.message);

        // Actualizar la lista para remover el producto eliminado
        this.resultados = this.resultados.filter(prod => prod.id !== this.productoId);
        this.productoId = null;
        this.name_prod = '';
      } catch (err) {
        console.error('Error al eliminar producto:', err);
      }
    }
  }
}
</script>
