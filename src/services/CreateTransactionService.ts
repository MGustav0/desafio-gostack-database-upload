import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    /** Cria um repositório padrão a partir da model Category */
    const categoryRepository = getRepository(Category);

    /** Verificar se há saldo suficiente para a transação */
    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance.');
    }

    /** Procurando a categforia pelo tipo no banco de dados
     * Cria-se como "let" porque vai ser sobrescrita no "if" logo a baixo
     */
    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    /** Cria uma nova categoria, caso não haja uma */
    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
