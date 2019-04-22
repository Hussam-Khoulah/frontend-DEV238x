import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getRandomItems(inputArray, count) {
    const copyInput = [];
    copyInput.push(...inputArray);
    const outputArray = [];

    if (copyInput.length) {
      for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * copyInput.length);
        outputArray.push(copyInput[index]);
        copyInput.splice(index, 1);
      }
    }
    return outputArray;
  }
}
