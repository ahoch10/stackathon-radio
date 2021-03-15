const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// error handling endware
app.use((err, req, res, next) => {
     console.error(err)
     console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(3000, () =>
      console.log(`Mixing it up on port ${3000}`)
    )
  