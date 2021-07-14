const express = require('express')
const fetch = require('node-fetch')

const NodeCache = require('node-cache')
const { response } = require('express')

const myCache = new NodeCache({ stdTTL: 10 })

const app = express()
const port = 3000

const todosUrl = 'https://jsonplaceholder.typicode.com/todos'

app.get('/todos', (req, res) => {
  if(myCache.has("todos")){
    console.log("Getting it form cache")
    return res.send(myCache.get("todos"));
  }else{
  fetch(todosUrl)
    .then((response) => response.json())
    .then((json) => {
      myCache.set("todos", json);
      console.log("Getting it form API")
      res.send(json);
    })
  }
})

app.get('/stats', (req, res) => {
  res.send(myCache.getStats());
})

app.listen(port, () => {
  console.log('Example server is running at port ' + port)
})
