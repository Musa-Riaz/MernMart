import React from 'react'
import Layout from '../components/layout/Layout'
const Policy = () => {
  return (
    <Layout>
          <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Information: We Collect:</span> Name, email address, phone number, mailing address, and payment details when you register and make purchases.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Usage Data: </span>IP address, browser type, operating system, referring URLs, page views, and time spent on our site.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>How We Use Your Information:</span>  Process transactions and send order confirmations. Manage your account and provide customer support.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Communication:</span> Send updates, newsletters, marketing materials, and other information that may be of interest to you.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Personalization:</span> Tailor content and advertisements according to your preferences and browsing behavior.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Improvement and Analysis:</span> Analyze usage trends and improve our website, products, and services.</p>
          <p><span style={{fontWeight:700, fontSize:'20px'}}>Legal Compliance:</span> We may disclose your information if required by law, such as to comply with a subpoena or similar legal process.</p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy
