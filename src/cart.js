import { reactive } from 'vue'

export const carrito = reactive({
  items: [],   // productos añadidos
  get cantidad() {
    return this.items.length
  },
  agregar(producto) {
    this.items.push(producto)
  }
})
