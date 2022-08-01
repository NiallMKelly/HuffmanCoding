export default class HuffManDecode {
    private input: Array<string>;
    private codes: { [key: string]: any; } = {};

    constructor(input: string, codes: object) {
        this.input = input.split("");
        this.codes = codes;
    }

    // Get the final decoded result using the codes table we passed in
    get result() {
        let result = '';
        let lookup = '';

        this.input.forEach((s: string) => {
            lookup += s;

            for (const i in this.codes) {
                if (lookup === this.codes[i]) {
                    result += i;
                    lookup = '';
                }
            }
        });

        return result;
    }
}