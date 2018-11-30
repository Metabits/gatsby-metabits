import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

import {Col, Row} from 'react-styled-flexboxgrid'
import Feature from '../elements/Feature'
import PageTitle from '../elements/PageTitle'

const TechListing = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, subTitle, meta },
    },
    techs
  } = data
  return (
    <LayoutContainer meta={meta}>
      <article>
        <PageTitle title={title} subTitle={subTitle} />
        {techs && (
          <Row>
            {techs.edges.map((item, i) => {
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

TechListing.propTypes = {
  data: PropTypes.object.isRequired
}

export default TechListing

export const listingPageQuery = graphql`
  query TechListing($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subTitle
      }
      ...MetaFields
    }
    techs: allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { type: { eq: "tech" } } }
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
