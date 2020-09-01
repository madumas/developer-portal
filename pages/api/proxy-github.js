import { apiProxy } from 'next-tinacms-github';

export default (req, res) => {
  const net = apiProxy(process.env.SIGNING_KEY);
  net(req, res);
  res.end();
};
