/**
 * block
 */
import { Hash } from './type';

export class Block {
	// cache hash value.
	private _hash: Hash = '';

	/**
	 * get block hash value.
	 */
	hash(): Hash {
		if (this._hash) return this._hash;
		return this._hash = '';
	}
}
