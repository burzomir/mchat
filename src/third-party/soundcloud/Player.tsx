import * as React from 'react'
import loadSoundCloudApi from './service'

const apiPromise = loadSoundCloudApi()

type PlayerProps = {
  src: string
  play: boolean
  onPlay: VoidFunction
  onPause: VoidFunction
  onFinish: VoidFunction
}

class Player extends React.Component<PlayerProps> {

  private iframe: HTMLIFrameElement

  constructor (props: PlayerProps) {
    super(props)
  }

  setIframeRef = (iframe: HTMLIFrameElement) => {
    if (!this.iframe) {
      this.iframe = iframe
      apiPromise.then(api => {
        const widget = api.Widget(iframe)
        widget.bind(api.Widget.Events.PLAY, () => {
          this.props.onPlay()
        })
        widget.bind(api.Widget.Events.PAUSE, () => {
          this.props.onPause()
        })
        widget.bind(api.Widget.Events.FINISH, () => {
          this.props.onFinish()
        })
        widget.bind(api.Widget.Events.READY, () => {
          this.props.play ? widget.play() : widget.pause()
        })
      })
    }
  }

  render () {
    const { src } = this.props
    const ref = this.setIframeRef

    return <iframe {...{ src, ref }} />
  }

}

export default Player
