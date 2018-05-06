import * as React from 'react'

export type ContainerProps = {
  background?: {
    color?: string
    image?: string
  }
}

const Container: React.SFC<ContainerProps> = ({ children, background = {} }) => (
  <div className='container' style={{
    backgroundColor: background.color,
    backgroundImage: background.image
  }}>
    {children}
  </div>
)

export default Container
