# Weather API

API REST para obtenção de temperatura, umidade e status de uma cidade.
Tecnologias utilizadas:
 - NodeJS
 - TypeScript
 - Express
 - Jest
 - Swagger
 
A documentação completa pode ser visualizada pelo Swagger UI através da rota /api-docs

## Instalação

    npm i / yarn

## Rodando o app

    npm run dev / yarn dev

## Rodando os testes

    npm run test / yarn test

# Consulta

Devem ser informados, pelas query params, o nome da cidade (city) ou suas coordenadas (lat e lon).

Não devem ser passadas ambas as informações e, para consulta via coordenadas, tanto a latitude quanto a longitude devem ser informadas.

Caso a cidade ou coordenadas informadas não seja encontrada, a API retornará erro 404.

### Busca pelo nome da cidade

`GET /weather?city=belo%20horizonte`

    curl -X 'GET' \ 'http://localhost:3333/weather?city=Belo%20Horizonte' \ -H 'accept: */*'

### Response body

    {
      "temperature": 19,
      "humidity": 53,
      "status": "Nenhum risco eminente"
    }
    
  status: 200 OK  
    
### Busca pelas coordenadas

`GET /weather?city=belo%20horizonte`

    curl -X 'GET' \ 'http://localhost:3333/weather?lat=-19.9678&lon=-44.1983' \ -H 'accept: */*'

### Response body

    {
      "temperature": 19,
      "humidity": 48,
      "status": "Nenhum risco eminente"
    }
    
  status: 200 OK


