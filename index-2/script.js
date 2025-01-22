//menumobile
function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) { 
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src= "../images/barra-de-menu.png";
    } else {
        menuMobile.classList.add('open')
        document.querySelector('.icon').src= "../images/marca-x.png";
    }
}


//slide vanilla JS
let slides = document.querySelectorAll('.slide-container');

let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

//setInterval(next, 8000);

//filtro de serviços e rederização de serviços


const servicesContainer = document.getElementById('services');
const filterSector = document.getElementById('sector-filter');
let servicesData = [];


//função para buscar os dados do JSON e redenrizar os serviços
async function loadServices() {
    try {
        const response = await fetch('solution.json');
        servicesData = await response.json();

        renderServices(servicesData);
        
        filterSector.addEventListener('change', function(){
            const sectorSelected = this.value;

            //Filtra os servços de acordo com o setor selecionado
            const filteredServices = servicesData.filter(service => {
                if ( sectorSelected === 'todos') {
                    return true; //Mostra todos os serviços
                }
                return service.sector === sectorSelected;
            });

            //Renderiza os serviços filtrados
            renderServices(filteredServices);
        });

    } catch (error) {
        console.error('Erro ao carregar os serviços:', error)
    }
}

// Função para criar o HTML dos serviços
function renderServices(services) {
    servicesContainer.innerHTML = ''; // Limpa os serviços renderizados anteriormente
    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service');
        serviceElement.setAttribute('data-sector', service.sector); // Atribui o data-sector

        // Criar o conteúdo HTML dos serviços
        serviceElement.innerHTML = `
            <div class="service-img"><img class="service-img" src="${service.image}" alt="${service.title}"></div>
            <div class="service-desc">
                <h2>${service.title}</h2>
                <p>${service.description}</p>
                <div class="service-buttons">
                    <a href="#" class="service-btn2">Modalidades</a>
                    <a href="../index-3/index.html" class="service-btn1">Fale conosco</a>
                </div>
            </div>
        `;
        // Encontrar o botão "Saiba Mais" e adicionar um evento de clique
        const saibaMaisBtn = serviceElement.querySelector('.service-btn2');
        saibaMaisBtn.addEventListener('click', (e) => {
            e.preventDefault();  // Previne a navegação para a outra página
            openModal(service);  // Abre o modal com as informações do serviço
        });

        servicesContainer.appendChild(serviceElement);
    });
}

// Inicializar os serviços na página
loadServices();

filterSector.addEventListener('change', function() {
    const sectorSelected = this.value;
    
    // Filtra os serviços de acordo com o setor selecionado
    const filteredServices = servicesData.filter(service => {
        if (sectorSelected === 'todos') {
            return true; // Mostra todos os serviços
        }
        return service.sector === sectorSelected;
    });

    // Renderiza os serviços filtrados
    renderServices(filteredServices);
});

//Modal de saiba mais dos serviços
// Variáveis globais
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalAdvantages = document.getElementById('modal-advantages');
const closeModalBtn = document.getElementById('close-modal-btn');
const overlay = document.getElementById('overlay');


// Função para abrir o modal e preencher com os dados do serviço
function openModal(service) {
    // Preenche o modal com as informações do serviço
    modalTitle.textContent = service.title; // Título do serviço
    modalImage.innerHTML = `<img src="${service.image}" alt="Imagem do Serviço">`; // Imagem do serviço

    // Cria uma lista de vantagens
    const advantagesList = document.createElement('ul');
    service.advantages.forEach(advantage => {
        const listItem = document.createElement('li');
        listItem.textContent = advantage; // Adiciona o texto da vantagem
        advantagesList.appendChild(listItem);
    });

    // Substitui o conteúdo de modalAdvantages por essa lista
    modalAdvantages.innerHTML = ''; // Limpa o conteúdo anterior
    modalAdvantages.appendChild(advantagesList);

    // Exibe o modal e a sobrecarga
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Função para fechar o modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');  // Fecha o modal
    overlay.classList.remove('active');  // Remove a sobrecarga (se existir)
});
