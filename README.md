<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Desafio 06: Banco de dados e upload de arquivos no Node.js
</h3>

# :rocket: Sobre o desafio

[Nesse desafio](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload), vou continuar desenvolvendo a aplicação de gestão de transações, treinando o que aprendi até agora no Node.js junto ao TypeScript, mas dessa vez incluindo o uso de banco de dados com o TypeORM e envio de arquivos com o Multer!

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

## Funções da aplicação

### Criar transação
 
|title|value|type|category|
| -------- | -------- | -------- | -------- |
|Bicicleta|1500.52|outcome|Esportes|

### Listar transações
 
Lista as transações e informa o balanço:

#### transactions

|title|value|type|category|
| -------- | -------- | -------- | -------- |
|Bicicleta|1500.52|outcome|Esportes|

#### balance

|income|outcome|total|
| -------- | -------- | -------- |
|3500|1500.52|1999,48|

### Importar

Importa arquivos do tipo CSV **[neste formato]**(link)

### Deletar

Deleta uma transação informando na URL o ID da mesma, como por exemplo:

`http://localhost:3333/transactions/id_da_transação`

## Imagens do Projeto

<img src="Link da Imagem"/>

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desafio proposto com 💜 by Rocketseat :wave: [Entre na comunidade!](https://discordapp.com/invite/gCRAFhc)
