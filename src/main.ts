import HuffmanEncode from './HuffmanEncode.js';
import HuffmanDecode from './HuffmanDecode.js';

const input = "A_DEAD_DAD_CEDED_A_BAD_BABE_A_BEADED_ABACA_BED";

console.log(`Input: ${input}`);

const huffEncode: HuffmanEncode = new HuffmanEncode(input);

console.log(`Output: ${huffEncode.result}`);

const huffDecode: HuffmanDecode = new HuffmanDecode(huffEncode.result, huffEncode.codes);
console.log(`Decoded: ${huffDecode.result}`);