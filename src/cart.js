import { reactive, computed } from 'vue'

export const carrito = reactive({
  items: [],
  cantidad: 0,
  agregar(producto) {
    const existente = this.items.find(item => item.id === producto.id)

    if (existente) {
      existente.cantidad++
    } else {
      this.items.push({ ...producto, cantidad: 1 })
    }

    this.cantidad = this.items.reduce((acc, i) => acc + i.cantidad, 0)
  },
  limpiar() {
    this.items = []
    this.cantidad = 0
  }
})

export const totalCompra = computed(() =>
  carrito.items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
)
