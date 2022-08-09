// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Controller('book')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async listAll(): Promise<Book[]> {
    return this.booksService.listAll();
  }
  @Get(':id')
  async getOne(@Param() params): Promise<Book> {
    return this.booksService.getOne(params.id);
  }
  @Post()
  async create(@Body() book: Book): Promise<void> {
    this.booksService.create(book);
  }
  @Put()
  async update(@Body() book: Book): Promise<[number, Book[]]> {
    return this.booksService.update(book);
  }
  @Delete(':id')
  async remove(@Param() params): Promise<void> {
    this.booksService.remove(params.id);
  }
}
