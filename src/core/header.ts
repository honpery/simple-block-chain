/**
 * header
 */
import { Hash } from './type';

export class Header {

	private _hash: Hash = '';

	/**
	 * get header hash value.
	 */
	hash(): Hash {
		if (this._hash) return this._hash;

		return this._hash = '';
	}
}
