var express = require('express')
const Docker = require('dockerode')
const cors = require('cors')
var app = express();
app.use(cors());

let options = {}

if (process.platform === 'win32') {
  options.socketPath = '//./pipe/docker_engine'
}

var docker = new Docker(options)

app.get('/api/stopcontainer', (req, res) => {
  var containerId = req.query.containerId;
  if (!containerId) {
    res.status(400)
      .json({
        error: 400,
        message: 'param "containerId" is required'
      });
    return;
  }

  docker.getContainer(containerId).stop(function (err, _) {
    if (err) {
      res.status(err.statusCode)
        .json({
          error: err.statusCode,
          message: err.reason
        })
    } else {
      res.json({
        code: 200,
        message: `Succefully stopped container ${containerId}`
      });
    }
  });

})

app.get('/api/listcontainers', (req, res) => {
  docker.listContainers(function (err, containers) {
    if (err) {
      res.sendStatus(400)
      res.json({
        error: 400,
        message: err
      })
    } else {
      if (containers) {
        res.json(containers);
      } else {
        res.json([]);
      }
    }
  });

})



app.listen(9000)
