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
  const { title, price, desc } = req.body;

  // add a new product inside my DB products and send back to the client the new created product

  const product = {
    id: Math.trunc(Math.random() * 1000) + '',
    title,
    price,
    desc,
  };

  products.push(product);

  res.status(201).send({ ok: true, data: product });
});

app.put('/products/:id', (req, res) => {
  // 1 - grab the id
  // 2 - find the corresponding product
  // 3 - update the product
  // 4 - send back the updated product

  const id = req.params.id;

  const product = products.find(product => product.id === id);

  if (!product) {
    return res.status(404).send({ ok: false, msg: 'Product not found' });
  }

  for (let key in req.body) {
    product[key] = req.body[key];
  }

  console.log(products);

  const updatedProduct = { ...product, ...req.body };

  res.send({ ok: true, data: updatedProduct });
});

app.delete('/products/:id', (req, res) => {
  // @TODO
  const id = req.params.id;

  const idx = products.findIndex(product => product.id === id);

  if (idx === -1) {
    return res.status(404).send({ ok: false, msg: 'Product not found' });
  }

  const [deletedProduct] = products.splice(idx, 1);

  res.send({ ok: true, data: deletedProduct });
});

app.listen(2000, () =>
  console.log('RDY to listen to incoming requests on port 2000')
);
