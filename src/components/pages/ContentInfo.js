import React from "react"
import ContentSection from "./ContentSection"

const ContentInfo = ({ content }) => {
  const poster = content.images.filter(image => image.type === "poster")[0] || false

  return (
    <main className="content-info-wrapper">
      {!poster ? null : (
        <div className="content-poster-wrapper">
          <img className="content-poster" src={poster?.image_url || ""} alt={content.title} />
        </div>
      )}
      <div className="content-data-wrapper">
        <ContentSection title="Opis">
          {content.description}
        </ContentSection>
        <ContentSection title="Informacje">
          <div>
            <div className="content-info-row">
              <div className="content-info-key">
                Data wydania
              </div>
              <div className="content-info-data">
                {content.release_date}
              </div>
            </div>

            {content.available ? null :
              (
                <div className="content-info-row">
                  <div className="content-info-key">
                    Dostępne od
                  </div>
                  <div className="content-info-data">
                    {content.premiere_date}
                  </div>
                </div>
              )
            }
          </div>
        </ContentSection>
        {content.categories.length === 0 ? null : (
          <ContentSection title="Kategorie">
            {content.categories.map(category => (
              <div key={category.key}>
                {category.name}
              </div>
            ))}
          </ContentSection>
        )}
        {content.actors.length === 0 ? null : (
          <ContentSection title="Aktorzy">
            <div className="actors-wrapper">
              {content.actors.map(actor => (
                <div className="actor-wrapper" key={actor.key}>
                  <img className="actor-image" src={actor.image_link} alt={`${actor.lastname} ${actor.name}`} />
                  <div className="actor-data">
                    <div className="actor-name">
                      {actor.name} {actor.lastname}
                    </div>
                    {!actor.role ? null : (
                      <div className="actor-role">
                        {actor.role}
                      </div>
                    )}
                    {!actor.position ? null : (
                      <div className="actor-position">
                        {actor.position}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ContentSection>
        )}
        {content.gallery.length === 0 ? null : (
          <ContentSection title="Zdjęcia">
            <div className="images-wrapper">
              {content.gallery?.map(image => {
                if (image.type === "other") {
                  <img src={image.image_url} alt={content.title} />
                }
              })}
            </div>
          </ContentSection>
        )}
      </div>
    </main>
  )
}

export default ContentInfo