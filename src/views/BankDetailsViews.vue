<template>
  <div class="bank-details-admin">
    <h2>Datos Bancarios</h2>

    <!-- Mostrar datos -->
    <div v-if="bankData">
      <p><strong>Nombre titular:</strong> {{ bankData.name_titular }}</p>
      <p><strong>Documento:</strong> {{ bankData.documento }}</p>
      <p><strong>Banco:</strong> {{ bankData.tipo_banco }}</p>
      <p><strong>Nro. de cuenta:</strong> {{ bankData.nro_cuenta }}</p>
      <p><strong>Alias:</strong> {{ bankData.alias }}</p>
    </div>

    <hr>

    <!-- Formulario para editar -->
    <h3>Modificar Datos</h3>
    <form @submit.prevent="updateBankDetails">
      <input v-model="form.name_titular" placeholder="Nombre titular" />
      <input v-model="form.documento" placeholder="Documento" />
      <input v-model="form.tipo_banco" placeholder="Banco" />
      <input v-model="form.nro_cuenta" placeholder="Nro. de cuenta" />
      <input v-model="form.alias" placeholder="Alias" />
      <button type="submit">Actualizar</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bankData: null,
      form: {
        name_titular: '',
        documento: '',
        tipo_banco: '',
        nro_cuenta: '',
        alias: ''
      },
      message: ''
    }
  },
  created() {
    this.fetchBankDetails()
  },
  methods: {
    async fetchBankDetails() {
      try {
        const res = await fetch('http://localhost:5000/details/bank_details')
        const data = await res.json()
        if (data.length > 0) {
          this.bankData = data[0]           // Suponiendo solo 1 registro
          this.form = { ...this.bankData }  // Rellenar formulario con datos actuales
        }
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    },
    async updateBankDetails() {
      try {
        const res = await fetch(`http://localhost:5000/details/bank_details/${this.bankData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        })
        if (!res.ok) throw new Error('Error al actualizar')
        const updated = await res.json()
        this.bankData = updated
        this.message = 'Datos actualizados correctamente'
      } catch (error) {
        console.error(error)
        this.message = 'No se pudieron actualizar los datos'
      }
    }
  }
}
</script>

<style scoped>
.bank-details-admin {
  max-width: 500px;
  margin: auto;
}
input {
  display: block;
  margin: 5px 0;
  width: 100%;
  padding: 5px;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
