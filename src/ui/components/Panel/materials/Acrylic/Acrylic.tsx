import * as React from 'react'

export type AcrylicProps = {
  material: React.ComponentClass
}

const Acrylic: React.SFC<AcrylicProps> = ({
  material: Material,
  children
}) => (
    <div className='acrylic'></div>
  )

export default Acrylic
