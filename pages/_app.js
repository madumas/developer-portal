import App from 'next/app';
import { TinaCMS, TinaProvider } from 'tinacms';
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'theme-ui';
import ThemeUIPrism from '@theme-ui/prism';
import PrismCore from 'prismjs/components/prism-core';
import { fetchAllContent } from '../lib/api';
import MakerProvider from '../providers/MakerProvider';
import ResourceProvider from '../providers/ResourceProvider';
import theme from '../theme';

//TinaCMS edit button
export const EditLink = ({ cms }) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
};

const components = {
  pre: ({ children }) => <>{children}</>,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
};

const MyApp = ({ Component, pageProps, content }) => {
  const { query } = useRouter();
  const [network, setNetwork] = useState();
  // const queryParams = network ? { network } : {};

  useEffect(() => {
    setNetwork(query.network);
  }, [query.network]);

  //TinaCMS Github login
  const onLogin = async () => {
    const token = localStorage.getItem('tinacms-github-token') || null;
    const headers = new Headers();

    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }

    const resp = await fetch('/api/preview', { headers: headers });
    const data = await resp.json();

    if (resp.status == 200) window.location.href = window.location.pathname;
    else throw new Error(data.message);
  };

  const onLogout = () => {
    return fetch('/api/reset-preview').then(() => {
      window.location.reload();
    });
  };

  const tinaConfig = {
    enabled: !!pageProps.preview,
    apis: {
      github: new GithubClient({
        proxy: '/api/proxy-github',
        authCallbackRoute: '/api/create-github-access-token',
        clientId: process.env.GITHUB_CLIENT_ID,
        baseRepoFullName: process.env.REPO_FULL_NAME,
        authScope: 'repo', // for private repos, normally defaults to 'public_repo'
        baseBranch: process.env.BASE_BRANCH,
      }),
    },
    sidebar: pageProps.preview,
    toolbar: pageProps.preview,
  };

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [tinaConfig]);

  return (
    <ThemeProvider theme={theme} components={components}>
      <TinaProvider cms={cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >
          <MakerProvider network={network}>
            <ResourceProvider resources={content}>
              <EditLink cms={cms} />
              <Component {...pageProps} />
            </ResourceProvider>
          </MakerProvider>
        </TinacmsGithubProvider>
      </TinaProvider>
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const content = fetchAllContent();

  return { ...appProps, content };
};

export default MyApp;
