const express = require('express');

const app = express();
app.use(express.json());

// [GET / products][GET / products / id][POST / products][PUT / products / id][ // axios.get('/products') // axios.get('/products/id') // axios.post('/products') // axios.put('/products/id')
//   DELETE / products / id
// ]; //axios.delete('/products/id)

const products = [];

app.get('/products', (req, res) => {
  res.send({
    ok: true,
    data: products,
  });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id === req.params.id);

  if (product) {
    return res.send({
      ok: true,
      data: product,
    });
  }

  res.status(404).send({ ok: false, msg: 'Product not found' });
});

app.post('/products', (req, res) => {
  console.log(req.body);

  // add a new product inside my DB products and send back to the client the new created product

  res.send('ok');
});

app.put('/products/:id', (req, res) => {
  // 1 - grab the id
  // 2 - find the corresponding product
  // 3 - update the product
  // 4 - send back the updated product
});

app.delete('/products/:id', (req, res) => {});

app.listen(2000, () =>
  console.log('RDY to listen to incoming requests on port 2000')
);
