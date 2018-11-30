import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const StyledImg = styled(Img)`
  ${props => (props.fullWidth ? 'width: 100%;height: auto;' : '')}
  ${props =>
    props.border ? `border: 1px solid ${props.theme.colors.border};` : ''}
  ${props => (props.maxWidth ? `max-width: ${props.maxWidth}rem;` : '')}
`

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

const Image = ({src, render}) => (
  <StaticQuery
    query={graphql`
      query imageQuery {
        allFile {
          edges {
            node {
              id
              absolutePath
              childImageSharp {
                id
                resolutions {
                  base64
                  tracedSVG
                  aspectRatio
                  width
                  height
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  originalName
                }
                internal {
                  contentDigest
                  type
                  owner
                }
                fluid(maxWidth: 1240) {
                  ...GatsbyImageSharpFluid
                  originalName
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const node = data.allFile.edges.find((fileNode) => {
        return fileNode.node.absolutePath === src
      })
      if (render) {
        return render(node.node.childImageSharp.fluid)
      }
      if (node) {
        return (
          <StyledImg fluid={node.node.childImageSharp.fluid} />
        )
      }
      return null
    }}
  />
)
export default Image
