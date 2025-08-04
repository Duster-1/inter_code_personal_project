import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  private readonly testData = [
    { id: 1, name: 'Vova' },
    { id: 2, name: 'Artem' },
    { id: 2, name: 'Katya' },
  ];

  findAll() {
    return this.testData;
  }
}
