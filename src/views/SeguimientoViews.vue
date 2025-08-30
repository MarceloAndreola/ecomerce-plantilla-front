<template>
  <div>
    <h1>Seguimiento de Envíos</h1>

    <div v-if="pagos.length === 0">
      <p>No hay pagos aprobados para seguimiento</p>
    </div>

    <div v-for="pago in pagos" :key="pago.id" class="pago-card">
      <p><strong>Cliente:</strong> {{ pago.nombre_cliente }}</p>
      <p><strong>Total:</strong> ${{ pago.total }}</p>
      <p>
        <strong>Comprobante:</strong>
        <a :href="`https://ecomerce-plantilla-back-1.onrender.com/uploads/${pago.archivo}`" target="_blank">Ver archivo</a>
      </p>

      <!-- Timeline -->
      <div class="timeline">
        <div 
          v-for="(estado, index) in estados" 
          :key="estado" 
          class="timeline-step"
        >
          <div :class="['circle', circleColor(pago.estado_envio, index)]">
            {{ index + 1 }}
          </div>
          <div class="label">{{ estado }}</div>
          <div v-if="index < estados.length - 1" class="line"></div>
        </div>
      </div>

      <!-- Botones para actualizar -->
      <div class="botones-container">
        <button 
          v-for="estado in estados" 
          :key="estado + '-btn'"
          :disabled="!puedeActualizar(pago.estado_envio, estado)"
          @click="actualizarEstado(pago.id, estado)"
        >
          Marcar como "{{ estado }}"
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const pagos = ref([])
    const estados = ['Pago confirmado', 'Enpaquetado', 'Enviado al correo']

    const cargarPagos = async () => {
      try {
        const res = await fetch("https://ecomerce-plantilla-back-1.onrender.com/pagos/listar_aprobados")
        pagos.value = await res.json()
      } catch (err) {
        console.error("Error al cargar pagos:", err)
      }
    }

    const actualizarEstado = async (id, nuevoEstado) => {
      try {
        // ✅ URL corregida con el prefijo del blueprint
        const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/pagos/seguimiento/actualizar/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: nuevoEstado })
        })
        if (!res.ok) throw new Error('Error al actualizar estado')
        alert(`Estado actualizado a: ${nuevoEstado}`)
        cargarPagos()
      } catch (err) {
        console.error(err)
        alert('No se pudo actualizar el estado')
      }
    }

    const estadoIndex = (estado) => estados.indexOf(estado)

    const circleColor = (estadoActual, index) => {
      const idxActual = estadoIndex(estadoActual)
      if (index < idxActual) return 'completed'
      if (index === idxActual) return 'current'
      return 'pending'
    }

    const puedeActualizar = (estadoActual, nuevoEstado) => {
      const idxActual = estadoIndex(estadoActual)
      const idxNuevo = estadoIndex(nuevoEstado)
      return idxNuevo === idxActual + 1 || idxNuevo === idxActual
    }

    onMounted(() => { cargarPagos() })

    return { pagos, estados, actualizarEstado, circleColor, puedeActualizar }
  }
}
</script>

<style scoped>
.pago-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #f9f9f9;
}

.timeline {
  display: flex;
  align-items: center;
  margin: 15px 0;
  position: relative;
}

.timeline-step {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
}

.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  color: white;
  z-index: 1;
}

.completed { background-color: green; }
.current { background-color: orange; }
.pending { background-color: gray; }

.line {
  height: 4px;
  flex: 1;
  background-color: #ccc;
  margin-left: 10px;
  margin-right: 10px;
  z-index: 0;
}

.label {
  margin-left: 8px;
  font-size: 14px;
}

.botones-container {
  margin-top: 10px;
}

.botones-container button {
  margin-right: 10px;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
