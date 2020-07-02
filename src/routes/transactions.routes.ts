import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

/** A rota deve receber title, value, type, e category dentro do corpo da requisição,
 * sendo o type o tipo da transação, que deve ser income para entradas (depósitos) e
 * outcome para saídas (retiradas). Ao cadastrar uma nova transação, ela deve ser armazenada
 * dentro do seu banco de dados, possuindo os campos id, title, value, type, category_id,
 * created_at, updated_at */

transactionsRouter.get('/', async (request, response) => {
  const { tittle, value, type, category } = request.body;
});

transactionsRouter.post('/', async (request, response) => {
  // TODO
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
