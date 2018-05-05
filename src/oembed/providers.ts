import { Provider } from './types'

const providers: Provider[] = require('./providers.json')

const mappedProviders = providers.map(provider => {
  const url = new URL(provider.provider_url)
  return [url.host, provider] as [string, Provider]
})

let providersPromise = Promise.resolve(new Map(mappedProviders))

export function getProviders () {
  providersPromise = providersPromise
    || fetch('https://oembed.com/providers.json')
      .then(response => response.json())

  return providersPromise
}
