import React from "react"

const ContentSection = ({ children, title }) => (
  <section className='content-section-wrapper'>
    <h2>
      {title}
    </h2>
    <div>
      {children}
    </div>
  </section>
)

export default ContentSection