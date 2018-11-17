import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <h1>Hi world</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: '100px', marginBottom: '1.45rem' }}>
      <Image />
    </div>
    <Link to="/about">About page</Link>
  </Layout>
)

export default IndexPage
