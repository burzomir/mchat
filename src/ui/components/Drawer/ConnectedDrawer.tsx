import { connect } from 'react-redux'
import { Drawer, DrawerProps } from './Drawer'
import { State } from './types'

export const ConnectedDrawer = connect(
  (state: State, { renderDrawer, renderContent, name }: Pick<DrawerProps, 'renderDrawer' | 'renderContent'> & { name: string }): DrawerProps => ({
    isOpened: state.drawer.get(name, false),
    renderDrawer,
    renderContent
  })
)(Drawer)
