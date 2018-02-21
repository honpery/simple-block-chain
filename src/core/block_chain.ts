/**
 * block chain.
 */
import { Block } from './block';
import { HeaderChain } from './header_chain';
import { Hash } from './type';

export class BlockChain {

	headerChain: HeaderChain;

	private _current?: Block;

	private _chain: {[hash in Hash]: { block: Block, index: number }} = {};

	private _cache: {[hash in Hash]: { block: Block, index: number }} = {};

	constructor(genesisBlock: Block) {
		this.insertBlock(genesisBlock);
		this.headerChain = new HeaderChain();
	}

	/**
	 * get block by block number.
	 *
	 * @param num int block number
	 *
	 */
	getBlockByNumber(num: number) {
		if (num < 0) throw new Error('error num of block');

		if (!this._cache[num]) {
			Object.values(this._chain).forEach(item => {
				if (item.index === num) this._cache[num] = item;
			});
		}

		return this._cache[num].block || null;

	}

	/**
	 * get block by block hash.
	 *
	 * @param hash Hash block hash value.
	 */
	getBlockByHash(hash: Hash) {
		return this._chain[hash].block || null;
	}

	/**
	 * get block number by hash value.
	 *
	 * @param hash Hash block hash value.
	 *
	 */
	getBlockNumberByHash(hash: Hash) {
		return (this._chain[hash] || -1) && this._chain[hash].index;
	}

	/**
	 * get current block.
	 */
	getCurrent() {
		return this._current;
	}

	/**
	 * insert new block into chain
	 *
	 * @param block Block block object.
	 *
	 */
	insertBlock(block: Block) {
		if (!this._current) {
			// genesis block.
			this._chain = { [block.hash()]: { block, index: 0 } };
		} else {
			const _index = this.getBlockNumberByHash(this._current.hash());
			if (_index < 0) return null;
			this._chain[block.hash()] = { block, index: _index + 1 };
		}

		return this._chain[block.hash()].block;
	}
}
