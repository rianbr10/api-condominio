# Condominio Green Park

Este repositório contém o código fonte da sua API. Siga as instruções abaixo para configurar e executar o projeto.

## Pré-requisitos

Certifique-se de ter o Yarn instalado em sua máquina. Você pode instalá-lo seguindo as instruções oficiais do Yarn: [https://yarnpkg.com/getting-started/install](https://yarnpkg.com/getting-started/install)

## Instalação

1. Acesse o diretório do projeto:

    ```bash
    cd api-condominio-green-park
    ```

2. Instale as dependências do projeto utilizando o Yarn:

    ```bash
    yarn install
    ```

## Configuração do Banco de Dados

Antes de executar a API, você precisa configurar o banco de dados e fazer as migrações das tabelas. Siga os passos abaixo:

1. Certifique-se de ter um banco de dados compatível (por exemplo, PostgreSQL) instalado e configurado em sua máquina.

2. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Aqui está um exemplo:

    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASS=postgres
    DB_NAME=block-offers
    DB_DIALECT=postgres
    ```

### Execute o seguinte comando para migrar as tabelas do banco de dados:

1. Rodar as migrations:

    ```bash
    yarn migrate
    ```

2. Rodar as seeds:

    ```bash
    yarn seed:all
    ```

## Executando a API

Após a conclusão da instalação e configuração, você pode iniciar a execução da API com o seguinte comando:

```bash
yarn start
```

A API estará acessível em `http://localhost:8000` ou em outra porta especificada no arquivo `.env`.

# Documentação da API

A API fornece os seguintes endpoints para interagir com os recursos:

## Importar Boletos

### http://localhost:8000/api/v1/boletos/extract-pages

**Descrição:** Faça o upload de um arquivo CSV com os boletos. para importar os boletos.

**Método:** POST

**URL:** `/boletos/extract-pages`

#### Exemplo de Requisição

```bash
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('boletos', fs.createReadStream('/home/rian/Vídeos/boletos.csv'));

var config = {
  method: 'post',
  url: 'http://localhost:8000/api/v1/boletos/import-csv',
  headers: {
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de Resposta

```bash
{
    "message": "CSV imported successfully"
}
```

## Extrair os boletos

### http://localhost:8000/api/v1/boletos/extract-pages

**Descrição:** Faça o upload de um arquivo PDF com os boletos do cliente. para separar os boletos e salvar em uma pasta local.

**OBS:** Os boletos gerados serão salvos na pasta `output` na raiz do projeto.

**Método:** POST

**URL:** `/boletos/extract-pages`

#### Exemplo de Request

```bash
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('pdf', fs.createReadStream('/home/rian/Vídeos/boletos_cliente.pdf'));

var config = {
  method: 'post',
  url: 'http://localhost:8000/api/v1/boletos/extract-pages',
  headers: {
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

### Exemplo de Resposta

```bash
{
    "message": "Paginas extraidas com sucesso"
}
```
