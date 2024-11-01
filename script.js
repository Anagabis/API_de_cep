function buscarCEP() {
    const cep = document.getElementById('cep').value;
    const resultado = document.getElementById('resultado');

    // Verifica se o CEP possui 8 dígitos
    if (cep.length !== 8 || isNaN(cep)) {
        resultado.innerHTML = 'Por favor, insira um CEP válido com 8 dígitos.';
        return;
    }

    // Faz a requisição para a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = 'CEP não encontrado.';
            } else {
                resultado.innerHTML = `
                    <p><strong>Endereço:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultado.innerHTML = 'Ocorreu um erro. Tente novamente.';
            console.error(error);
        });
}
