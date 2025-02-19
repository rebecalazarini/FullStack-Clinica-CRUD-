const uri = 'http://localhost:4000';

//Obtendo o título do servidor
const titulo = document.querySelector('header h1'); //DOM
fetch(uri)
    .then(resp => resp.json())
    .then(resp => titulo.innerHTML = resp.titulo);

//Obtendo as consultas do servidor e exibindo na tabela
const corpo = document.querySelector('table tbody'); //DOM
fetch(uri + '/consultas')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(c => {
            const linha = document.createElement('tr');
            
            const dataHora = new Date(c.data_hora);//
            const dataFormatada = `${String(dataHora.getDate()).padStart(2, '0')}/${String(dataHora.getMonth() + 1).padStart(2, '0')}/${dataHora.getFullYear()}`;
            const horaFormatada = `${String(dataHora.getHours()).padStart(2, '0')}:${String(dataHora.getMinutes()).padStart(2, '0')}:${String(dataHora.getSeconds()).padStart(2, '0')}`;





            linha.innerHTML = `
                <td>${c.consulta_id}</td>
                <td>${c.nome_paciente}</td>
                <td>${c.nome_medico}</td>
               <td>${dataFormatada} ${horaFormatada}</td>
            `;
            corpo.appendChild(linha);
        });
    });

//Enviando uma nova consulta para o servidor
const form = document.querySelector('form'); //DOM
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const body = {
        paciente: form.paciente.value,
        medico: form.medico.value,
        data: form.data.value
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.3.1' },
        body: JSON.stringify(body)
    };

    fetch(uri + '/consultas', options)
        .then(resp => resp.status)
        .then(resp => resp === 201 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
});

const botaoExcluir = document.querySelector('#botao-excluir'); // DOM
botaoExcluir.addEventListener('click', () => {
    const consultaId = document.querySelector('#consulta-id').value;
    if (consultaId) {
        fetch(`${uri}/consultas/${consultaId}`,
             { method: 'DELETE' })
            .then(resp => resp.status)
            .then(resp => resp === 200 ? window.location.reload() : alert('Erro ao excluir'))
            .catch(err => console.error(err));
    } else {
        alert('Por favor, insira um ID de consulta válido.');
    }
});

const botaoAtualizar = document.querySelector('#botao-atualizar'); // DOM
botaoAtualizar.addEventListener('click', () => {
    const consultaId = document.querySelector('#consulta-id-update').value;
    const nomePaciente = document.querySelector('#paciente-update').value;
    const nomeMedico = document.querySelector('#medico-update').value;
    const dataHora = document.querySelector('#data-update').value;

    if (consultaId && nomePaciente && nomeMedico && dataHora) {
        const updateData = {
            nome_paciente: nomePaciente,
            nome_medico: nomeMedico,
            data_hora: dataHora
        };

        fetch(`${uri}/consultas/${consultaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(resp => resp.status)
        .then(resp => resp === 200 ? window.location.reload() : alert('Erro ao atualizar'))
        .catch(err => console.error(err));
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});
