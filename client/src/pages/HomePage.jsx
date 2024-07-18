import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best offers"}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  )
}

export default HomePage
