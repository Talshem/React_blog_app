const { Router } = require('express');
const router = Router();
const fs = require('fs');

const file = fs.readFileSync('./comments.json');
const comments = JSON.parse(file);


router.get('/get', async (req, res) => {
try {
res.send(comments)
  } catch (err) { res.json(err)}
})

router.post('/post', async (req, res) => {
try {
comments.push(req.body)
res.send(req.body)
} catch (err) { res.json(err)}
})


module.exports = router
