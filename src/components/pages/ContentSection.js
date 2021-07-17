import React from "react"

const ContentSection = ({ children, title }) => (
  <section>
    <h2>
      {title}
    </h2>
    <div>
      {children}
    </div>
  </section>
)

export default ContentSection