import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import El from '../elements/Element'
import Title from './Title'

import Image from '../components/Image'
const Link = styled(El)`
  text-decoration: underline;
  color: ${props => props.theme.colors.text};
  &:hover,
  &:active {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`

const PortfolioItem = ({ frontmatter: { title, lead, link, image } }) => {
  return (
    <El mb={3}>
      <El mb={2}>
        <Image src={image} fullWidth border alt={title} />
      </El>
      <Title level={2} size={2.4} mb={0.5} bold>
        {title}
      </Title>
      <El as="p" mb={1}>
        {lead}
      </El>
      <Link as="a" href={link} target="_blank">
        Gå til nettsted
      </Link>
    </El>
  )
}

export const query = graphql`
  fragment PortfolioItem on MarkdownRemark {
    frontmatter {
      title
      link
      lead
      image
    }
  }
`

export default PortfolioItem
