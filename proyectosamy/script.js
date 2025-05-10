document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    const productos = {
        tenis: [
            { marca: 'Nike', modelo: 'Air Max', tallas: ['38', '39', '40'], precio: 150 },
            { marca: 'Adidas', modelo: 'Superstar', tallas: ['38', '39', '40'], precio: 120 }
        ],
        canguros: [
            { marca: 'Adidas', modelo: 'Ultra Boost', tallas: ['S', 'M', 'L'], colores: ['Negro', 'Blanco'], precio: 80 },
            { marca: 'Puma', modelo: 'Future Rider', tallas: ['S', 'M', 'L'], colores: ['Rojo', 'Azul'], precio: 70 }
        ],
        poleras: [
            { marca: 'Puma', modelo: 'Classic', tallas: ['S', 'M', 'L'], colores: ['Negro', 'Blanco'], precio: 50 },
            { marca: 'Reebok', modelo: 'Club C', tallas: ['S', 'M', 'L'], colores: ['Rojo', 'Azul'], precio: 45 }
        ],
        pantalones: [
            { marca: 'Reebok', modelo: 'Power Move', tallas: ['S', 'M', 'L'], colores: ['Negro', 'Blanco'], precio: 70 },
            { marca: 'Nike', modelo: 'Dri-FIT', tallas: ['S', 'M', 'L'], colores: ['Rojo', 'Azul'], precio: 85 }
        ]
    };

    const form = document.getElementById('productoForm');
    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const tallaSelect = document.getElementById('talla');
    const colorSelect = document.getElementById('color');

    function populateSelect(selectElement, options) {
        selectElement.innerHTML = '<option value="">Selecciona una opción</option>';
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    form.addEventListener('change', (event) => {
        const target = event.target;

        if (target.id === 'categoria') {
            const selectedCategoria = target.value;
            const productosPorCategoria = productos[selectedCategoria];
            populateSelect(marcaSelect, productosPorCategoria.map(producto => producto.marca));
            populateSelect(modeloSelect, []);
            populateSelect(tallaSelect, []);
            populateSelect(colorSelect, []);
        } else if (target.id === 'marca') {
            const selectedMarca = target.value;
            const productosPorCategoria = productos[categoria].filter(producto => producto.marca === selectedMarca);
            populateSelect(modeloSelect, productosPorCategoria.map(producto => producto.modelo));
            populateSelect(tallaSelect, []);
            populateSelect(colorSelect, []);
        } else if (target.id === 'modelo') {
            const selectedModelo = target.value;
            const productoSeleccionado = productos[categoria].find(producto => producto.modelo === selectedModelo);
            populateSelect(tallaSelect, productoSeleccionado.tallas);
            if (productoSeleccionado.colores) {
                populateSelect(colorSelect, productoSeleccionado.colores);
            } else {
                populateSelect(colorSelect, []);
            }
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const productoData = {};
        formData.forEach((value, key) => {
            productoData[key] = value;
        });

        const productoSeleccionado = productos[categoria].find(producto => producto.modelo === productoData.modelo);
        const producto = {
            marca: productoData.marca,
            modelo: productoData.modelo,
            talla: productoData.talla,
            color: productoData.color || '',
            precio: productoSeleccionado.precio,
            cantidad: 1
        };

        localStorage.setItem('producto', JSON.stringify(producto));
        window.location.href = 'checkout.html';
    });
});