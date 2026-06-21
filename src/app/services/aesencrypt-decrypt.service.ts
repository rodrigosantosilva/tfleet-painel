import { Injectable } from '@angular/core';
//import * as CryptoJS from 'crypto-js';
import { AES, Utf8 } from "crypto-es";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptService {

  secretKey = environment.decryptCode;
  constructor() { }

  /*ncrypt(value: string): string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string): any{
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }*/

  encrypt(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    return AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string | null | undefined): string {
    if (!textToDecrypt) {
      return '';
    }
    try {
      return AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(Utf8);
    } catch {
      // se não conseguir decriptar, retorna vazio
      return '';
    }
  }
}

