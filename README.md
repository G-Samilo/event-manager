# Sistema de Gestão de Eventos - API RESTful

API RESTful desenvolvida como atividade prática do curso de Sistemas de Informação. O sistema permite criar eventos com limite de vagas e gerir as inscrições dos participantes, aplicando regras de negócio para evitar a sobrelotação.

**Tecnologias Utilizadas**
* Node.js e Express
* Sequelize e SQLite
* Joi para validação de dados

**Instalação e Execução**
1. Clone este repositório e aceda à diretoria do projeto:
   `git clone <URL_DO_REPOSITORIO>`
   `cd event-manager`
2. Instale as dependências necessárias:
   `npm install`
3. Inicie o servidor local:
   `node server.js`

O servidor ficará disponível em `http://localhost:3000`. O ficheiro da base de dados local (`database.sqlite`) será gerado automaticamente no primeiro arranque.

**Endpoints da API**
* **POST /events**: Cria um novo evento. Requer `title`, `date` e `capacity` no corpo do pedido.
* **GET /events**: Lista todos os eventos disponíveis, incluindo a contagem de participantes já registados em cada um.
* **POST /events/:id/register**: Regista um participante num evento. Requer `participantName` e `email`. A API valida a disponibilidade de vagas e devolve o status 403 caso a lotação máxima tenha sido atingida.
