import bparser from 'body-parser';
import cors from 'cors';
import express from 'express';
import BTree, { findHeight, findNode, traverse } from './btree.js';
const port = 3000;

const app = express();
app.use(bparser.urlencoded({extended: true}));
app.use(bparser.json());
app.use(cors());

app.post("/v1/b-trees/height", (req, res) => {
    const body = req.body;
    try{
        const bTree = BTree(body.toTree);
        res.json({
            height : findHeight(bTree)
        })
    }catch(e){
        res.status(400).json({
            message : "Bad request"
        });
    }
});

app.post("/v1/b-trees/neighbors", (req, res) => {
    const body = req.body;
    try{
        const bTree = BTree(body.toTree);
        findNode(bTree, body.node, node => {
            res.json({
                neighbors : {
                    left : node.left,
                    right : node.right
                }
            })
        });
    }catch(e){
        res.status(400).json({
            message : "Bad request"
        });
    }
});

app.post("/v1/b-trees/bfs", (req, res) => {
    const body = req.body;
    try{
        const bTree = BTree(body.toTree);
        traverse(bTree, node => {
            console.log(node.value);
        });
        res.send();
    }catch(e){
        res.status(400).json({
            message : "Bad request"
        });
    }
});

app.listen(port, `0.0.0.0`, () => {
    console.log(`Service initialized on port ${port}`);
});