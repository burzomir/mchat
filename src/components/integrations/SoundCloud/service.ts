export default function loadSoundCloudApi () {
  return new Promise<SoundCloudApi>((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.onload = () => {
      resolve(window.SC)
    }
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag)
  })
}
