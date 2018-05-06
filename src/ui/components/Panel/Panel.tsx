import * as React from 'react'

export type PanelProps = {
  material: React.ComponentType
}

const Panel: React.SFC<PanelProps> = ({
  material: Material,
  children
}) => (
    <div className='panel'>
      <div className='panel__material'>
        <Material />
      </div>
      <div className='panel_body'>
        {children}
      </div>
    </div>
  )

export default Panel
