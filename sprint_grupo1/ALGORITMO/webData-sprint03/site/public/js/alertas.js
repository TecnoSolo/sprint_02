var alertas = [];

function obterdados(idSensor) {
    fetch(`/dashboard/buscarMedidasEmTempoReal/${idSensor}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idSensor);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idSensor} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor) {
    var umid = resposta[0].umidade;

    var grauDeAviso = '';

    var limites = {
        critico_baixo: 21,
        emergencia_baixo: 41,
        alerta_baixo: 61,
        ideal: 81,
        alerta_alto: 86,
        emergencia_alto: 96,
        critico_alto: 100
    };

    var classe_umidade = 'cor-alerta';

    if (umid >= limites.emergencia_alto) {
        classe_umidade = 'cor-alerta critico';
        grauDeAviso = 'critico'
        grauDeAvisoCor = 'cor-alerta critico'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid >= limites.alerta_alto && umid < limites.emergencia_alto) {
        classe_umidade = 'cor-alerta emergencia';
        grauDeAviso = 'emergencia'
        grauDeAvisoCor = 'cor-alerta emergencia'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    else if (umid >= limites.emergencia_baixo && umid < limites.alerta_baixo) {
        classe_umidade = 'cor-alerta alerta';
        grauDeAviso = 'alerta'
        grauDeAvisoCor = 'cor-alerta alerta'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid >= limites.alerta_baixo && umid < limites.ideal) {
        classe_umidade = 'cor-alerta ideal';
        // removerAlerta(idSensor);
    }
    else if (umid >= limites.ideal && umid < limites.alerta_alto) {
        classe_umidade = 'cor-alerta alerta';
        grauDeAviso = 'alerta'
        grauDeAvisoCor = 'cor-alerta alerta'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    else if (umid < limites.emergencia_baixo && umid >= limites.critico_baixo) {
        classe_umidade = 'cor-alerta emergencia';
        grauDeAviso = 'emergencia'
        grauDeAvisoCor = 'cor-alerta emergencia'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid < limites.critico_baixo) {
        classe_umidade = 'cor-alerta critico';
        grauDeAviso = 'critico'
        grauDeAvisoCor = 'cor-alerta critico'
        // exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`umid_sensor_${idSensor}`) != null) {
        document.getElementById(`umid_sensor_${idSensor}`).innerHTML = umid + "%";
    }

    if (document.getElementById(`card_${idSensor}`)) {
        card = document.getElementById(`card_${idSensor}`)
        card.className = classe_umidade;
    }
}

// function exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor) {
//     var indice = alertas.findIndex(item => item.idSensor == idSensor);

//     if (indice >= 0) {
//         alertas[indice] = { idSensor, umid, grauDeAviso, grauDeAvisoCor }
//     } else {
//         alertas.push({ idSensor, umid, grauDeAviso, grauDeAvisoCor });
//     }

//     exibirCards();
// }

// function removerAlerta(idSensor) {
//     alertas = alertas.filter(item => item.idSensor != idSensor);
//     exibirCards();
// }

// function exibirCards() {
//     alerta.innerHTML = '';

//     for (var i = 0; i < alertas.length; i++) {
//         var mensagem = alertas[i];
//         alerta.innerHTML += transformarEmDiv(mensagem);
//     }
// }

function transformarEmDiv({ idSensor, umid, grauDeAviso, grauDeAvisoCor }) {

    var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idSensor).descricao;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
            <small>Umidade ${umid}.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function atualizacaoPeriodica() {
   
    setTimeout(atualizacaoPeriodica, 10000);
}