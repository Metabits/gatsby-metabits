import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

import { Col, Row } from 'react-styled-flexboxgrid'
import PageBanner from '../elements/PageBanner'
import Feature from '../elements/Feature'
import Wrapper from '../elements/Wrapper'
import Title from '../elements/Title'

const Homepage = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { banner, meta },
    },
    services,
  } = data
  return (
    <LayoutContainer inset={false} meta={meta}>
      {banner && <PageBanner {...banner} />}
      <Wrapper>
        <Title level={2} center mt={1}>
          Våre tjenester
        </Title>
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
      </Wrapper>
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
      ...PageBanner
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
