<template>
  <div>
    <h1>CheckPay</h1>
    <h2>Datos bancarios</h2>
    <p><strong>Total a pagar: </strong>${{ total }}</p>
    <p>Transferencia a la cuenta con los datos bancarios</p>
    
    <div v-if="bankData">
      <p><strong>Nombre titular: </strong>{{ bankData.name_titular }}</p>
      <p><strong>Documento: </strong>{{ bankData.documento }}</p>
      <p><strong>Banco: </strong>{{ bankData.tipo_banco }}</p>
      <p><strong>Nro. de cuenta: </strong>{{ bankData.nro_cuenta }}</p>
      <p><strong>Alias: </strong>{{ bankData.alias }}</p>
    </div>

    <p>Subir el comprobante de pago:</p>
    <input type="file" @change="handleFile" />
    <br><br>
    <button @click="subirComprobante">Subir comprobante de pago</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { totalCompra } from '@/cart.js'

export default {
  setup() {
    const bankData = ref(null)
    const total = totalCompra
    const file = ref(null)

    const handleFile = (event) => {
      file.value = event.target.files[0]
    }

    const subirComprobante = async () => {
      if (!file.value) {
        alert("Selecciona un archivo primero")
        return
      }

      try {
        const formData = new FormData()
        formData.append("comprobante", file.value)
        formData.append("total", total.value)
        formData.append("nombre", "Nombre del cliente")

        const res = await fetch("https://ecomerce-plantilla-back-1.onrender.com/pagos/subir", {
          method: "POST",
          body: formData
        })

        if (!res.ok) throw new Error("Error al subir el comprobante")

        alert("Comprobante subido correctamente")
        file.value = null
      } catch (err) {
        console.error(err)
        alert("Ocurrió un error al subir el comprobante")
      }
    }

    onMounted(async () => {
      try {
        const res = await fetch("https://ecomerce-plantilla-back-1.onrender.com/details/bank_details")
        const data = await res.json()
        if (data.length > 0) bankData.value = data[0]
      } catch (err) {
        console.error("Error al traer datos bancarios: ", err)
      }
    })

    return { bankData, total, file, handleFile, subirComprobante }
  }
}
</script>
