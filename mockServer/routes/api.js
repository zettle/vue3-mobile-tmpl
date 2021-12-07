const router = require('koa-router')();

router.prefix('/api');

router.get('/hhhh', function (ctx, next) {
  throw new Error('hhhh');
});

router.all('/bar', function (ctx, next) {
  ctx.body = {
    code: 0,
    message: '成功',
    data: {
      name: 'xiaoming',
      age: 23
    }
  };
});

router.all('/fail', function (ctx, next) {
  ctx.body = {
    code: 1111,
    message: '成功',
    data: {
      name: 'xiaoming',
      age: 23
    }
  };
});

module.exports = router;
