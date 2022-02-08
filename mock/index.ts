import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import path from 'path';
import fs from 'fs';
import { getPostData } from './utils';

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      console.log('query', query);
      return {
        code: 0,
        data: {
          name: 'vben',
        },
      };
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: Random.cname(),
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
  {
    url: '/api/download',
    method: 'post',
    rawResponse: async (req, res) => {
      const reqbody: any = await getPostData(req);
      console.log('reqbody', reqbody);

      const filePath = resolve(`./img/example.png`);
      const fileStream = fs.createReadStream(filePath);
      const size = fs.statSync(filePath).size;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment;filename=picture.png`);
      res.setHeader('Content-Length', size);
      fileStream.on('data', function (data) {
        res.write(data, 'binary');
      });
      fileStream.on('end', function () {
        res.end();
      });
    },
  },
] as MockMethod[];
