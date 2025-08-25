<template>
  <div>
    <h1>Confirmar pagos</h1>

    <div v-if="pagos.length === 0">
      <p>No hay pagos pendientes</p>
    </div>

    <div v-for="pago in pagos" :key="pago.id" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <p><strong>Cliente:</strong> {{ pago.nombre_cliente }}</p>
      <p><strong>Total:</strong> ${{ pago.total }}</p>
      <p>
        <strong>Comprobante:</strong>
        <a :href="`http://localhost:5000/uploads/${pago.archivo}`" target="_blank">Ver archivo</a>
      </p>
      <p><strong>Estado:</strong> {{ pago.aprobado ? 'Aprobado' : 'Pendiente' }}</p>

      <button v-if="!pago.aprobado" @click="aprobarPago(pago.id)">Aprobar</button>
      <button v-if="!pago.aprobado" @click="rechazarPago(pago.id)">Rechazar</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const pagos = ref([])

    const cargarPagos = async () => {
      try {
        const res = await fetch("http://localhost:5000/pagos/listar")
        pagos.value = await res.json()
      } catch (err) {
        console.error("Error al cargar pagos:", err)
      }
    }

    const aprobarPago = async (id) => {
      try {
        const res = await fetch(`http://localhost:5000/pagos/aprobar/${id}`, { method: 'PUT' })
        if (!res.ok) throw new Error('Error al aprobar')
        alert('Pago aprobado y registrado en historial')
        cargarPagos()
      } catch (err) {
        console.error(err)
        alert('No se pudo aprobar el pago')
      }
    }

    const rechazarPago = async (id) => {
      try {
        const res = await fetch(`http://localhost:5000/pagos/rechazar/${id}`, { method: 'PUT' })
        if (!res.ok) throw new Error('Error al rechazar')
        alert('Pago rechazado y registrado en historial')
        cargarPagos()
      } catch (err) {
        console.error(err)
        alert('No se pudo rechazar el pago')
      }
    }

    onMounted(() => { cargarPagos() })

    return { pagos, aprobarPago, rechazarPago }
  }
}
</script>
