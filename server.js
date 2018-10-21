require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Poll = require('./models/poll');
const port = process.env.PORT || 8080;
const router= express.Router();
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use((req, res, next) => {
  console.log('Something is happening');
  next();
});

router.get('/', (req, res) => {
  res.json({message: 'Welcome to our API!'});
});

router.route('/polls')
  // Create new poll
  .post((req, res) => {
    const poll = new Poll();
    poll.title = req.body.title;

    poll.save((err) => {
      if (err) res.send(err);
      res.json({message: 'Poll created!'});
    });
  })
  // Get all polls
  .get((req, res) => {
    Poll.find((err, polls) => {
      if (err) res.send(err);
      res.json(polls);
    });
  });

router.route('/polls/:poll_id')
  .get((req, res) => {
    Poll.findById(req.params.poll_id, (err, poll) => {
      if (err) res.send(err);
      res.json(poll);
    });
  })
  .put((req, res) => {
    Poll.findById(req.params.poll_id, (err, poll) => {
      if (err) res.send(err);
      // Update title
      poll.title = req.body.title;
      poll.save((err, updatedPoll) => {
        res.json({message: 'Poll title updated'});
      });
    });
  })
  .delete((req, res) => {
    Poll.remove({_id: req.params.poll_id}, (err, poll) => {
      if (err) res.send(err);
      res.json({message: 'Successfully deleted!'});
    })
  });

app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);