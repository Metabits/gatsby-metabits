import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import breakpoint from 'styled-components-breakpoint'
import Img from '../components/Image'

import Wrapper from './Wrapper'
import Button from './Button'

export const query = graphql`
  fragment PageBanner on MarkdownRemark {
    frontmatter {
      banner {
        title
        lead
        image
        linkText
        uri
      }
    }
  }
`

const Banner = styled.div`
  font-size: 2rem;
  background-size: cover;
  background-position: 50% 50%;
  text-align: center;
  padding: 8rem 0;
  margin-bottom: 2rem;
  ${breakpoint('desktop')`
    padding-top: 16rem;
    padding-bottom: 16rem;
  `}
`
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  line-height: 1.2;
`
const Subtitle = styled(Title)`
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 2rem;
`

const PageBanner = ({ title, lead, image, linkText, uri }) => {
  return (
    <Img
      src={image}
      render={({ src }) => {
        return (
          <Banner style={{ backgroundImage: `url( ${src} )` }}>
            <Wrapper>
              <Title>{title}</Title>
              <Subtitle>{lead}</Subtitle>
              {linkText && uri && (
                <Button shadow to={uri}>
                  {linkText}
                </Button>
              )}
            </Wrapper>
          </Banner>
        )
      }}
    />
  )
}

export default PageBanner
