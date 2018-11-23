import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

const Homepage = ({ data }) => {
  const {markdownRemark: {frontmatter: {title}, html}} = data
  return (
    <LayoutContainer>
      <article>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </LayoutContainer>
  )
}

Homepage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Homepage

export const homepageQuery = graphql`
  query Homepage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      id
      frontmatter {
        title
        services {
          title
          price
          text
        }
      }
    }
    services: allMarkdownRemark(limit: 10, filter: {frontmatter:{type:{eq:"service"}}} ) {
      edges {
        node {
          excerpt(pruneLength: 500)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
