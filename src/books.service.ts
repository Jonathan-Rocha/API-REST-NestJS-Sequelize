import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async listAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async getOne(id: number): Promise<Book> {
    return this.bookModel.findByPk(id);
  }

  async create(book: Book): Promise<void> {
    this.bookModel.create(book);
  }

  async update(book: Book): Promise<[number, Book[]]> {
    return this.bookModel.update(book, {
      returning: true,
      where: { id: book.id },
    });
  }

  async remove(id: number): Promise<void> {
    const book: Book = await this.getOne(id);
    book.destroy();
  }
}
