import makerTheme from '@makerdao/dai-ui-theme-maker-neue';
import { icons as standardIcons } from '@makerdao/dai-ui-icons';
import { icons as brandIcons } from '@makerdao/dai-ui-icons-branding';

const icons = { ...standardIcons, ...brandIcons };

const theme = {
  ...makerTheme,
  icons,

  links: {
    ...makerTheme.links,
    sidebar: {
      variant: 'links.nav',
      fontSize: 1,
    },
  },
  styles: {
    ...makerTheme.styles,
    fakeLi: {
      listStyle: 'none',
    },

    h1: {
      ...makerTheme.styles.h1,
      mt: 4,
    },

    a: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        color: 'primaryEmphasis',
      },
    },
    ul: {
      pl: 4,
    },
    pre: {
      bg: 'background',
    },
    code: {
      ...makerTheme.styles.code,
      p: 0,
      m: 0,
    },
    // applies to single-backticks
    inlineCode: {
      fontFamily: 'monospace',
      fontSize: 3,
      bg: 'primaryMuted',
      color: 'primaryAlt',
      px: 1,
    },
  },
};

export default theme;
