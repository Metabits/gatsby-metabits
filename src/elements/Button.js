import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Element from './Element'

const isActive = (props, hover) =>
  props.active || !!(hover && !!(props.to || props.onClick))

const buttonColor = (props, hover = false) => {
  if (props.link) {
    if (isActive(props, hover)) {
      return props.theme.colors.primaryActive
    }
    return props.theme.colors.text
  }
  return '#fff'
}

const buttonBackground = (props, hover = false) => {
  if (props.link) {
    return 'none'
  }
  if (props.primary && isActive(props, hover)) {
    return props.theme.colors.primaryActive
  }
  if (props.primary) {
    return props.theme.colors.primary
  }
  if (isActive(props, hover)) {
    return props.theme.colors.secondaryActive
  }
  return props.theme.colors.secondary
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const BasicButton = styled(Element)`
  text-decoration: none;
  text-align: center;
  border: none;
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  border-radius: ${props => (props.rounded ? '50%' : '3px')};
  outline: none;
  box-shadow: ${props => (props.shadow ? props.theme.shadow : 'none')};
  color: ${props => buttonColor(props)};
  background-color: ${props => buttonBackground(props)};
  &:hover {
    text-decoration: ${props =>
      props.link && props.to ? 'underline' : 'none'};
    cursor: ${props => (props.to || props.onClick ? 'pointer' : 'default')};
    color: ${props => buttonColor(props, true)};
    background-color: ${props => buttonBackground(props, true)};
  }
`
const ActionButton = styled(BasicButton)`
  cursor: pointer;
`

const Button = ({ ...rawProps }) => {
  const props = {
    pt: 0.75,
    pb: 0.75,
    pl: 1,
    pr: 1,
    ...rawProps,
  }
  if (props.onClick) {
    return <ActionButton as="button" type={props.type || 'submit'} {...props} />
  }
  if (props.to) {
    return (
      <StyledLink to={props.to}>
        <BasicButton {...props} />
      </StyledLink>
    )
  }
  return <BasicButton {...props} />
}

const RoundedButtonRaw = styled(Button)`
  border-radius: 50%;
  padding-left: 0;
  padding-right: 0;
  min-width: 4rem;
  min-height: 4rem;
`
export const RoundedButton = props => <RoundedButtonRaw rounded {...props} />

export default Button
