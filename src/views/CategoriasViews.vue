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
    <br>
    <br>

    <!--BUSCADOR DE CATEGORIA-->
    <div>
        <h2>Buscar para modificar</h2>
        <input 
        type="text"
        v-model="buscarNombre"
        placeholder="Buscar por nombre"
        >
        <br>
        <br>
        <button @click="buscarCategoria">Buscar</button>

        <ul v-if="resultados.length > 0">
            <li v-for="cat in resultados" :key="cat.id" style="list-style-type: none;">
                nombre = {{ cat.name_cat }}
                <button @click="seleccionarCategoria(cat)">Modificar</button>
                <button @click="eliminarCategoria(cat)" style="color: red;">Eliminar</button>
            </li>
        </ul>
    </div>

    <!--MODIFICAR CATEGORIA-->
    <div v-if="categoriaId">
        <input 
        type="text"
        v-model="name_categoria"
        placeholder="Nombre de la categoria"
        >
        <br><br>
        <button @click="modificarCat">Subir modificación</button>
    </div>


</template>
<script>
export default {
    data() {
        return {
            name_cat: '',
            name_categoria: '',
            resultados: [],
            loading: false,
            buscarNombre: '',
            categoriaId: null,
        }
    },
    methods: {
        async createCat() {
            if (!this.name_cat) {
                alert('Complete el formulario');
                return;
            }
            this.loading = true;
            try {
                const response = await fetch('https://ecomerce-plantilla-back-1.onrender.com/productos/create_categoria', {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({ name_cat: this.name_cat })
                });

                const data = await response.json();
                console.log(data);
    
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                alert('Categoria subida correctamente');
                this.name_cat = '';
            } catch (error) {
                console.error('Error al subir la categoria: ', error);
                alert(error.message || 'Ocurrió un error al subir la categoría');
            } finally {
                this.loading = false;
            }
        },
        
        async buscarCategoria() {
            if (!this.buscarNombre) {
                alert('Ingrese un nombre para buscar');
                return;
            }

            try {
                const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/buscar_cat/${this.buscarNombre}`);
                if (!res.ok) throw new Error('Error al buscar categorias');
                
                const data = await res.json();

                if (data.length === 0) {
                    alert('No se encontraron categorías');
                    this.resultados = [];
                } else {
                    this.resultados = data;
                }
            } catch (err) {
                alert(err.message);
            }
        },

        seleccionarCategoria(cat) {
            this.categoriaId = cat.id;
            this.name_categoria = cat.name_cat
        }, 

        async modificarCat() {
            if (!this.categoriaId) {
                alert('Primero seleccione una categoria');
                return;
            }

            const formData = new FormData();
            formData.append('name_cat', this.name_categoria);

            try {
                const response = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/modificar_cat/${this.categoriaId}`, {
                    method: 'PUT',
                    body: formData
                });

                if (!response.ok) throw new Error(`Error: ${response
                .status}`);

                alert('Categoria modificada correctamente')
            } catch (error) {
                console.error('Error al modificar la categoria', error);
            }

        },

        
        async eliminarCategoria(cat) {
            if (!this.categoriaId) {
                alert('Primero seleccione la categoria');
                return;
            }

            const confirmado = confirm(`¿Estas seguro que quieres eliminar "${this.name_cat}"?`);
                if(!confirmado) return;
            
                try {
                    const res = await fetch(`https://ecomerce-plantilla-back-1.onrender.com/productos/delete_cat/${this.categoriaId}`, {
                        method: 'DELETE'
                    });

                    if (!res.ok) throw new Error(`Error: ${res.status}`);

                    const data = await res.json();
                    alert(data.message);

                    this.resultados = this.resultados.filter(cat => cat.id !== this.categoriaId);
                    this.categoriaId = null;
                    this.name_cat = '';
                } catch (err) {
                    console.error('Error al eliminar producto: ', err)
                }

        }
    }

}
</script>