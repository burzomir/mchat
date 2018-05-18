import * as React from 'react'
import styled from 'styled-components'
import { Spinner } from './Spinner'

type Props = {
  loading: boolean
}

export const SpinnerContainer: React.SFC<Props> = ({ loading, children }) => (
  <Container>
    <div>
      {children}
    </div>
    {
      loading &&
      <SpinnerLayer>
        <Spinner />
      </SpinnerLayer>
    }
  </Container>
)

const Container = styled.div`
  position: relative;
`

const SpinnerLayer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
`
