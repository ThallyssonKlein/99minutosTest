import bparser from 'body-parser';
import cors from 'cors';
import express from 'express';
import BTree, { findHeight, findNode, bfs } from './btree.js';
const port = 3000;

const app = express();
app.use(bparser.urlencoded({extended: true}));
app.use(bparser.json());
app.use(cors());

app.post("/v1/b-trees/height", (req, res) => {
    const body = req.body;
    try{
        if(!body || !body.toTree){
            throw new Error("Missing toTree property or body")
        }
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
        if(!body || !body.toTree){
            throw new Error("Missing toTree property or body")
        }
        if(!body.node){
            throw new Error("Missing node property");
        }
        const bTree = BTree(body.toTree);
        findNode(bTree, body.node, node => {
            res.json({
                neighbors : {
                    left : node.left.value,
                    right : node.right.value
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
        if(!body || !body.toTree){
            throw new Error("Missing toTree property or body")
        }
        const bTree = BTree(body.toTree);
        res.json({
            bfs : bfs(bTree)
        });
    }catch(e){
        res.status(400).json({
            message : "Bad request"
        });
    }
});

app.listen(port, `0.0.0.0`, () => {
    console.log(`Service initialized on port ${port}`);
});