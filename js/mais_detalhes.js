
// Função para obter o ID do projeto da URL
function getProjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para buscar e exibir detalhes do projeto

function displayProjectDetails() {
    const projectId = getProjectIdFromUrl();
    if (projectId) {
        db.collection("projetos").doc(projectId).get().then((doc) => {
            if (doc.exists) {
                const projeto = doc.data();
                document.getElementById('projectName').textContent = projeto.nome;
                document.getElementById('projectDescription').textContent = projeto.descSimples;
                document.getElementById('projectDetalhada').textContent = projeto.descDetalhada;
                document.getElementById('projectPrice').textContent = projeto.preco;

                // Exibir a imagem do projeto
                const projectImage = document.querySelector('.card-img-top');
                projectImage.src = projeto.imgUrl;
                projectImage.alt = projeto.nome; // Define o texto alternativo da imagem

                // Verificar se o PDF está disponível
                const downloadButton = document.getElementById('downloadButton');
                const pdfUrl = projeto.urlPdf;
                if (pdfUrl) {
                    // Se o PDF estiver disponível, mostrar o botão de download
                    downloadButton.href = pdfUrl;
                    downloadButton.style.display = 'inline-block';
                    document.getElementById('pdfStatus').textContent = ''; 
                } else {
                    downloadButton.style.display = 'none';
                    document.getElementById('pdfStatus').textContent = 'Em breve!';
                }
            } else {
                console.error("Nenhum documento encontrado com o ID fornecido.");
            }
        }).catch((error) => {
            console.error("Erro ao obter detalhes do projeto:", error);
        });
    } else {
        console.error("ID do projeto não encontrado na URL.");
    }
}
// Chame a função para exibir os detalhes do projeto quando a página for carregada
window.onload = displayProjectDetails;
