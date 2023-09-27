import { Component } from '@angular/core';
// import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})

export class PasswordGeneratorComponent {
  // This password property holds the generated password. It is initialized as an empty string
 password: string = '';

 // This length property determines the length of the generated password. It is initialized with a default length of 8 characters
 length: number = 8;

 //These property is a flag indicating whether to include letters, Numbers, Symbols in the generated password. It is initially set to false.
 includeLetters: boolean = true;
 includeNumbers: boolean = true;
 includeSymbols: boolean = true;
 excludeSimilarCharacters: boolean = false;
 excludeAmbiguousCharacters: boolean = false;
 excludeRepeatingCharacters: boolean = false;
 excludeSequentialCharacters: boolean = false;

 numberOfPasswords: number = 1;
 generatedPasswords: string[] = [];

 // This method is responsible for generating the password based on the specified criteria. It performs the following steps:
generatePassword(){

  // It defines three strings letters, numbers, and symbols containing sets of characters.
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const Numbers = '0123456789';
  const Symbols = '!@#$%^&*()_+-={}[]|:;"<>,.?/';
  

  // It initializes an empty string validChars.
  let validChars = '';

   // If includeLetters, includeNumbers, or includeSymbols are true, it appends the corresponding character set to validChars.
  if(this.includeLetters){
    validChars = validChars + letters;
  }

  if(this.includeNumbers){
    validChars = validChars + Numbers;
  }

  if(this.includeSymbols){
    validChars = validChars + Symbols;
  }

  if (this.excludeSimilarCharacters) {
    validChars = validChars.replace(/[il1Lo0O]/g, '');
  }

  if (this.excludeAmbiguousCharacters) {
    validChars = validChars.replace(/[{}[]()<>|\/\\:;"',.?~`]/g, '');
  }

  // It initializes an empty string generatedPassword
  let generatedPassword = '';

  // It iterates length times and, in each iteration, generates a random index within the range of validChars using Math.random()
  let i;
  for (i=0; i<this.length; i++){
    let randomIndex = Math.floor(Math.random() * validChars.length);
    let randomChar = validChars[randomIndex];

    if (this.excludeRepeatingCharacters) {
      while (generatedPassword.endsWith(randomChar)) {
        randomIndex = Math.floor(Math.random() * validChars.length);
        randomChar = validChars[randomIndex];
      }
    }

    if (this.excludeSequentialCharacters && i > 0) {
      const lastChar = generatedPassword[i - 1];
      const lastCharCode = lastChar.charCodeAt(0);
      const currentCharCode = randomChar.charCodeAt(0);

      if (currentCharCode - lastCharCode === 1) {
        randomIndex = Math.floor(Math.random() * validChars.length);
        randomChar = validChars[randomIndex];
      }
    }

    // It appends the character at the random index in validChars to generatedPassword
    generatedPassword = generatedPassword + randomChar;
  }

  // Finally, it assigns the generated password to the password property.
  this.password = generatedPassword;
}

excludeSimilarChars(chars: string): string {
  return chars.replace(/[il1Lo0O]/g, '');
}

excludeAmbiguousChars(chars: string): string {
  return chars.replace(/[{}[]()<>|\/\\:;"',.?~`]/g, '');
}


}
