import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Location } from '@reach/router'

const LayoutContainer = ({ title, ...props }) => (
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
          limit: 10,
          filter: {frontmatter:{inNavigation:{eq:true}}}
          sort: {fields: frontmatter___navigationOrder}
        ) {
          edges {
            node {
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
    `}
    render={data => (
      <>
        <Helmet title={title || data.site.siteMetadata.title}>
          <html lang={data.site.siteMetadata.lang} />
        </Helmet>
        <Location>
            {({ location }) => {
              return (
                <Layout
                  location={location}
                  navigation={data.navigation.edges.map(({node}) => ({
                    to: node.fields.slug,
                    children: node.frontmatter.title
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
  title: PropTypes.string
}

export default LayoutContainer
