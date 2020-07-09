<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 06: Banco de dados e upload de arquivos no Node.js
</h3>

# :rocket: Sobre o desafio

[Nesse desafio](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload), vou continuar desenvolvendo a aplicação de gestão de transações da aplicação GoFinances, treinando o que aprendi até agora no Node.js junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

Essa será uma aplicação que deve armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações, além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv.

**[Projeto do desafio anterior](https://github.com/MGustav0/desafio-gostack-fundamentos-node).**

## Status do Projeto

> Concluido :heavy_check_mark:

## Template da aplicação

O template original utilizado é o que a Rocketseat dispononibilizou na seguinte url: **[Acessar Template](https://github.com/Rocketseat/gostack-template-typeorm-upload)**

**Dica**: Caso não saiba utilizar repositórios do Github como template, temos um guia no **[FAQ](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/faq-desafios).**

## Como rodar a aplicação

Agora navegue até a pasta criada e abra no Visual Studio Code, lembre-se de executar o comando `yarn` no seu terminal para instalar todas as dependências.

Pronto! Agora basta acessar a aplicação à partir do link: http://localhost:3333/


## Iniciando/Configurando banco de dados

Ter Docker/PostgreSQL instalados.

### Instalar PostgreSQL via Docker

* `docker run --name postgresBankChallenge -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
* Verificar se a imagem está rodando: `docker ps`
* Usuário: postgres
* Senha: docker
* Acesso pelo terminal: `docker exec -it nome_do_container bash`

### Criar Banco de Dados

1. Instale o DBeaver, ou outro gerenciador de Banco de Dados, ou faça por linha de comando.
2. Acesse com o usuário e senha supracitados.
3. Crie um Banco de Dados com o nome __gostack_desafio06__.
4. Crie um Banco de Dados com o nome __gostack_desafio06_tests__.

## Como rodar os testes

```bash
yarn test
```

## Funções da aplicação

Resultados obtidos pelo [Insomnia](https://insomnia.rest/download/) um software para interação com o backend (API) via HTTP e JSON.

### Criar transação
 
<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_create.png"/>

### Listar transações
 
Lista as transações e informa o balanço:

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_list.png"/>

### Importar

Importa arquivos do tipo CSV **[neste formato]**(https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/file.csv):

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_import.png"/>

### Deletar

Deleta uma transação informando na URL o ID da mesma, como por exemplo: `http://localhost:3333/transactions/id_da_transação`, sem retornar nenhuma informação em JSON, apenas o código HTTP.

<img src="https://github.com/MGustav0/desafio-gostack-database-upload/blob/master/extras/prints/print_delete_error.png"/>

Erro gerado por ID de transação errado.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desafio proposto com 💜 by Rocketseat :wave: [Entre na comunidade!](https://discordapp.com/invite/gCRAFhc)
