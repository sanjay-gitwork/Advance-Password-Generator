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

  // This length property determines the length of the generated password. It is initialized with a default length of 5 characters
  length: number = 5;

  //These property is a flag indicating whether to include letters, Numbers, Symbols in the generated password. It is initially set to false.
  includeLetters: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;
  excludeSimilarCharacters: boolean = true;
  excludeAmbiguousCharacters: boolean = true;
  excludeRepeatingCharacters: boolean = false;
  excludeSequentialCharacters: boolean = false;
  // encryptionKey: string = '';
  numberOfPasswords: number = 1;
  generatedPasswords: string[] = [];
  excludeCustomCharacters: string = '';
  savePasswordsLocally: boolean = false;
  savedPasswords: string[] = [];
  passwordStrength: string = '';

  // This method is responsible for generating multiple password at once based on the specified criteria. It performs the following steps:
  generatePasswords() {
    this.generatedPasswords = [];

    for (let i = 0; i < this.numberOfPasswords; i++) {
      const generatedPassword = this.generatePassword();
      this.generatedPasswords.push(generatedPassword);
      this.checkPasswordStrength(generatedPassword); // Add this line to check password strength
    }

    if (this.savePasswordsLocally) {
      this.savePasswordsToLocalStorage();
    }
  }

  // This method is responsible for generating the password based on the specified criteria. It performs the following steps:
  generatePassword(): string {
    // It defines three strings letters, numbers, and symbols containing sets of characters.
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-={}[]|:;"<>,.?/';

    // It initializes an empty string validChars.
    let validChars = '';

    // If includeLetters, includeNumbers, or includeSymbols are true, it appends the corresponding character set to validChars.
    if (this.includeLetters) {
      validChars += letters;
    }
    if (this.includeNumbers) {
      validChars += numbers;
    }
    if (this.includeSymbols) {
      validChars += symbols;
    }
    validChars += this.excludeCustomCharacters;

    if (this.excludeSimilarCharacters) {
      validChars = this.excludeSimilarChars(validChars);
    }

    if (this.excludeAmbiguousCharacters) {
      validChars = this.excludeAmbiguousChars(validChars);
    }

    // It initializes an empty string generatedPassword
    let generatedPassword = '';

    // It iterates length times and, in each iteration, generates a random index within the range of validChars using Math.random()
    for (let i = 0; i < this.length; i++) {
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
      generatedPassword += randomChar;
    }

    // if (this.encryptionKey) {
    //   const encryptedPassword = AES.encrypt(generatedPassword, this.encryptionKey).toString();
    //   return encryptedPassword;
    // } else {
    //   return generatedPassword;
    // }

    return generatedPassword;
  }

  excludeSimilarChars(chars: string): string {
    return chars.replace(/[il1Lo0O]/g, '');
  }

  excludeAmbiguousChars(chars: string): string {
    return chars.replace(/[{}[]()<>|\/\\:;"',.?~`]/g, '');
  }

  // This method is responsible for copying the generated password when the button clicked:
  copyPasswordToClipboard(password: string) {
    const tempInput = document.createElement('input');
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  // This method is responsible for downloading the generated password in .txt file
  downloadPasswords() {
    const filename = 'generated_passwords.txt';
    const content = this.generatedPasswords.join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // This method is responsible for saving the generated password in local storage
  savePasswordsToLocalStorage() {
    const passwords = localStorage.getItem('generatedPasswords') || '';
    const updatedPasswords = passwords ? passwords + '\n' + this.generatedPasswords.join('\n') : this.generatedPasswords.join('\n');
    localStorage.setItem('generatedPasswords', updatedPasswords);
    this.savedPasswords = this.savedPasswords.concat(this.generatedPasswords);
  }

  // This method is responsible for Clearing the generated password from local storage
  clearGeneratedPasswords() {
    this.generatedPasswords = [];
    localStorage.removeItem('generatedPasswords');
  }

  loadSavedPasswords() {
    const savedPasswords = localStorage.getItem('generatedPasswords') || '';
    this.savedPasswords = savedPasswords.split('\n');
  }

  clearSavedPasswords() {
    this.savedPasswords = [];
    localStorage.removeItem('generatedPasswords');
  }

  // This method is used for deleting the password saved in the local storage
  deleteSavedPassword(index: number) {
    this.savedPasswords.splice(index, 1);
    const updatedPasswords = this.savedPasswords.join('\n');
    localStorage.setItem('generatedPasswords', updatedPasswords);
  }

  // This method is used for checking the generated password based on the password length strength, complexity strength and overall strength
  checkPasswordStrength(password: string) {
    const lengthStrength = this.checkPasswordLengthStrength(password);
    const complexityStrength = this.checkPasswordComplexityStrength(password);
    const overallStrength = Math.round((lengthStrength + complexityStrength) / 2);
    this.passwordStrength = this.getStrengthLabel(overallStrength);
  }

  // This method is responsible for checking the password length strength 
  checkPasswordLengthStrength(password: string): number {
    const minLength = 5;
    const maxLength = 16;
    const length = password.length;

    if (length < minLength) {
      return 0;
    } else if (length > maxLength) {
      return 100;
    } else {
      return ((length - minLength) / (maxLength - minLength)) * 100;
    }
  }

  // This method is responsible for checking the password complexity strength 
  checkPasswordComplexityStrength(password: string): number {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (regex.test(password)) {
      return 100;
    } else {
      return 0;
    }
  }

  // This method is responsible for checking the password strength label and categorize them as 'Weak', 'Fair' , 'Strong' and 'Excellent' based on conditions
  getStrengthLabel(strength: number): string {
    if (strength <= 25) {
      return 'Weak';
    } else if (strength <= 50) {
      return 'Fair';
    } else if (strength <= 75) {
      return 'Strong';
    } else {
      return 'Excellent';
    }
  }

  
}
