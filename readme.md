# API de Podcast

Esta é uma API para gerenciar podcasts, incluindo operações CRUD com banco de dados PostgreSQL. A API permite criar, atualizar, listar e deletar podcasts, além de atualizar as categorias de cada episódio.

#### Base para projeto

https://github.com/felipeAguiarCode/node-ts-webapi-without-frameworks-podcast-menager

## Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Docker
- tsx / tsup (para desenvolvimento e build)

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/usuario/repository.git
cd repository
```

### 2. Instalar Dependências

Instale as dependências necessárias:

```bash
npm install
```

### 3. Iniciar o Banco de Dados (PostgreSQL)

Crie e inicie o PostgreSQL usando o Docker. Para isso, crie um arquivo `docker-compose.yml` na raiz do projeto com o seguinte conteúdo:

```yml
version: '3.8'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: podcast_db
    ports:
      - '5432:5432'
    volumes:
      - pg_data:/var/lib/postgresql/data
volumes:
  pg_data:
```

Agora, execute o Docker Compose para inicializar o banco de dados:

```bash
docker-compose up -d
```

O PostgreSQL estará disponível na porta 5432.

### 4. Iniciar o Servidor

Inicie o servidor de desenvolvimento com o seguinte comando:

```bash
npm run start:dev
```

### 5. Acessar a API

Agora, a API estará disponível na porta 3333, e você poderá interagir com ela utilizando `curl` ou ferramentas como Postman.

---

## Endpoints da API

Aqui estão os principais endpoints da API para manipulação dos podcasts:

### **POST /podcasts**

Cria um novo podcast.

```bash
curl -X POST http://localhost:3333/podcasts     -H "Content-Type: application/json"     -d '{
            "videoId": "4KDGTdiOV4I",
            "podcastName": "mundoed",
            "episode": "Marinakis",
            "categories": ["esporte", "vasco"]
        }'
```

### **PUT /podcasts/{id}**

Atualiza um podcast existente.

```bash
curl -X PUT http://localhost:3333/podcasts/14     -H "Content-Type: application/json"     -d '{
            "videoId": "teste",
            "podcastName": "ancapsu",
            "episode": "Lobby para controlar Elon Musk?",
            "categories": ["política", "redes sociais"]
        }'
```

### **PATCH /podcasts/{id}**

Atualiza categorias de um podcast.

```bash
curl -X PATCH http://localhost:3333/podcasts/6     -H "Content-Type: application/json"     -d '{
            "categories": ["esporte", "corrida", "segundo lugar"]
        }'
```

### **DELETE /podcasts/{id}**

Deleta um podcast.

```bash
curl -X DELETE http://localhost:3333/podcasts/14
```

---

## Desenvolvimento e Estrutura

A API foi organizada em camadas para garantir boa manutenibilidade e escalabilidade. As principais camadas incluem:

### **1. Controllers**

Os controladores são responsáveis por receber as requisições HTTP, validar os dados e repassar para os serviços correspondentes.

### **2. Services**

Os serviços contêm a lógica de negócios e são responsáveis por interagir com os repositórios de dados (banco de dados, por exemplo).

### **3. Repositories (Data)**

Esta camada é responsável pela comunicação direta com o banco de dados. Utiliza o `pg` para conectar ao PostgreSQL e executar operações de CRUD.

---

## Scripts no `package.json`

Adicione os seguintes scripts no seu `package.json` para facilitar o desenvolvimento e a compilação do projeto:

```json
{
    "type": "module",
    "scripts": {
        "test": "echo "Error: no test specified" && exit 1",
        "start:dev": "tsx src/server.ts",
        "start:watch": "tsx watch src/server.ts",
        "dist": "tsup src",
        "start:dist": "npm run dist && node dist/server.js"
    },
    "devDependencies": {
        "tsup": "^8.3.5",
        "tsx": "^4.19.2",
        "typescript": "^5.7.2"
    }
}
```

### **Comandos para Desenvolvimento**

- **Iniciar em modo de desenvolvimento**: `npm run start:dev`
- **Compilar o código para produção**: `npm run dist`
- **Iniciar o servidor de produção**: `npm run start:dist`

---

## Contribuindo

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso:

1. Faça um fork do repositório.
2. Crie uma branch com suas mudanças.
3. Envie um pull request para o repositório principal.

---

## Licença

Este projeto está licenciado sob a **MIT License** - consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
