import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

import { Col, Row } from 'react-styled-flexboxgrid'
import Feature from '../elements/Feature'
import PageTitle from '../elements/PageTitle'

const PageListing = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, subTitle, meta },
    },
    services,
  } = data
  return (
    <LayoutContainer meta={meta}>
      <article>
        <PageTitle title={title} subTitle={subTitle} />
        {services && (
          <Row>
            {services.edges.map((item, i) => {
              return (
                <Col key={i} xs={12} sm={6} md={4}>
                  <Feature {...item.node} />
                </Col>
              )
            })}
          </Row>
        )}
      </article>
    </LayoutContainer>
  )
}

PageListing.propTypes = {
  data: PropTypes.object.isRequired,
  services: PropTypes.array,
}

export default PageListing

export const listingPageQuery = graphql`
  query PageListing($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subTitle
      }
      ...MetaFields
    }
    services: allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { type: { eq: "service" } } }
      sort: { fields: frontmatter___order }
    ) {
      edges {
        node {
          ...Feature
        }
      }
    }
  }
`
