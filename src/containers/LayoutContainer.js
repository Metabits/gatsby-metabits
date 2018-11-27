import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Location } from '@reach/router'

export const query = graphql`
  fragment MetaFields on MarkdownRemark {
    frontmatter {
      meta {
        title
        description
      }
    }
  }
`

const LayoutContainer = ({ meta = {}, ...props }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            lang
          }
        }
        navigation: allMarkdownRemark(
          limit: 10
          filter: { frontmatter: { inNavigation: { eq: true } } }
          sort: { fields: frontmatter___order }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title: navTitle
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title={meta.title || data.site.siteMetadata.title}>
          <html lang={data.site.siteMetadata.lang} />
          {meta.description && <meta name="description" content={meta.description} />}
        </Helmet>
        <Location>
          {({ location }) => {
            return (
              <Layout
                location={location}
                navigation={data.navigation.edges.map(({ node }) => ({
                  to: node.fields.slug,
                  children: node.frontmatter.title,
                }))}
                {...props}
              />
            )
          }}
        </Location>
      </>
    )}
  />
)

LayoutContainer.propTypes = {
  title: PropTypes.string,
}

export default LayoutContainer
