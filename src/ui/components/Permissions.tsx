import * as React from 'react'
import { connect } from 'react-redux'

export type PermissionCheck<S = any> = {
  (state: S): boolean
}

type PermissionsProps = {
  only?: PermissionCheck[]
  except?: PermissionCheck[]
  state: any
}

const PermissionsComponent: React.StatelessComponent<PermissionsProps> = (props) => {
  const { children, only = [], except = [], state } = props
  const check = (fns: PermissionCheck[]) => {
    return fns.some(fn => fn(state))
  }
  const hasPermissions = (only.length === 0 || check(only)) && !check(except)
  return (hasPermissions ? children : null) as React.ReactElement<void>
}

export const Permissions = connect((state: any) => ({ state }))(PermissionsComponent)
