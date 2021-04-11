const fetch = require('node-fetch');
const oAuthController = {};

oAuthController.getCode = (req, res, next) => {
  // console.log(req.query.code);
  const parameters = {
    client_id: 'dfab52ce17c6d17d67cd',
    client_secret: '2b618c2b789b8bb1b39789f235eba2a018ea0d92',
    code: req.query.code,
  };

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify(parameters),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('access.token', data.access_token);
      // res.locals.userId = data.access_token;
      return next();
    })
    .catch((err) => null);
};

// dfab52ce17c6d17d67cd
// 2b618c2b789b8bb1b39789f235eba2a018ea0d92

module.exports = oAuthController;
// `https://github.com/login/oauth/access_token?client_id=dfab52ce17c6d17d67cd&client_secret=2b618c2b789b8bb1b39789f235eba2a018ea0d92&code=${req.query.code}`,
