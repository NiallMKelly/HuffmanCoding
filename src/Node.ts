export default class Node {
    public value: number;
    public char: string;
    public left: Node;
    public right: Node;

    constructor(value: number, char: string, left?: Node, right?: Node) {
        this.value = value;
        this.char = char;
        this.left = left!;
        this.right = right!;
    }
}
