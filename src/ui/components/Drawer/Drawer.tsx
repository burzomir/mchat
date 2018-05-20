import * as React from 'react'
import './Drawer.scss'

export type DrawerProps = {
  renderDrawer: () => JSX.Element
  renderContent: () => JSX.Element
  isOpened: boolean

}

export const Drawer: React.SFC<DrawerProps> = (props) => {
  return (
    <div className={`drawer ${props.isOpened ? 'drawer--opened' : ''}`}>
      <div className='drawer__side-content'>{props.renderDrawer()}</div>
      <div className='drawer__main-content'>{props.renderContent()}</div>
    </div>
  )
}
