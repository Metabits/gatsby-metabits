const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.fields.slug
      const [last, ...pathList] = slug.split('/').filter((item) => !!item).reverse()
      const parent = pathList && pathList.length > 0 ? `/${pathList.join('/')}/` : null
      createPage({
        path: slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
          parent
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  const { frontmatter } = node
    if (frontmatter) {
      const { banner, image, svgIcon } = frontmatter
      if (banner && banner.image) {
        frontmatter.banner.image = path.join(__dirname, '/src/images/', banner.image)
      }
      if (image) {
        frontmatter.image = path.join(__dirname, '/src/images/', image)
      }
    }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
