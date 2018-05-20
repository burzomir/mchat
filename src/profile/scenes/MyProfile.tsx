import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col, Permissions } from '../../ui'
import { ConnectedSpinnerContainer } from '../../ui/components/Spinner/ConnectedSpinnerContainer'
import { ModuleNames } from '../moduleNames'
import { UsernameForm, UserProfile } from '../containers'
import { UserWithProfile } from '../permissions'

export class MyProfile extends React.Component<RouteComponentProps<void>> {
  render () {
    // const { match } = this.props
    return (
      <Container>
        <Row>
          <Col>
            <h1 className='text-center my-5'>mchat</h1>
            <ConnectedSpinnerContainer name={ModuleNames.UserProfileSpinner}>
              <Permissions except={[UserWithProfile]}>
                <UsernameForm />
              </Permissions>
              <Permissions only={[UserWithProfile]}>
                <UserProfile />
              </Permissions>
            </ConnectedSpinnerContainer>
          </Col>
        </Row>
      </Container>
    )
  }
}
