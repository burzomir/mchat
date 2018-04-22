import { getProviders } from './providers'
import { Oembed, Provider } from './types'
import { Maybe } from '../fp'

export function getOembed (url: string) {
  return getProviders()
    .then(getProvider(url))
    .then(fetchOembed(url))
    .then(extractSourceUrl)
}

function getProvider (url: string) {
  return (providers: Map<string, Provider>) => {
    const { host } = new URL(url)
    const provider = providers.get(host)
    return Promise.resolve(provider) || Promise.reject(undefined)
  }
}

function fetchOembed (url: string) {
  return (provider: Provider) => {
    const [endpoint] = provider.endpoints
    const oembedUrl = `${endpoint.url}?format=json&url=${encodeURIComponent(url)}`
    return fetch(oembedUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json() as Promise<Oembed>)
  }
}

function extractSourceUrl (oembed: Oembed) {
  const srcPattern = /src="(.*?)"/
  return new Promise((resolve, reject) => {
    Maybe
      .of(srcPattern.exec(oembed.html))
      .map(result => {
        if (result.length < 2) {
          return reject('Could not extract source url')
        }
        return resolve(result[1])
      })
  })
}
