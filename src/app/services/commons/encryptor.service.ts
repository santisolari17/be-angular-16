import { Injectable } from '@angular/core';
import JSEncrypt from 'jsencrypt';

@Injectable({
	providedIn: 'root',
})
export class EncryptorService {
	public encryptor = new JSEncrypt({
		default_key_size: '3072',
		default_public_exponent: '010001',
		log: true,
	});

	/**
	 * The function sets the public key for encryption.
	 * @param {string} keyPublic - The parameter "keyPublic" is a string that represents the public key
	 * used for encryption.
	 */
	setPublicKey(keyPublic: string): void {
		this.encryptor.setPublicKey(keyPublic);
	}

	/**
	 * The function encrypts a given string of data using an encryptor and returns the encrypted data, or
	 * false if encryption fails.
	 * @param {string} data - The `data` parameter is a string that represents the data that needs to be
	 * encrypted.
	 * @returns either a string or false.
	 */
	encryptData(data: string): string | false {
		return this.encryptor.encrypt(data);
	}
}
