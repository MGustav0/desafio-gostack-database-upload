import { getCustomRepository, getRepository, In } from 'typeorm';
import csvParse from 'csv-parse';
import fileSystem from 'fs';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  // Recuperar o arquivo através do método execute na variável filePath
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    /** Cria um stream que lê os arquivos através do fileSystem recebidos no filePath */
    const filesReadStream = fileSystem.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2, // Inicia a leitura na linha 2
    });

    /** pipe = lê cada uma das linhas do arquivo CSV */
    const parseCSV = filesReadStream.pipe(parsers);

    /** Realiza operações BookedIn no BD, aumenta a agilidade e diminui o número
     * de conexões ao BD
     */
    const transactions: Request[] = [];
    const categories: string[] = [];

    /** Recebe os dados (evento) e linha por linha desestrutura com base na tabela
     * "transactions"
     * Em cada linha ele vai apagar os espaços vazios (trim) no que será desestruturado e
     * mapeia
     */
    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      /** Verifica se os dados recebidos e desestruturados estão corretos */
      if (!title || !type || !value) return;

      /** Recupera as respectivas informações e repassa aos arrays de transactions e
       * categories acima.
       * Está dividido em duas porque são duas tabelas separadas no BD
       */
      categories.push(category);

      transactions.push({ title, type, value, category });
    });

    /** Verifica se o "parseCSV" emitiu o evento "end" e em caso positivo, retorna o parse
     * completo
     */
    await new Promise(resolve => parseCSV.on('end', resolve));

    /** Mapear as categorias do BD para verificar se existem através do método
     * "In" do TypeORM
     */
    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories),
      },
    });

    /** Filtra para receber apenas o título da categoria */
    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title,
    );

    /** Verifica se a categoria existe, se não existir, insere no BD.
     * O "self" é o prórpio array de categorias, ele o mapeia buscando um "index"
     * onde um "value" seja igual à este index e o retira pelo "filter"
     */
    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    /** Mapeia cada título do array em forma de objetos separados */
    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({ title })),
    );

    /** Insere as novas categorias no BD */
    await categoriesRepository.save(newCategories);

    /**  Obtém as categoorias do arquivo e as do BD */
    const allCategories = [...newCategories, ...existentCategories];

    /** Mapeia as transações em forma de objetos e salva na variável.
     * "find" - Mapeia todas as categorias, buscando uma categoria com o mesmo título,
     * assim quando "allCategories" tiver o mesmo título das transações enviadas
     * pelo arquivo será enviado para o "fileTransactions".
     */
    const fileTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: allCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    /** Insere as novas transações no BD */
    await transactionsRepository.save(fileTransactions);

    /** Apaga o arquivo do disco */
    await fileSystem.promises.unlink(filePath);

    return fileTransactions;
  }
}

export default ImportTransactionsService;
