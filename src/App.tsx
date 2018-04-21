import * as React from 'react'
import Drawer from './modules/ui/drawer'

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
        sideContent={<h1>side</h1>}
        mainContent={<h1>main</h1>}
        isOpened={this.state.isOpened}
      />
    )
  }
}

export default App
