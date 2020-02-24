const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");

const {createPost, infoPost, updatePost, deletePost} = require('./validations');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cors());
server.use(expressValidator());

const generateId = () => {
  return crypto.randomBytes(16).toString("hex");
};

server.post('/api/posts/create', (req, res) => {
  try {
    req.checkBody(createPost);
    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        resultCode: 0,
        resultData: null,
        errorMessage: 'Invalid parameter',
      });
    }
    const db = router.db;
    const table = db.get("Posts");
    req.body.id = generateId();
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    table.push(req.body).write();

    return res.jsonp({
      resultCode: 1,
      resultData: req.body,
      errorMessage: null,
    });
  } catch (err) {
    return res.jsonp({
      resultCode: 0,
      resultData: null,
      errorMessage: `Some error occurred: ${err}`,
    });
  }
});

server.get('/api/posts/list', (req, res) => {
  try {
    const db = router.db;
    const table = db.get("Posts");
    return res.jsonp({
      resultCode: 1,
      resultData: table.value(),
      errorMessage: null,
    });
  } catch (err) {
    return res.jsonp({
      resultCode: 0,
      resultData: null,
      errorMessage: `Some error occurred: ${err}`,
    });
  }
});

server.get('/api/posts/info', (req, res) => {
  try {
    req.checkQuery(infoPost);
    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        resultCode: 0,
        resultData: null,
        errorMessage: 'Invalid parameter',
      });
    }

    const db = router.db;
    const table = db.get("Posts");
    return res.jsonp({
      resultCode: 1,
      resultData: table.find({id: req.query.postId}).value(),
      errorMessage: null,
    });
  } catch (err) {
    return res.jsonp({
      resultCode: 0,
      resultData: null,
      errorMessage: `Some error occurred: ${err}`,
    });
  }
});

server.put('/api/posts/update', (req, res) => {
  try {
    req.checkBody(updatePost);
    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        resultCode: 0,
        resultData: null,
        errorMessage: 'Invalid parameter',
      });
    }

    const db = router.db;
    const table = db.get("Posts");
    table.find({ id: req.body.id })
      .assign({title: req.body.title, content: req.body.content, updatedAt: new Date()})
      .write();

    return res.jsonp({
      resultCode: 1,
      resultData: null,
      errorMessage: null,
    });
  } catch (err) {
    return res.jsonp({
      resultCode: 0,
      resultData: null,
      errorMessage: `Some error occurred: ${err}`,
    });
  }
});

server.delete('/api/posts/delete', (req, res) => {
  try {
    req.checkBody(deletePost);
    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        resultCode: 0,
        resultData: null,
        errorMessage: 'Invalid parameter',
      });
    }

    const db = router.db;
    const table = db.get("Posts");
    table.remove({ id: req.body.id })
      .write();

    return res.jsonp({
      resultCode: 1,
      resultData: null,
      errorMessage: null,
    });
  } catch (err) {
    return res.jsonp({
      resultCode: 0,
      resultData: null,
      errorMessage: `Some error occurred: ${err}`,
    });
  }
});

server.listen(8626, () => {
  console.log('JSON Server is running in port 8626')
});
