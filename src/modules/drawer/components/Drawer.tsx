import * as React from 'react'
import './Drawer.scss'

type DrawerProps = {
  sideContent: React.ReactElement<any>
  mainContent: React.ReactElement<any>
  isOpened: boolean

}

const Drawer: React.SFC<DrawerProps> = (props) => {
  return (
    <div className={`drawer ${props.isOpened ? 'drawer--opened' : ''}`}>
      <div className='drawer__side-content'>{props.sideContent}</div>
      <div className='drawer__main-content'>{props.mainContent}</div>
    </div>
  )
}

export default Drawer
