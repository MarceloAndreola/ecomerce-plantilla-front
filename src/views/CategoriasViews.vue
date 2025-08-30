<template>
    <div>
        <h1>Categorias</h1>
        <input 
        type="text"
        v-model="name_cat"
        placeholder="Nombre de la categoria"
        >
        <br>
        <br>
        <button @click="createCat" :disabled="loading">Subir categoria</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name_cat: '',
            loading: false
        }
    },
    methods: {
        async createCat() {
            if (!this.name_cat) {
                alert('Complete el formulario');
                return;
            }
            this.loading = true;
            const formData = new FormData();
            formData.append('name_cat', this.name_cat);
            try {
                const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/productos/create_categoria', {
                    method: 'POST',
                    body: formData
                });
    
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                alert('Categoria subida correctamente');
                this.name_cat = '';
            } catch (error) {
                console.error('Error al subir la categoria: ', error);
            } finally {
                this.loading = false;
            }
        }
    }

}
</script>