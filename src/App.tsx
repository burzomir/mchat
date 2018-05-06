import * as React from 'react'
// import Drawer from './ui/drawer'
// import { Player } from './third-party/soundcloud'
import { getOembed } from './oembed'

import * as auth from './auth'
import { Panel, Acrylic, Input } from './ui'

Object.defineProperty(window, 'myauth', {
  value: auth
})

class App extends React.Component<any, { isOpened: boolean }> {
  constructor (props: any) {
    super(props)
    this.state = {
      isOpened: true
    }
  }

  componentDidMount () {
    getOembed('https://soundcloud.com/mamomam-records/05-red-sun-rising-distant')
      .then(console.log)
    // setInterval(() => {
    //   this.setState(({ isOpened }) => ({ isOpened: !isOpened }))
    // }, 2000)
  }

  render () {
    return (
      <div>
        <h1>Test</h1>
        <Panel material={Acrylic}>
          <Input label='Test' value='Test' info='Info text' />
          <Input label='Test' value='Test' info='Info text' valid={false} />
          <Input label='Test' value='test' />
        </Panel>
        <Panel material={Acrylic}>
          <Input label='Test' value='test' />
          <Input label='Test' value='test' />
        </Panel>
      </div>
      // <Drawer
      //   sideContent={
      //     <h1>Menu</h1>
      //   }
      //   mainContent={
      //     <Player
      //       src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/396001290&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
      //       play={false}
      //       {...{ onPlay, onPause, onFinish }}
      //     />
      //   }
      //   isOpened={this.state.isOpened}
      // />
    )
  }
}

// const onPlay = () => console.log('play')
// const onPause = () => console.log('pause')
// const onFinish = () => console.log('finish')

export default App
