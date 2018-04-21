import * as React from 'react'
import Drawer from './modules/ui/drawer'
import { Player } from './components/integrations/SoundCloud'

class App extends React.Component<any, { isOpened: boolean }> {
  constructor (props: any) {
    super(props)
    this.state = {
      isOpened: true
    }
  }

  componentDidMount () {
    // setInterval(() => {
    //   this.setState(({ isOpened }) => ({ isOpened: !isOpened }))
    // }, 2000)
  }

  render () {
    return (
      <Drawer
        sideContent={
          <h1>Menu</h1>
        }
        mainContent={
          <Player
            src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/396001290&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
            play={false}
            {...{ onPlay, onPause, onFinish }}
          />
        }
        isOpened={this.state.isOpened}
      />
    )
  }
}

const onPlay = () => console.log('play')
const onPause = () => console.log('pause')
const onFinish = () => console.log('finish')

export default App
