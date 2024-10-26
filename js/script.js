/* -----------------------LETRA BLANCA EN BARRA DE NAVEGACION------------------------*/ 
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a");
    const currentPath = window.location.pathname;

    // Para detectar correctamente la página actual
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");

        // Verifica si es la página principal
        if (currentPath === "/" && linkHref === "/") {
            link.classList.add("active");
        }
        // Detecta la carpeta en la que estamos y resalta el enlace correspondiente
        else if (currentPath.includes(linkHref) && linkHref !== "/") {
            link.classList.add("active");
        } else {
            link.classList.remove("active"); // Elimina "active" si no es el enlace actual
        }
    });
});

/* -----------------------CARRUSEL DE IMAGENES EN INDEX------------------------*/ 

let currentIndex = 0;
let autoSlideInterval;
const slideWidth = 100 / document.querySelectorAll('.carousel-images img').length; // Ancho dinámico de cada imagen en porcentaje
const carouselImages = document.querySelector('.carousel-images');
const dots = document.querySelectorAll('.carousel-dots .dot');
const isMobile = window.innerWidth <= 630; // Determinar si es pantalla pequeña

function moveToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * slideWidth;
    carouselImages.style.transform = `translateX(${offset}%)`;
    updateDots();
    resetAutoSlide();
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function prevSlide() {
    if (currentIndex > 0) {
        moveToSlide(currentIndex - 1);
    } else {
        moveToSlide(dots.length - 1); // Si está en la primera imagen, ir a la última
    }
}

function nextSlide() {
    if (currentIndex < dots.length - 1) {
        moveToSlide(currentIndex + 1);
    } else {
        moveToSlide(0); // Si está en la última imagen, ir a la primera
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        moveToSlide(currentIndex);
    }, 6000); // cada n segundos
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function initCarousel() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    updateDots(); // Asegura que el primer dot esté activo al cargar la página

    if (isMobile) {
        // Habilitar arrastre solo en pantallas pequeñas
        carouselImages.addEventListener('touchstart', dragStart);
        carouselImages.addEventListener('touchend', dragEnd);
        carouselImages.addEventListener('touchmove', dragMove);
    }

    startAutoSlide();
}

// Funciones de arrastre para pantallas móviles
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

function dragEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // Actualizar lógica para arrastre cíclico
    if (movedBy < -slideWidth / 3) {
        if (currentIndex < dots.length - 1) {
            currentIndex += 1;
        } else {
            currentIndex = 0; // Si está en la última imagen, ir a la primera
        }
    } else if (movedBy > slideWidth / 3) {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = dots.length - 1; // Si está en la primera imagen, ir a la última
        }
    }

    moveToSlide(currentIndex);
    prevTranslate = currentIndex * -slideWidth;
    resetAutoSlide();
}

function dragMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + (currentPosition - startPos);
        carouselImages.style.transform = `translateX(${currentTranslate}%)`;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

initCarousel();



/* -----------------------MAPA DE GOOGLE SUCURSALES------------------------*/ 

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('sucursales-select');
    const mapaSucursal = document.getElementById('mapa-sucursal');

    // Establecer el valor por defecto
    selectElement.value = 'culiacan';

    // Cambiar el mapa basado en la selección del combobox
    selectElement.addEventListener('change', function () {
        if (this.value === 'culiacan') {
            mapaSucursal.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d879.5239729484308!2d-107.39984756060244!3d24.823387427683482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bcdb006754c6ad%3A0x1c781579c7476a81!2sCRN%20PACK%20CULIACAN!5e0!3m2!1ses-419!2smx!4v1726946954633!5m2!1ses-419!2smx";
        } else if (this.value === 'guasave') {
            mapaSucursal.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.340689200385!2d-108.47662082552945!3d25.56032981689846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bbbf001b7420a1%3A0xea6d4789764bdc4c!2sCRN%20PACK%20GUASAVE!5e0!3m2!1ses-419!2smx!4v1726947587768!5m2!1ses-419!2smx";
        }
    });
});


        function showMap(location) {
            var mapFrame = document.getElementById('mapFrame');
            if (location === 'culiacan') {
                mapFrame.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.1753316034365!2d-107.40225942555568!3d24.82367694673023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bcdb006754c6ad%3A0x1c781579c7476a81!2sCRN%20PACK%20CULIACAN!5e0!3m2!1ses-419!2smx!4v1729365156287!5m2!1ses-419!2smx';
            } else if (location === 'guasave') {
                mapFrame.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.340689200385!2d-108.47662082552945!3d25.56032981689846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86bbbf001b7420a1%3A0xea6d4789764bdc4c!2sCRN%20PACK%20GUASAVE!5e0!3m2!1ses-419!2smx!4v1729365187057!5m2!1ses-419!2smx';
            }
        }


/* -----------------------BOTON DEL MENU EN CELULAR------------------------*/ 
function toggleMenu() {
    const navContainer = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.menu-btn');
    navContainer.classList.toggle('active');
    menuBtn.classList.toggle('active');
}
