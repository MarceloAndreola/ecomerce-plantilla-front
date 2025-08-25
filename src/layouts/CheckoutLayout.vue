<template>
  <div style="background: #f3f4f6; min-height: 100vh; padding: 20px;">
    <header>
      <nav style="display: flex; justify-content: space-between; align-items: center; background: #1f2937; padding: 10px 20px; border-radius: 10px;">
        <a href="#" style="color: white; font-weight: bold; font-size: 1.2rem;">Logo de la marca</a>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer style="background: #1f2937; color: white; padding: 30px 20px; margin-top: 40px; border-radius: 10px;">
      <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
        <h3 style="margin-bottom: 20px; font-size: 1.3rem;">Contactos</h3>
        <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
          <a href="#" style="background: #3b82f6; padding: 10px 20px; border-radius: 30px; text-decoration: none; color: white; font-weight: bold;">Instagram</a>
          <a href="#" style="background: #10b981; padding: 10px 20px; border-radius: 30px; text-decoration: none; color: white; font-weight: bold;">Whatsapp</a>
        </div>
        <p style="margin-top: 25px; font-size: 0.9rem; color: #9ca3af;">© 2025 E-commerce - Todos los derechos reservados</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CheckoutLayout'
}
</script>
