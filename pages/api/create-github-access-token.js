import { createAuthHandler } from 'next-tinacms-github';

export default (req, res) => {
  const net = createAuthHandler(
    process.env.GITHUB_CLIENT_ID,
    process.env.GITHUB_CLIENT_SECRET,
    process.env.SIGNING_KEY
  );
  net(req, res);
  res.end();
};
