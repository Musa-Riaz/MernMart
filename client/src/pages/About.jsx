import React from 'react'
import Layout from '../components/layout/Layout'
const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to MernMart, your one-stop shop for all your shopping needs. Our mission is to provide high-quality products at affordable prices, with a focus on excellent customer service.
We offer a wide range of products, from electronics to home goods, all curated to meet your needs. Our unique selling point is our commitment to quality and customer satisfaction.
Our dedicated team is the backbone of MernMart. We are proud of our diverse and talented team members who work tirelessly to bring you the best shopping experience.
We are committed to giving back to the community and have various initiatives to support local causes. Our sustainability efforts focus on reducing our environmental footprint and promoting eco-friendly practices.
Have questions or feedback? Reach out to us at support@mernmart.com. We are here to help!
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
