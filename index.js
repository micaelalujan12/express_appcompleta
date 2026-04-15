

// Armamos el Servidor de la Aplicación

// 1. Importamos la librería Express para usarla.
const express = require('express');
const mongoose = require('mongoose');

// 2. Conectamos la aplicación a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/escuela').then(
    () => console.log('Conexión a la base de datos exitosa'),
    (err) => console.error('Error al conectar a la base de datos:', err)
);

// 3. Importamos las librerias hbs y path para usar plantillas y rutas.
const hbs = require('hbs');
const path = require('path');

// 4. Creamos una app para uso de los métodos de Express.
const app = express();

// 5. Definimos el puerto en el que se ejecutará el servidor.
const PORT = 9000; //3000 o 8080

// 6. Respondemos a una petición GET a la raíz del servidor.
app.get('/', (req, res)=>{
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Hogar & Estilo | Tienda de Decoración</title>
    <!-- Fuente moderna y limpia -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet">
    <!-- Iconos Font Awesome (gratis) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #fefaf7;
            color: #2c2a27;
            line-height: 1.4;
        }

        /* ========== CONTENEDOR PRINCIPAL ========== */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
        }

        /* ========== HEADER / NAVBAR (FLEX) ========== */
        .header {
            background-color: #ffffff;
            box-shadow: 0 1px 12px rgba(0, 0, 0, 0.03);
            border-bottom: 1px solid #f0e3da;
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 18px 0;
            gap: 16px;
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            letter-spacing: -0.3px;
            background: linear-gradient(130deg, #b47c44, #8b5a2e);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .logo span {
            font-weight: 300;
            color: #c1956b;
            background: none;
            -webkit-background-clip: unset;
            background-clip: unset;
        }

        /* Menú de navegación (flex horizontal) */
        .nav-links {
            display: flex;
            gap: 32px;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            font-weight: 500;
            color: #4a3e33;
            transition: color 0.2s;
            font-size: 1rem;
        }

        .nav-links a:hover {
            color: #b87a42;
        }

        /* Icono carrito (simple) */
        .cart-icon {
            font-size: 1.5rem;
            color: #4f3f30;
            cursor: default;
        }

        /* ========== HERO (FLEX) ========== */
        .hero {
            background: #fcf6f0;
            margin: 24px 0 40px 0;
            border-radius: 36px;
            padding: 40px 0;
        }

        .hero-content {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
        }

        .hero-text {
            flex: 1.2;
        }

        .hero-text h1 {
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.2;
            color: #2e261e;
            margin-bottom: 20px;
        }

        .hero-text p {
            font-size: 1.05rem;
            color: #6b5b4c;
            margin-bottom: 28px;
            max-width: 480px;
        }

        .btn-primario {
            background-color: #c28a54;
            border: none;
            padding: 12px 30px;
            border-radius: 60px;
            font-weight: 600;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            transition: 0.2s;
            display: inline-block;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .btn-primario:hover {
            background-color: #a26f3e;
            transform: translateY(-2px);
        }

        .hero-image {
            flex: 1;
            text-align: center;
        }

        .hero-image img {
            max-width: 100%;
            border-radius: 32px;
            box-shadow: 0 20px 28px -12px rgba(0, 0, 0, 0.12);
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        /* ========== SECCIÓN DE CATEGORÍAS (FLEX) ========== */
        .section-title {
            font-size: 2rem;
            font-weight: 600;
            margin: 48px 0 20px 0;
            color: #2c2823;
            position: relative;
        }

        .section-sub {
            color: #8b765e;
            margin-bottom: 32px;
            font-size: 1rem;
        }

        .categorias-flex {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            justify-content: space-between;
            margin-bottom: 30px;
        }

        .categoria-card {
            flex: 1;
            min-width: 150px;
            background: #ffffff;
            border-radius: 28px;
            padding: 20px 12px;
            text-align: center;
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.02);
            transition: all 0.2s ease;
            border: 1px solid #f0e2d6;
            cursor: pointer;
        }

        .categoria-card:hover {
            transform: translateY(-5px);
            border-color: #e2cdbb;
            box-shadow: 0 14px 22px rgba(0, 0, 0, 0.05);
        }

        .categoria-card i {
            font-size: 2.5rem;
            color: #b47c44;
            margin-bottom: 12px;
        }

        .categoria-card h3 {
            font-weight: 600;
            font-size: 1.2rem;
            margin-bottom: 6px;
        }

        .categoria-card p {
            font-size: 0.85rem;
            color: #9a8978;
        }

        /* ========== PRODUCTOS DESTACADOS (FLEX GRID) ========== */
        .productos-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 32px;
            margin: 20px 0 40px;
        }

        .producto-item {
            flex: 1 1 280px;
            background: #ffffff;
            border-radius: 28px;
            overflow: hidden;
            transition: 0.2s;
            border: 1px solid #f1e4da;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
        }

        .producto-item:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 28px -12px rgba(0, 0, 0, 0.12);
            border-color: #e5cfbd;
        }

        .producto-img {
            width: 100%;
            height: 240px;
            object-fit: cover;
            background-color: #faf1e9;
        }

        .producto-info {
            padding: 18px 16px 22px;
        }

        .producto-titulo {
            font-weight: 700;
            font-size: 1.2rem;
            margin-bottom: 6px;
        }

        .producto-desc {
            font-size: 0.85rem;
            color: #7c6b5a;
            margin: 8px 0;
        }

        .producto-precio {
            font-weight: 800;
            font-size: 1.4rem;
            color: #b57942;
            margin: 12px 0;
        }

        .btn-producto {
            background: #f3ece5;
            border: none;
            width: 100%;
            padding: 12px 0;
            border-radius: 60px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            transition: 0.2s;
            color: #4b3827;
            font-size: 0.9rem;
        }

        .btn-producto:hover {
            background: #e6d9ce;
            color: #2f241b;
        }

        /* ========== NEWSLETTER + BANNER (FLEX) ========== */
        .newsletter {
            background: #efe4db;
            border-radius: 40px;
            margin: 50px 0 40px;
            padding: 48px 32px;
        }

        .newsletter-flex {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
        }

        .newsletter-text {
            flex: 2;
        }

        .newsletter-text h3 {
            font-size: 1.7rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .newsletter-form {
            flex: 1.5;
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }

        .newsletter-form input {
            flex: 2;
            padding: 14px 18px;
            border-radius: 60px;
            border: none;
            font-family: 'Inter', sans-serif;
            background: white;
            font-size: 0.9rem;
            outline: none;
        }

        .newsletter-form button {
            flex: 1;
            background: #c28a54;
            border: none;
            border-radius: 60px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s;
            padding: 0 18px;
        }

        .newsletter-form button:hover {
            background: #9d6637;
        }

        /* ========== FOOTER (FLEX) ========== */
        footer {
            background: #f7f1ea;
            border-radius: 32px 32px 0 0;
            padding: 42px 0 28px;
            margin-top: 40px;
        }

        .footer-flex {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 40px;
        }

        .footer-col {
            flex: 1;
            min-width: 160px;
        }

        .footer-col h4 {
            font-weight: 600;
            margin-bottom: 16px;
            font-size: 1.1rem;
        }

        .footer-col p, .footer-col a {
            color: #6c5d4e;
            text-decoration: none;
            font-size: 0.9rem;
            line-height: 1.8;
        }

        .footer-col a:hover {
            color: #b47c44;
        }

        .copyright {
            text-align: center;
            margin-top: 48px;
            padding-top: 20px;
            border-top: 1px solid #e2d4c8;
            font-size: 0.8rem;
            color: #9c8978;
        }

        @media (max-width: 800px) {
            .navbar {
                flex-direction: column;
            }
            .hero-text h1 {
                font-size: 2.2rem;
            }
            .section-title {
                font-size: 1.7rem;
            }
            .newsletter-form {
                flex-direction: column;
            }
            .newsletter-form button, .newsletter-form input {
                width: 100%;
                padding: 12px;
            }
        }
    </style>
</head>
<body>

<!-- HEADER con navegación flexible -->
<header class="header">
    <div class="container">
        <div class="navbar">
            <div class="logo">Casa<span> & Estilo</span></div>
            <ul class="nav-links">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Sala</a></li>
                <li><a href="#">Dormitorio</a></li>
                <li><a href="#">Cocina</a></li>
                <li><a href="#">Decoración</a></li>
            </ul>
            <div class="cart-icon">
                <i class="fas fa-shopping-bag"></i>
            </div>
        </div>
    </div>
</header>

<main>
    <!-- SECCIÓN HERO con flex -->
    <div class="container">
        <div class="hero">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Dale calidez a cada rincón</h1>
                    <p>Muebles suaves, texturas naturales y accesorios que transforman tu casa en un hogar lleno de vida.</p>
                    <button class="btn-primario" id="exploreBtn">Explorar colección →</button>
                </div>
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format" alt="Sala de estar moderna y acogedora" loading="lazy">
                </div>
            </div>
        </div>
    </div>

    <!-- CATEGORÍAS destacadas (flex básico) -->
    <div class="container">
        <h2 class="section-title">Explora por espacios</h2>
        <p class="section-sub">Inspiración para cada ambiente de tu hogar</p>
        <div class="categorias-flex">
            <div class="categoria-card">
                <i class="fas fa-couch"></i>
                <h3>Sala de estar</h3>
                <p>Sofás, cojines y mantas</p>
            </div>
            <div class="categoria-card">
                <i class="fas fa-bed"></i>
                <h3>Dormitorio</h3>
                <p>Ropa de cama, lámparas</p>
            </div>
            <div class="categoria-card">
                <i class="fas fa-utensils"></i>
                <h3>Cocina & comedor</h3>
                <p>Vajilla, textiles y más</p>
            </div>
            <div class="categoria-card">
                <i class="fas fa-leaf"></i>
                <h3>Decoración natural</h3>
                <p>Plantas, velas, cerámica</p>
            </div>
        </div>
    </div>

    <!-- PRODUCTOS DESTACADOS (Flex Grid con imágenes reales de Unsplash) -->
    <div class="container">
        <h2 class="section-title">Productos favoritos</h2>
        <p class="section-sub">Lo más cálido y elegante para tu hogar</p>
        <div class="productos-grid">
            <!-- Producto 1 -->
            <div class="producto-item">
                <img class="producto-img" src="https://images.unsplash.com/photo-1540574163027-643ea20ade25?w=500&auto=format" alt="Manta textil suave" loading="lazy">
                <div class="producto-info">
                    <div class="producto-titulo">Manta de Algodón Orgánico</div>
                    <div class="producto-desc">Tejido grueso, tonos naturales, ideal para el sofá.</div>
                    <div class="producto-precio">$49.90</div>
                    <button class="btn-producto" data-nombre="Manta de Algodón Orgánico" data-precio="49.90">
                        <i class="fas fa-plus-circle"></i> Añadir
                    </button>
                </div>
            </div>
            <!-- Producto 2 -->
            <div class="producto-item">
                <img class="producto-img" src="https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format" alt="Lámpara de mesa cerámica" loading="lazy">
                <div class="producto-info">
                    <div class="producto-titulo">Lámpara Arcilla</div>
                    <div class="producto-desc">Luz cálida, base artesanal, pantalla de lino.</div>
                    <div class="producto-precio">$79.00</div>
                    <button class="btn-producto" data-nombre="Lámpara Arcilla" data-precio="79.00">
                        <i class="fas fa-plus-circle"></i> Añadir
                    </button>
                </div>
            </div>
            <!-- Producto 3 -->
            <div class="producto-item">
                <img class="producto-img" src="https://images.unsplash.com/photo-1615529328331-f8919e5b4a2b?w=500&auto=format" alt="Cojín decorativo beige" loading="lazy">
                <div class="producto-info">
                    <div class="producto-titulo">Cojín de Lino Belga</div>
                    <div class="producto-desc">Relleno de plumas, suave y elegante.</div>
                    <div class="producto-precio">$34.50</div>
                    <button class="btn-producto" data-nombre="Cojín de Lino Belga" data-precio="34.50">
                        <i class="fas fa-plus-circle"></i> Añadir
                    </button>
                </div>
            </div>
            <!-- Producto 4 -->
            <div class="producto-item">
                <img class="producto-img" src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format" alt="Juego de tazas cerámica" loading="lazy">
                <div class="producto-info">
                    <div class="producto-titulo">Set de Tazas Artesanales</div>
                    <div class="producto-desc">4 piezas, esmalte mate, tonos tierra.</div>
                    <div class="producto-precio">$42.00</div>
                    <button class="btn-producto" data-nombre="Set de Tazas Artesanales" data-precio="42.00">
                        <i class="fas fa-plus-circle"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- NEWSLETTER: banner con flex sencillo -->
    <div class="container">
        <div class="newsletter">
            <div class="newsletter-flex">
                <div class="newsletter-text">
                    <h3><i class="fas fa-envelope-open-text"></i> Inspiración semanal</h3>
                    <p>Recibe ideas de decoración y ofertas exclusivas directamente en tu correo.</p>
                </div>
                <div class="newsletter-form">
                    <input type="email" placeholder="tu@email.com" id="emailInput">
                    <button id="suscribirBtn">Suscribirme</button>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- FOOTER con flex -->
<footer>
    <div class="container">
        <div class="footer-flex">
            <div class="footer-col">
                <h4>Casa & Estilo</h4>
                <p>Mobiliario consciente y diseño cálido para tu día a día.</p>
                <p><i class="fas fa-map-marker-alt"></i> Barcelona / Madrid</p>
            </div>
            <div class="footer-col">
                <h4>Ayuda</h4>
                <p><a href="#">Envíos y devoluciones</a></p>
                <p><a href="#">Preguntas frecuentes</a></p>
                <p><a href="#">Tamaños y guías</a></p>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <p><a href="#">Términos de uso</a></p>
                <p><a href="#">Privacidad</a></p>
                <p><a href="#">Cookies</a></p>
            </div>
            <div class="footer-col">
                <h4>Síguenos</h4>
                <p><i class="fab fa-instagram"></i> Instagram</p>
                <p><i class="fab fa-pinterest"></i> Pinterest</p>
                <p><i class="fab fa-tiktok"></i> TikTok</p>
            </div>
        </div>
        <div class="copyright">
            <p>© 2025 Casa & Estilo — Hecho con calidez para tu hogar.</p>
        </div>
    </div>
</footer>
</script>
</body>
</html>`);
});

// 7. Ejecutamos el servidor en el puerto definido.
app.listen(PORT, () => {
    console.log(`Estoy vivo en el puerto: http://localhost:${PORT}`);
});