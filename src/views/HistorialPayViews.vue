<template>
  <div>
    <h1>Historial de Pagos</h1>

    <div v-if="pagos.length === 0">
      <p>No hay pagos registrados</p>
    </div>

    <div v-for="pago in pagos" :key="pago.id" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px;">
      <p><strong>Cliente:</strong> {{ pago.nombre_cliente }}</p>
      <p><strong>Total:</strong> ${{ pago.total }}</p>
      <p>
        <strong>Comprobante:</strong>
        <a :href="`http://localhost:5000/uploads/${pago.archivo}`" target="_blank">Ver archivo</a>
      </p>
      <p><strong>Estado Actual:</strong> {{ pago.aprobado ? 'Aprobado' : 'Pendiente' }}</p>

        <div v-if="historial[pago.id]" style="margin-top:10px; padding-left:10px;">
        <strong>Historial:</strong><br><br>
        <div v-for="h in historial[pago.id]" :key="h.fecha">
            <span :style="{color: h.estado === 'Aprobado' ? 'green' : 'red'}">
            {{ h.estado }} - {{ formatFecha(h.fecha) }}
            </span>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const pagos = ref([])
    const historial = ref({})

    const cargarPagos = async () => {
      try {
        const res = await fetch("http://localhost:5000/pagos/listar")
        pagos.value = await res.json()
        for (const pago of pagos.value) {
          await cargarHistorial(pago.id)
        }
      } catch (err) {
        console.error("Error al cargar pagos:", err)
      }
    }

    const cargarHistorial = async (pagoId) => {
      try {
        const res = await fetch(`http://localhost:5000/pagos/historial/${pagoId}`)
        historial.value[pagoId] = await res.json()
      } catch (err) {
        console.error(`Error al cargar historial del pago ${pagoId}:`, err)
        historial.value[pagoId] = []
      }
    }

    const formatFecha = (fechaStr) => new Date(fechaStr).toLocaleString()

    onMounted(() => { cargarPagos() })

    return { pagos, historial, formatFecha }
  }
}
</script>
