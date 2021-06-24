function Node(value) {
    this.value = value;
}

function insertNode(tree, value) {
    var node = tree, key;
    while (node.value !== value) {
         key = value < node.value ? 'left' : 'right';
         if (!node[key]) {
             node[key] = new Node(value);
             break;
         }
         node = node[key];
    }
    return tree;
}

export default function BTree(array){
    return array.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null)
}

export function findHeight(root){
    if(!root){
        return 0;
    }
    return Math.max(findHeight(root.left), findHeight(root.right)) + 1;
}

export function findNode(root, value, callback){
    if(root && root.value === value){
        callback(root);
    }else{
        root.left && findNode(root.left, value, callback);
        root.right && findNode(root.right, value, callback);
    }
}
