// src/app/words.ts
export class Words {
    constructor(
      public array: string[] = []
    ) {
      for (let i = 0; i < 10; i++) {
        array.push('');
      }
    }
  }