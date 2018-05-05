export type Provider = {
  provider_name: string,
  provider_url: string,
  endpoints: Endpoint[]
}

export type Endpoint = {
  schemes: string[]
  url: string
  discovery: boolean
  formats: 'json' | 'xml'[]
}

export type Oembed = {
  html: string
}
