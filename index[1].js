let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckIn: null
    },
    {
        nome: "Ana Silva",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 15, 10, 45),
        dataCheckIn: null
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 2, 10, 14, 0),
        dataCheckIn: null
    },
    {
        nome: "Mariana Oliveira",
        email: "mariana@gmail.com",
        dataInscricao: new Date(2024, 0, 5, 9, 15),
        dataCheckIn: null
    },
    {
        nome: "Lucas Santos",
        email: "lucas@gmail.com",
        dataInscricao: new Date(2024, 1, 20, 16, 30),
        dataCheckIn: null
    },
    {
        nome: "Carla Costa",
        email: "carla@gmail.com",
        dataInscricao: new Date(2024, 0, 25, 12, 0),
        dataCheckIn: new Date(2024, 1, 1, 13, 30)
    },
    {
        nome: "Rafaela Sousa",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 8, 45),
        dataCheckIn: new Date(2024, 2, 7, 9, 30)
    },
    {
        nome: "João Oliveira",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 1, 15, 15, 0),
        dataCheckIn: new Date(2024, 1, 20, 16, 15)
    },
    {
        nome: "Amanda Costa",
        email: "amanda@gmail.com",
        dataInscricao: new Date(2024, 2, 15, 11, 30),
        dataCheckIn: new Date(2024, 2, 18, 12, 45)
    }
];

 const CriarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `

  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarlista = (participante) => {
  let output = ""
  for(let participante of participantes) {
    output = output + CriarNovoParticipante(participante)
  }


  document
  .querySelector('tbody')
  .innerHTML = output

}
 

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email  
  )

  if(participanteExiste) {
    alert('email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'tem certeza que deseja fazer o check-in'
  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  
  const participante = participantes.find((p)=> {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarlista(participantes)
}
