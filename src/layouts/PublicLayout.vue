<template>
  <div style="background: #f3f4f6;">
    <header>
      <!-- Podés poner acá un menú o header común -->
      <nav style="display: flex; justify-content: center; background: #1f2937; border-radius: 10px;">
        <div style="padding: 10px 0;">
          <a href="#" style="color: white;">Logo de la marca</a>
        </div>
      </nav>
    </header>

    <main>
      <div style="margin:5px 0;">
        <img src="/img/img-prueba-1.jpg" alt="imagen principal" style="filter: brightness(70%); max-width: 100%; max-height: 100%;">
      </div>

      <router-view />
    </main>

  <footer
    style="
      background: #1f2937; /* gris oscuro */
      color: white;
      padding: 30px 20px;
      margin-top: 40px;
      border-radius: 10px;
    "
  >
    <div style="max-width: 1100px; margin: 0 auto; text-align: center;">
      <h3 style="margin-bottom: 20px; font-size: 1.3rem;">Contactos</h3>

      <!-- Links de contacto -->
      <div
        style="
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        "
      >
        <a
          href="#"
          style="
            background: #3b82f6; /* azul */
            padding: 10px 20px;
            border-radius: 30px;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: background 0.3s ease, transform 0.2s ease;
          "
          @mouseover="e => e.target.style.background = '#2563eb'"
          @mouseleave="e => e.target.style.background = '#3b82f6'"
        >
          Instagram
        </a>

        <a
          href="#"
          style="
            background: #10b981; /* verde */
            padding: 10px 20px;
            border-radius: 30px;
            text-decoration: none;
            color: white;
            font-weight: bold;
            transition: background 0.3s ease, transform 0.2s ease;
          "
          @mouseover="e => e.target.style.background = '#059669'"
          @mouseleave="e => e.target.style.background = '#10b981'"
        >
          Whatsapp
        </a>
      </div>

      <!-- Créditos -->
      <p style="margin-top: 25px; font-size: 0.9rem; color: #9ca3af;">
        © 2025 E-commerce - Todos los derechos reservados
      </p>
    </div>
  </footer>
  </div>
</template>

<script>
export default {
  name: 'PublicLayout'
}
</script>
