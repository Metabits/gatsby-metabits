import React from 'react'
import styled from 'styled-components'
import {graphql} from 'gatsby'

import Link from './Link'
import Icon from './Icon'

export const query = graphql`
  fragment Feature on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      title
      subTitle
      icon
    }
  }
`

const BoxWrapper = styled(Link)`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  transition: transform 200ms;
  color: ${props => props.theme.colors.textMuted};
  &:hover,
  &:active {
    transform: scale(1.05);
  }
`
const IconWrapper = styled.div`
  display: block;
  margin-bottom: 1rem;
  font-size: 4rem;
  color: ${props => props.theme.colors.primary};
`
const Title = styled.h2`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
`
const Image = styled.img`
  display: block;
  margin-bottom: 1rem;
  max-height: 15rem;
  width: auto;
`

const Feature = ({ fields: {slug}, frontmatter: {title, subTitle, icon, image} }) => {
  return (
    <BoxWrapper to={slug}>
      <IconWrapper>
        {icon && <Icon icon={icon} />}
        {image && <Image src={image} title={title} />}
      </IconWrapper>
      <Title>{title}</Title>
      <p>{subTitle}</p>
    </BoxWrapper>
  )
}

export default Feature
