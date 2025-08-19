<template>
  <div style="border: 2px solid lightskyblue; padding: 20px;">
    <h1 style="padding: 5px; background: #1f2937; color: white; border-radius: 10px;">Selecciona tu producto</h1>

    <!-- Grid de categorías -->
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin: 20px 0;
      "
    >
      <div
        v-for="cat in categorias"
        :key="cat.id"
        @click="fetchProductosPorCategoria(cat.id)"
        style="
          background: #1f2937;
          color: white;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        "
        @mouseover="hover = cat.id"
        @mouseleave="hover = null"
        :style="{
          transform: hover === cat.id ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hover === cat.id ? '0 4px 15px rgba(0,0,0,0.3)' : 'none'
        }"
      >
        <h3>{{ cat.name_cat }}</h3>
      </div>
    </div>

    <!-- Lista de productos -->
    <div 
      v-if="productos.length"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
      "
    >
      <div
        v-for="(producto, index) in productos"
        :key="index"
        class="card"
        style="
          box-shadow: 15px 15px 30px rgba(0,0,0,0.3);
          background: #1f2937;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 10px;
          width: 220px;
          text-align: center;
          color: white;
        "
      >
        <p><strong>Nombre:</strong> {{ producto.name_prod }}</p>
        <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>
        <p v-if="producto.precio"><strong>Precio:</strong> ${{ producto.precio }}</p>
        <img 
          :src="`http://127.0.0.1:5000/uploads/${producto.image_path}`" 
          alt="Imagen producto" 
          style="max-width: 200px; border-radius: 8px;" 
        />
      </div>
    </div>
    <div v-else>
      <p>No hay productos para mostrar.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      categorias: [],
      hover: null, // para animación hover
    }
  },
  async created() {
    await this.fetchCategorias()
  },
  methods: {
    async fetchCategorias() {
      try {
        const res = await fetch("http://127.0.0.1:5000/productos/lista_categorias")
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        this.categorias = await res.json()
      } catch (err) {
        console.error("Error al cargar categorías:", err)
      }
    },
    async fetchProductosPorCategoria(idCategoria) {
      try {
        const res = await fetch(`http://127.0.0.1:5000/productos/lista_prod_por_cat/${idCategoria}`)
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        this.productos = await res.json()
      } catch (err) {
        console.error("Error al cargar productos:", err)
      }
    }
  }
}
</script>
