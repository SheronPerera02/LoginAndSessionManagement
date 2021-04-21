const connection = require('../db/DBConnection');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const SignUp = (req, res) => {

  bcrypt.hash(req.body.password.toString(), saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({ message: 'Error Occured:1.1' });
    } else {
      connection.query(
        'SELECT id FROM User WHERE username=?',
        [req.body.username],
        (error, results, fields) => {
          if (error) {
            res.status(500).json({ message: 'Error Occured:1.2' });
          } else if (results[0]) {
            res.status(400).json({ message: 'Username already exists' });
          } else {
            getNextId(res, (id) => {
              connection.query(
                'INSERT INTO User VALUES(?,?,?)',
                [id, req.body.username, hash],
                (error, results, fields) => {
                  if (error) {
                    res.status(500).json({ message: 'Error Occured:1.4' });
                  } else {
                    res.status(200).json({ message: 'Success' });
                  }
                }
              );
            });
          }
        }
      );
    }
  });
};

const getNextId = (res, callback) => {
  connection.query(
    'SELECT id FROM User ORDER BY id DESC LIMIT 1',
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: 'Error Occured:1.3' });
      } else {
        if (!results[0]) {
          callback('U1');
        } else {
          callback('U' + (Number.parseInt(results[0].id.split('U')[1]) + 1));
        }
      }
    }
  );
};

const SignIn = (req, res) => {
  connection.query(
    'SELECT * FROM User WHERE username=?',
    [req.body.username],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: 'Error Occured:2.1' });
      } else if (!results[0]) {
        res.status(400).json({ message: 'Invalid Credentials' });
      } else {
        bcrypt.compare(
          req.body.password,
          results[0].password,
          function (err, result) {
            if (err) {
              res.status(500).json({ message: 'Error Occured:2.2' });
            } else if (!result) {
              res.status(400).json({ message: 'Invalid Credentials' });
            } else {
              jwt.sign({ user: results[0] }, '1234', (err, token) => {
                if (err) {
                  res.status(500).json({ message: 'Error Occured:2.3' });
                } else {
                  res.status(200).json({ message: 'Success', token });
                }
              });
            }
          }
        );
      }
    }
  );
};



module.exports = {
  SignUp,
  SignIn,

};
