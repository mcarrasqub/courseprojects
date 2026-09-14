import { BookService } from '@/services/BookService.js';

export class OtherService {
  public static getUniqueBookCategories(): string[] {
    const books = BookService.getBooks();
    const categories = books.map((book) => book.category);
    const uniqueCategories = new Set(categories);

    return Array.from(uniqueCategories);
  }

  public static formatToCOP(price: number): string {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(price).replace(/^\s*\$\s?/, '');
  }
}

export default OtherService;
