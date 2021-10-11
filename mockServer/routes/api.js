const router = require('koa-router')();

router.prefix('/api');

router.get('/', function (ctx, next) {
  ctx.body = {
    code: 0,
    message: '成功',
    data: {
      name: 'xiaoming',
      age: 23
    }
  };
});

router.get('/bar', function (ctx, next) {
  ctx.body = {
    code: 0,
    message: '成功',
    data: {
      name: 'xiaoming',
      age: 23
    }
  };
});

module.exports = router;
