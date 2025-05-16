// Rolagem suave para seções
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Simulação de calendário de visitas
document.getElementById('calendario').innerHTML = `
    <h3>Próximas Datas:</h3>
    <ul>
        <li>25/05 - Fazenda Orgânica São Paulo</li>
        <li>01/06 - Sítio do Seu Zé (Horta Comunitária)</li>
    </ul>
`;

// Formulário de contato
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve.');
    this.reset();
});

// Popup de inscrição (simplificado)
function openForm() {
    const nome = prompt("Digite seu nome para inscrição:");
    if (nome) {
        alert(`Inscrição realizada, ${nome}! Enviaremos detalhes por e-mail.`);
    }
}
// API do Google Maps (substitua SUA_CHAVE pela sua chave API)
function initMap() {
    const saoPaulo = { lat: -23.5505, lng: -46.6333 }; // Centro de SP (exemplo)
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: saoPaulo,
        styles: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }] // Remove pontos comerciais
            }
        ]
    });

    // Marcadores personalizados
    const fazendas = [
        { lat: -23.5405, lng: -46.6433, title: "Fazenda Orgânica São Paulo", type: "fazenda" },
        { lat: -23.5605, lng: -46.6233, title: "Sítio do Seu Zé", type: "fazenda" },
        { lat: -23.5705, lng: -46.6133, title: "Horta Comunitária Vila Madalena", type: "horta" }
    ];

    fazendas.forEach(local => {
        const marker = new google.maps.Marker({
            position: { lat: local.lat, lng: local.lng },
            map: map,
            title: local.title,
            icon: {
                url: local.type === "fazenda" ? 
                    "https://maps.google.com/mapfiles/ms/icons/green-dot.png" :
                    "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                scaledSize: new google.maps.Size(32, 32)
            }
        });

        // InfoWindow (popup ao clicar no marcador)
        const infowindow = new google.maps.InfoWindow({
            content: `<h3>${local.title}</h3><p>${local.type === "fazenda" ? "Visitas escolares agendadas" : "Horta pública"}</p>`
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    });
}