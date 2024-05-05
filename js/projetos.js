// Recupere os dados da coleção "projetos"
db.collection("projetos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const projeto = doc.data();
        const link = `mais_detalhes.html?id=${doc.id}`; // Construir o link para a página de mais detalhes com o id do projeto

        // Criar a div do projeto
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('col-md-4');

        // Criar a tabela
        const table = document.createElement('table');
        table.classList.add('table');

        // Criar o corpo da tabela
        const tbody = document.createElement('tbody');

        // Criar a linha para a imagem
        const imgRow = document.createElement('tr');
        const imgCell = document.createElement('td');
        imgCell.classList.add('text-center');
        const imgLink = document.createElement('a');
        imgLink.href = link;

        // Adicionar evento de clique à imagem
        imgLink.addEventListener('click', () => {
            window.location.href = link;
        });

        const img = document.createElement('img');
        img.src = projeto.imgUrl;
        img.alt = projeto.nome;
        img.classList.add('project-image');
        imgLink.appendChild(img);
        imgCell.appendChild(imgLink);
        imgRow.appendChild(imgCell);
        tbody.appendChild(imgRow);

        // Criar a linha para a descrição
        const descRow = document.createElement('tr');
        const descCell = document.createElement('td');
        descCell.classList.add('text-center', 'project-description');
        const descLink = document.createElement('a');
        descLink.href = link;
        descLink.textContent = projeto.nome;
        descCell.appendChild(descLink);
        descRow.appendChild(descCell);
        tbody.appendChild(descRow);

        // Adicionar o corpo da tabela à tabela
        table.appendChild(tbody);

        // Adicionar a tabela à div do projeto
        projectDiv.appendChild(table);

        // Adicionar a div do projeto ao elemento com a classe "row"
        document.querySelector('.row').appendChild(projectDiv);
    });
}).catch((error) => {
    console.error("Erro ao obter projetos:", error);
});
