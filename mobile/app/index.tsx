import { Image, View } from 'react-native'
import {
  clearLinking,
  loggedIn,
  requestLoginForGnokeyMobile,
  selectAccount,
  selectBech32AddressSelected,
  selectLoginLoading,
  selectRemoteURL,
  useAppDispatch,
  useAppSelector
} from '@gno/redux'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Button, Text, Ruller, HomeLayout, Spacer } from 'gnokeymobile-ui'

export default function Root() {
  const dispatch = useAppDispatch()
  const route = useRouter()
  const bech32AddressSelected = useAppSelector(selectBech32AddressSelected)
  const remoteURL = useAppSelector(selectRemoteURL)
  const account = useAppSelector(selectAccount)
  const loading = useAppSelector(selectLoginLoading)

  useEffect(() => {
    if (loading || !bech32AddressSelected || !remoteURL) return
    console.log('bech32AddressSelected on index', bech32AddressSelected)

    dispatch(loggedIn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bech32AddressSelected])

  useEffect(() => {
    if (loading) return
    if (account) {
      dispatch(clearLinking())
      route.replace('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const signinUsingGnokey = async () => {
    await dispatch(requestLoginForGnokeyMobile()).unwrap()
  }

  return (
    <HomeLayout
      header={null}
      footer={
        <View style={{ gap: 8, width: '100%', alignItems: 'center', marginBottom: 32 }}>
          <Text.Title2>Sign in using Gnokey Mobile:</Text.Title2>
          <Spacer space={8} />
          <Button onPress={signinUsingGnokey}>Sign in</Button>
          <View style={{ height: 16, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
            <Ruller style={{ flex: 1, width: 'auto' }} />
            <Text.Caption2 style={{ marginHorizontal: 8 }}>or</Text.Caption2>
            <Ruller style={{ flex: 1, width: 'auto' }} />
          </View>
          <Button onPress={signinUsingGnokey} color="secondary">
            Browse as Guest
          </Button>
        </View>
      }
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Image
          source={require('@assets/images/ios/AppIcon~ios-marketing.png')}
          style={{ width: 120, height: 120, borderRadius: 16, resizeMode: 'contain' }}
        />
        <View style={{ gap: 8, alignItems: 'center' }}>
          <Text.LargeTitle>Boards2</Text.LargeTitle>
          <View style={{ gap: 4, alignItems: 'center' }}>
            <Text.Body>Decentralized Boards on Gno.land</Text.Body>
            <Text.Body>Powered by GnoNative</Text.Body>
          </View>
        </View>
      </View>
    </HomeLayout>
  )
}
