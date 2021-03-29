const { NODE_ENV } = require('../../config/environments');

function cacheResponse(res, seconds) {
  if (NODE_ENV !== 'development') {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;
