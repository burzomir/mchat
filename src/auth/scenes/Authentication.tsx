import * as React from 'react'
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom'
import { Paths } from './Paths'
import { SignInForm, SignUpForm } from '../containers'
import { Container, Row, Col } from '../../ui/components/Grid'
import { ConnectedSpinnerContainer } from '../../ui/components/Spinner/ConnectedSpinnerContainer'
import { ModuleNames } from '../moduleNames'

export class Authentication extends React.Component<RouteComponentProps<void>> {

  render () {
    const { match } = this.props
    return (
      <Container>
        <Row>
          <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
            <h1 className='text-center my-5'>mchat</h1>
            <ConnectedSpinnerContainer name={ModuleNames.AuthenticationSpinner}>
              <Switch>
                <Route path={match.path + Paths.SignIn} render={this.renderSignIn} />
                <Route path={match.path + Paths.SignUp} render={this.renderSignUp} />
              </Switch>
            </ConnectedSpinnerContainer>
          </Col>
        </Row>
      </Container>
    )
  }

  renderSignIn = (props: RouteComponentProps<void>) => {
    return (
      <div>
        <SignInForm />
        <p className='text-center my-5'>No account? <Link to={this.props.match.path + Paths.SignUp}>Sign up now</Link></p>
      </div>
    )
  }

  renderSignUp = (props: RouteComponentProps<void>) => {
    return (
      <div>
        <SignUpForm />
        <p className='text-center my-5'>Already have an account? <Link to={this.props.match.path + Paths.SignIn}>Sign in</Link></p>
      </div>
    )
  }
}
