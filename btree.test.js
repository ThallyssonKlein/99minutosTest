import BTree, { findHeight, findNode, bfs } from "./btree.js";

describe("Testing insertNode", _ => {
    it("should insert the correct node in left and the correct node in right", done => {
        const root = BTree([2, 7, 5, 9, 6, 4, 1]);
        expect(root.left.value).toEqual(1);
        expect(root.right.value).toEqual(7);
        done();
    });
});

describe("Testing findHeight", _ => {
    it("should find the height", done => {
        const root = BTree([2, 7, 5, 9, 6, 4, 1]);
        expect(findHeight(root)).toEqual(4);
        done();
    });
});

describe("Testing findNode", _ => {
    it("should find the node", done => {
        const root = BTree([2, 7, 5, 9, 6, 4, 1]);
        findNode(root, 7, node => {
            expect(node.left.value).toEqual(5);
            expect(node.right.value).toEqual(9);
            done();
        });
    });
});

describe("Testing bfs", _ => {
    it("should get bfs", done => {
        const root = BTree([2, 7, 5, 9, 6, 4, 1]);
        expect(bfs(root)).toEqual([2,1,7,5,9,4,6]);
        done();
    });
});