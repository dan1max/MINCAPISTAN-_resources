// --- [ 1. BASE DE DATOS DE CONTENIDO ] ---
// Para añadir contenido, simplemente edita este objeto.
// "id": El identificador único.
// "title": El título que aparece en el menú.
// "content": El HTML que se mostrará.
//
// Para añadir una nueva categoría, añade un nuevo bloque como "fallacies" o "ethics".

const contentDatabase = {
    "fallacies": {
        categoryTitle: "Falacias Comunes",
        topics: [
            {
                id: "broken_window",
                title: "Falacia de la Ventana Rota",
                content: `
                    <h2>Falacia de la Ventana Rota</h2>
                    <p>La falacia de la ventana rota es una falacia económica popularizada por el economista francés <strong>Frédéric Bastiat</strong> en 1850.</p>
                    <p>El argumento central es que un acto de destrucción (como romper una ventana) no beneficia a la economía, aunque parezca que sí. Quienes cometen la falacia solo ven lo que <strong>"se ve"</strong> (el dinero gastado por el dueño de la tienda para que el cristalero repare la ventana).</p>
                    <p>Lo que <strong>"no se ve"</strong> es el costo de oportunidad. Ese dinero que el dueño gastó en la reparación, ahora no puede gastarlo en otra cosa (como comprar zapatos nuevos, invertir en su negocio, o ahorrar). La destrucción simplemente ha desviado el gasto, no ha creado riqueza neta. El trabajo del cristalero se produce a expensas del trabajo del zapatero.</p>
                `
            },
            {
                id: "lump_of_labour",
                title: "Falacia del 'Lump of Labour'",
                content: `
                    <h2>Falacia del 'Lump of Labour'</h2>
                    <p>Esta es la idea errónea de que hay una cantidad fija de trabajo (un "bulto" de trabajo) en la economía. </p>
                    <p>Bajo esta falacia, la gente teme que si un trabajador es más productivo, o si un inmigrante entra al mercado, "robará" el trabajo de otro. Se ignora que el trabajo no es un recurso fijo; la demanda de trabajo es dinámica y la productividad aumenta la riqueza general, creando nuevas demandas y nuevos empleos en otros sectores.</p>
                `
            }
        ]
    },
    "ethics": {
        categoryTitle: "Argumentos Éticos",
        topics: [
            {
                id: "self_ownership",
                title: "Principio de Autopropiedad",
                content: `
                    <h2>Principio de Autopropiedad</h2>
                    <p>El principio de autopropiedad (o soberanía individual) es el concepto de que cada individuo tiene la propiedad exclusiva sobre su propio cuerpo y su propia vida.</p>
                    <p>De este axioma se derivan otros derechos, como el derecho a los frutos del propio trabajo. Si eres dueño de ti mismo, eres dueño de tu tiempo y tu esfuerzo; por lo tanto, eres dueño de lo que produces con ese tiempo y esfuerzo.</p>
                `
            },
            {
                id: "non_aggression",
                title: "Principio de No Agresión (NAP)",
                content: `
                    <h2>Principio de No Agresión (NAP)</h2>
                    <p>El Principio de No Agresión es un postulado ético que sostiene que es inherentemente ilegítimo <strong>iniciar</strong> el uso de la fuerza física, la amenaza de fuerza, o el fraude contra otra persona o su propiedad.</p>
                    <p>Es importante notar que el NAP no prohíbe el uso de la fuerza en defensa propia o en defensa de otros; solo prohíbe la <strong>iniciación</strong> de la misma.</p>
                `
            }
        ]
    }
};


// --- [ 2. LÓGICA DE LA APLICACIÓN ] ---
document.addEventListener('DOMContentLoaded', () => {

    const categoryList = document.getElementById('category-list');
    const contentPlaceholder = document.getElementById('content-placeholder');
    const contentViewer = document.getElementById('content-viewer');

    // --- Paso 1: Poblar la barra lateral desde la "base de datos" ---
    function populateSidebar() {
        for (const categoryKey in contentDatabase) {
            const category = contentDatabase[categoryKey];

            // 1. Crear el contenedor de la categoría
            const categoryLi = document.createElement('li');
            
            // 2. Crear el título de la categoría (clickable)
            const categoryTitleDiv = document.createElement('div');
            categoryTitleDiv.className = 'category-title';
            categoryTitleDiv.textContent = category.categoryTitle;
            
            // 3. Crear la lista de temas (oculta)
            const topicListUl = document.createElement('ul');
            topicListUl.className = 'topic-list';

            // 4. Llenar la lista de temas
            category.topics.forEach(topic => {
                const topicLi = document.createElement('li');
                topicLi.className = 'topic-item';
                topicLi.textContent = topic.title;
                topicLi.dataset.contentId = topic.id; // Guarda el ID para buscarlo luego
                topicLi.dataset.categoryKey = categoryKey; // Guarda la categoría
                topicListUl.appendChild(topicLi);
            });

            // 5. Ensamblar todo
            categoryLi.appendChild(categoryTitleDiv);
            categoryLi.appendChild(topicListUl);
            categoryList.appendChild(categoryLi);
        }
    }

    // --- Paso 2: Cargar contenido al hacer clic en un tema ---
    function loadContent(categoryKey, topicId) {
        const category = contentDatabase[categoryKey];
        if (!category) return;

        const topic = category.topics.find(t => t.id === topicId);
        if (!topic) return;

        // Ocultar el placeholder y mostrar el contenido
        contentPlaceholder.style.display = 'none';
        contentViewer.innerHTML = topic.content;
    }

    // --- Paso 3: Configurar los Event Listeners (manejadores de clics) ---
    categoryList.addEventListener('click', (e) => {
        const target = e.target;

        // Caso 1: Clic en un TÍTULO de categoría (para abrir/cerrar)
        if (target.classList.contains('category-title')) {
            const topicList = target.nextElementSibling;
            topicList.classList.toggle('visible');
            target.classList.toggle('open');
        }

        // Caso 2: Clic en un TEMA (para cargar contenido)
        if (target.classList.contains('topic-item')) {
            const topicId = target.dataset.contentId;
            const categoryKey = target.dataset.categoryKey;
            loadContent(categoryKey, topicId);
        }
    });

    // --- INICIAR LA APP ---
    populateSidebar();
});
