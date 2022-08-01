import Node from './Node.js';

export default class HuffmanEncode {
    private input: Array<string> = [];
    private tree: Array<Node> = [];
    private codeTable: { [key: string]: any; } = {};
    private hash: { [key: string]: any; } = {};

    constructor(input: string) {
        this.input = input.split("");

        this.hash = this.getFrequency(this.input);
        this.tree = this.initTree(this.tree);
        this.tree = this.generateTree(this.tree);

        // Start the tree traversal from the first node
        this.traverseTree(this.tree[0]!, '');
    }

    // Get the frequence of each character in the input and create a table mapping each character to the
    // number of times it appears in the input
    private getFrequency(input: Array<string>) {
        const hash: { [key: string]: unknown; } = {};
        input.forEach((s: string) => { hash[s] = ~~hash[s] + 1 });
        return hash;
    }

    // Initialise the tree with the frequency hash
    private initTree(tree: Array<Node>) {
        for (const char in this.hash) {
            tree.push(new Node(this.hash[char], char));
        }
        return tree;
    }

    // Generate the final tree
    private generateTree(tree: Array<Node>) {
        // Sort the tree numerically by the frequency of the values
        tree.sort((a: Node, b: Node) => { return a.value - b.value });

        while (tree.length > 1) {
            // Combine the two lowest occuring values together and push the leafs we combined as left and right
            if (tree !== undefined)
                tree.push(new Node(tree[0]!.value + tree[1]!.value, tree[0]!.char + tree[1]!.char, tree[0], tree[1]));

            // Lets remove the two smallest leafs, they should always be at the front as we sort the tree
            tree = tree.slice(2);
        }
        return tree;
    }

    // Traverse the tree and generate the codes for each node
    private traverseTree(node: Node, currPath: string) {
        const leftNode: Node = node.left;
        const rightNode: Node = node.right;

        // We don't have any children
        if (!leftNode && !rightNode) return;

        // If we have a left node and that node doesn't have any children, we heve reached the end.
        if (leftNode && !leftNode.left && !leftNode.right)
            this.codeTable[leftNode.char] = currPath + 0;

        // If we have a right node and that node doesn't have any children, we heve reached the end.
        if (rightNode && !rightNode.left && !rightNode.right)
            this.codeTable[rightNode.char] = currPath + 1;

        // We have a left node and it does have a left node, traverse that left node recursively
        if (leftNode)
            this.traverseTree(leftNode, currPath + 0);

        // We have a right node and it does have a left node, traverse that left node recursively
        if (rightNode)
            this.traverseTree(rightNode, currPath + 1);
    }

    // Return the final generated codes
    get codes() {
        return this.codeTable;
    }

    // Return the final result which is the input converted to our codes
    get result() {
        let result = '';
        // Map the input char to the generated codes and return the whole string
        this.input.forEach((s: string) => result += this.codes[s]);
        return result;
    }
}
