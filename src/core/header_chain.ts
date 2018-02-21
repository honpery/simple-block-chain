/**
 * header chain.
 */
import { Header } from './header';
import { Hash } from './type';

export class HeaderChain {

	private _current?: Header;

	// header cache
	private _cache: { [num: number]: { header: Header, index: number } } = {};

	// header chain
	private _chain: {[hash in Hash]: { header: Header, index: number }} = {};

	constructor(genesisHeader: Header) {
		this.insertHeader(genesisHeader);
	}

	/**
	 * get header by number of index.
	 *
	 * @param num int index number
	 *
	 */
	getHeaderByNumber(num: number): Header {
		if (num < 0) throw new Error('error num of header');

		if (!this._cache[num]) {
			Object.values(this._chain).forEach(item => {
				if (item.index === num) this._cache[num] = item;
			});
		}

		return this._cache[num].header || null;
	}

	/**
	 * get header by hash.
	 *
	 * @param hash hash the header's hash value
	 *
	 */
	getHeaderByHash(hash: Hash) {
		return (this._chain[hash] || null) && this._chain[hash].header;
	}

	/**
	 * get header number by hash.
	 *
	 * @param hash hash the header's hash value
	 *
	 */
	getHeaderNumberByHash(hash: Hash) {
		return (this._chain[hash] || -1) && this._chain[hash].index;
	}

	/**
	 * get current header.
	 */
	getCurrentHeader() {
		return this._current;
	}

	/**
	 * insert header into header chain,
	 *
	 * @param header Header header data
	 *
	 */
	insertHeader(header: Header) {
		if (!this._current) {
			// Genesis header
			this._chain = { [header.hash()]: { header, index: 0 } };
		} else {
			const _index = this.getHeaderNumberByHash(this._current.hash());
			if (_index < 0) return null;
			this._chain[header.hash()] = { header, index: _index + 1 };
		}

		return this._current = this._chain[header.hash()].header;
	}
}
