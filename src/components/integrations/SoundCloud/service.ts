import { Maybe } from '../../../services/fp'

export default function loadSoundCloudApi () {
  return new Promise<SoundCloudApi>((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.onload = () => {
      resolve(window.SC)
    }
    Maybe
      .of(document.getElementsByTagName('script')[0])
      .map(scriptTag => {
        Maybe
          .of(scriptTag.parentNode)
          .map(parentNode => parentNode.insertBefore(script, scriptTag))
      })
  })
}
