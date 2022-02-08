import { IncomingMessage } from 'http';

export function getPostData(req: IncomingMessage) {
  let reqbody = '';
  return new Promise((resolve) => {
    req.on('data', (chunk) => {
      reqbody += chunk;
    });

    req.on('end', () => {
      // console.log('reqbody', reqbody);
      if (reqbody) {
        try {
          resolve(JSON.parse(reqbody));
        } catch {
          resolve(reqbody);
        }
      } else {
        resolve(null);
      }
    });
  });
}
