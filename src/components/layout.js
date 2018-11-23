import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Link } from 'gatsby'
import breakpoint from 'styled-components-breakpoint'

import Icon from '../elements/Icon'
import Logo from '../elements/LogoElement'
import OffCanvas from '../elements/OffCanvas'
import Button, {RoundedButton} from '../elements/Button'
import Wrapper from '../elements/Wrapper'

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuVisible: false
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname && this.state.menuVisible) {
      this.setState({
        menuVisible: false
      })
    }
  }
  toggleBtn (icon = 'bars') {
    const {menuVisible} = this.state
    return (
      <RoundedButton tight primary onClick={this.toggleMenu} active={menuVisible}><Icon icon={icon} /></RoundedButton>
    )
  }
  toggleMenu = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }
  renderContent () {
    const {inset = true, children} = this.props
    if (!inset) {
      return children
    }
    return (
      <Wrapper>
        {children}
      </Wrapper>
    )
  }
  render () {
    return (
      <ThemeProvider theme={theme}>
        <Main>
          {this.renderHeader()}
          <Content>
            {this.renderContent()}
          </Content>
          <Footer>
            <Wrapper>
              <p>Metabits as © {new Date().getFullYear()}</p>
            </Wrapper>
          </Footer>
          {this.renderOverlay()}
          <GlobalStyle />
        </Main>
      </ThemeProvider>
    )
  }
  renderHeader () {
    const {navigation, location: {pathname}} = this.props
    return (
      <Header>
        <Wrapper>
          <HeaderWrapper>
            <Link to='/'>
              <LogoWrapper href='/'>
                <Logo title='Metabits' />
              </LogoWrapper>
            </Link>
            <NavWrapper>
              <NavDesktop>
                {navigation && navigation.map((item, i) => {
                  const isLast = !(i < navigation.length - 1)
                  return (
                    <Button link={!isLast} primary={isLast} pl={2} pr={2} ml={2} key={i} {...item} active={item.to === pathname} />
                  )
                })}
              </NavDesktop>
              <NavBtnMobile>
                {this.toggleBtn()}
              </NavBtnMobile>
            </NavWrapper>
          </HeaderWrapper>
        </Wrapper>
      </Header>
    )
  }
  renderOverlay () {
    const {menuVisible} = this.state
    const {navigation} = this.props
    return (
      <OffCanvas visible={menuVisible}>
        <Header>
          <Wrapper>
            <HeaderWrapper>
              <Link to={'/'}>
                <LogoWrapper isHidden>
                  <Logo alt='Metabits' />
                </LogoWrapper>
              </Link>
              <NavWrapper>
                {this.toggleBtn('close')}
              </NavWrapper>
            </HeaderWrapper>
          </Wrapper>
        </Header>
        <NavMobile>
          <NavMobileInner>
            {navigation.map((item, i) => {
              return (
                <Button block mb={1} size='xl' link key={i} {...item} />
              )
            })}
          </NavMobileInner>
        </NavMobile>
      </OffCanvas>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navigation: PropTypes.array
}

const theme = {
  flexboxgrid: {
    gutterWidth: 4
  },
  shadow: '0 0 6px rgba(0,0,0,.3)',
  sizes: {
    normal: 1.8,
    xl: 2.2,
    xxl: 2.4
  },
  colors: {
    gray: '#999',
    border: '#ccc',
    text: '#232323',
    primary: '#00AEEE',
    primaryActive: '#0095DA',
    secondary: '#FF931E',
    secondaryActive: '#D47A19',
    textMuted: '#999',
    white: '#fff',
    lightGray: '#f2f2f2'
  }
}

const Main = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
`
const Content = styled.main`
  padding-bottom: 2rem;
  flex: 1;
  z-index: 1;
`
const Header = styled.header`
  display: block;
  padding: 2rem 0;
`
const Footer = styled.footer`
  display: block;
  padding: 2rem 0;
  text-align: center;
`
const LogoWrapper = styled.div`
  width: 15rem;
  display: block;
  visibility: ${props => props.isHidden ? 'hidden' : 'visible'};
  ${breakpoint('desktop')`
    width: 20rem;
  `}
`
const NavWrapper = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
`
const NavDesktop = styled.div`
  display: none;
  ${breakpoint('desktop')`
    display: block;
  `}
`
const NavBtnMobile = styled.div`
  display: block;
  ${breakpoint('desktop')`
    display: none;
  `}
`
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`
const NavMobile = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`
const NavMobileInner = styled.div`
  width: 100%;
`

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
  }
`

export default Layout
