import { Stack } from 'expo-router'

import { Guard } from '@gno/components/auth/guard'
import { GnoNativeProvider } from '@gnolang/gnonative'
import { ReduxProvider } from 'redux/redux-provider'
import { LinkingProvider } from '@gno/provider/linking-provider'
import { ThemeProvider } from 'gnokeymobile-ui'
import { DefaultTheme } from 'styled-components'

const gnoDefaultConfig = {
  // @ts-ignore
  remote: '', // It will be set dynamically from linking state
  // @ts-ignore
  chain_id: '' // It will be set dynamically from linking state
}

const theme: DefaultTheme = {
  borderRadius: 8,

  error: { background: '#FFE5E6', text: '#FA262A' },
  success: { background: '#E5F9E5', text: '#00A86B' },

  colors: {
    primary: '#007AFF',
    black: '#000000',
    white: '#ffffff',
    gray: '#A1A1A1',
    background: '#FDFDFD',
    backgroundSecondary: '#f8f8f8',
    border: '#D1D1D6', // Border, Ruller, Divider
    link: '#007AFF'
  },

  text: {
    textMuted: '#A1A1A1'
  },

  textinputs: {
    primary: {
      placeholder: {
        color: '#8D8D8D'
      }
    },
    secondary: {
      background: '#ffffff'
    },
    border: '#94A0AB',
    label: '#000000',
    background: '#EBEBEB',
    disabled: { background: '#EBEBEB' }
  },

  buttons: {
    primary: {
      background: '#FFFFFF',
      border: '#2E5034',
      label: '#2E5034'
    },
    secondary: {
      background: '#C8DBA8',
      border: '#2E5034',
      label: '#2E5034'
    },
    tertirary: '#4c8ae7',
    danger: '#FF4647',
    dangersecondary: '#E5E5E5',

    label: {
      primary: '#FFFFFF',
      secondary: '#007AFF',
      tertirary: '#000000',
      danger: '#ffffff',
      dangersecondary: '#FF4647'
    }
  }
}

export default function AppLayout() {
  return (
    <GnoNativeProvider config={gnoDefaultConfig}>
      <ReduxProvider>
        <LinkingProvider>
          <ThemeProvider theme={theme}>
            <Guard>
              <Stack
                screenOptions={{
                  headerShown: false,
                  headerLargeTitle: true,
                  headerBackVisible: false
                }}
              />
            </Guard>
          </ThemeProvider>
        </LinkingProvider>
      </ReduxProvider>
    </GnoNativeProvider>
  )
}
