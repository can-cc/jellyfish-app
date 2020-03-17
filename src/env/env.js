
// TODO just read env
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./env.prod');
} else {
  module.exports = require('./env.dev');
}
