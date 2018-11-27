import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import LayoutContainer from '../containers/LayoutContainer'

import {Col, Row} from 'react-styled-flexboxgrid'
import PageTitle from '../elements/PageTitle'
import Content from '../elements/Content'
import Element from '../elements/Element'
import Icon, {RoundedIcon} from '../elements/Icon'
import Button from '../elements/Button'

const Page = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, subTitle, icon, meta },
      rawMarkdownBody
    },
    parent
  } = data
  return (
    <LayoutContainer meta={meta}>
      <article>
        <Row>
          <Col mdOffset={2} md={8} xs={12}>
            {icon && (
              <Row center='xs'>
                <Col xs={12}>
                  <Element center>
                    <RoundedIcon icon={icon} mt={2} bg='primary' color='white' size={4} />
                  </Element>
                </Col>
              </Row>
            )}
            <PageTitle title={title} subTitle={subTitle} inset={false} />
            <Content md={rawMarkdownBody} />
            {parent && (
              <Element center>
                <Button primary to={parent.fields.slug} pl={2} pr={2}>
                  <Icon icon='left' mr={1} />
                  Tilbake til {parent.frontmatter.title}
                </Button>
              </Element>
            )}
          </Col>
        </Row>
      </article>
    </LayoutContainer>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query Page($id: String!, $parent: String) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      frontmatter {
        title
        subTitle
        icon
      }
      ...MetaFields
    }
    parent: markdownRemark(
      fields: {slug: {eq: $parent}}
    ) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
