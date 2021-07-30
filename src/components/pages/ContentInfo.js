import React, { useState } from "react"
import ContentSection from "./ContentSection"

const ContentInfo = ({ content }) => {
  const poster = content.images.filter(image => image.type === "poster")[0] || false

  const [showMovie, switchShowMovie] = useState(false)
  const [showPlans, switchShowPlans] = useState(false)

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
        {!content.trailer ? null : (
          <ContentSection title="Trailer">
            <iframe
              width="100%"
              height="auto"
              src={content.trailer.url}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ContentSection>
        )}
        {!content.video ? null :
          content.has_access ? (
            <React.Fragment>
              <button className="show-movie-button" onClick={() => switchShowMovie(!showMovie)}>
                {showMovie ? "Schowaj film" : "Oglądaj"}
              </button>
              {!showMovie ? null : (
                <ContentSection title="Oglądaj">
                  <iframe
                    src="https://player.vimeo.com/video/511589405"
                    width="100%"
                    height="auto"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </ContentSection>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="buy-movie-button" onClick={() => switchShowPlans(!showPlans)}>
                {showPlans ? "Schowaj plany" : "Kup"}
              </button>
              {!showPlans ? null : (
                <ContentSection title="Dostępne w planach:">
                  {
                    content.plans.length === 0 ? (
                      <div>
                        Aktualnie niedostępne
                      </div>
                    ) : content.plans.map(plan => (
                      <React.Fragment>
                        {plan.key}
                      </React.Fragment>
                    ))
                  }
                </ContentSection>
              )}
            </React.Fragment>
          )
        }
      </div>
    </main>
  )
}

export default ContentInfo