# Pre-Wedding-Service

Um serviço que se integra à ZapsterAPI para envio do 'save the date' do casamento ou outros tipos de mensagens para contatos do whatsapp

## Documentação da API

#### Cria agendamento de envio de mensagens

```http
  POST /api/scheduling-whatsapp-message
```

| Parâmetro    | Tipo     | Descrição                                                                                                                                        |
| :----------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `contacts`   | `array`  | **Obrigatório**. Uma lista de contatos. Um array de objetos com nome e número dos contatos. Ex.: [{ "name": "test", "number": "5555555555555" }] |
| `instanceId` | `string` | **Obrigatório**. O id da instância da ZapsterAPI para envio das mensagens                                                                        |
| `mediaData`  | `object` | **Obrigatório**. Dados da mídia. Exemplo: { "caption": "legenda da mensagem", "url": "url da mídia" }                                            |

## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raniel-sobrinho-1b249514b/)

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`REDIS_HOST`

`ZAPSTER_INSTANCE_ID`

`ZAPSTER_TOKEN`

## Instalação

Instale pre-wedding-service com npm ou yarn

```bash
  git pull git@github.com:ranielsobrinho/pre-wedding-service.git
  cd pre-wedding-service
  npm install
  docker compose up -d (para rodar o Redis, pois o projeto usa Redis e Bull para agendamento de envio das mensagens)
  npm run build
  npm start
```

## Stack utilizada

**Back-end:** Node, Express, BullMQ, Axios, Typescript
