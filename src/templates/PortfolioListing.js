import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

import { Col, Row } from 'react-styled-flexboxgrid'
import PortfolioItem from '../elements/PortfolioItem'
import PageTitle from '../elements/PageTitle'

const PortfolioListing = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, subTitle, meta },
    },
    portfolios,
  } = data
  return (
    <LayoutContainer meta={meta}>
      <article>
        <PageTitle title={title} subTitle={subTitle} />
        {portfolios && (
          <Row>
            {portfolios.edges.map((item, i) => {
              return (
                <Col key={i} sm={6} xs={12}>
                  <PortfolioItem {...item.node} />
                </Col>
              )
            })}
          </Row>
        )}
      </article>
    </LayoutContainer>
  )
}

PortfolioListing.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PortfolioListing

export const listingPageQuery = graphql`
  query PortfolioListing($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subTitle
      }
      ...MetaFields
    }
    portfolios: allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { type: { eq: "portfolio" } } }
      sort: { fields: frontmatter___order }
    ) {
      edges {
        node {
          ...PortfolioItem
        }
      }
    }
  }
`
