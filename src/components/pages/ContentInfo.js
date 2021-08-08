import React, { useState } from "react"
import ContentSection from "./ContentSection"
import store from "../../redux/store"
import database from "../../database"

const ContentInfo = ({ content }) => {
  const poster = content.images.filter(image => image.type === "poster")[0] || false

  const [showMovie, switchShowMovie] = useState(false)
  const [showPlans, switchShowPlans] = useState(false)
  const [buyPanel, setBuyPanel] = useState(<React.Fragment />)
  const [hasAccess, setHasAccess] = useState(content.has_access)

  const buy = async (plan) => {
    const formData = new FormData()
    formData.append("planId", plan.id)
    const res = await database.post("buy-plan", (data) => {
    }, formData)

    if (res?.ok) {
      setHasAccess(true)
    }
  }

  const [userExists, setUserExists] = useState(!!store.getState().request?.data?.user?.id)

  store.subscribe(() => {
    setUserExists(!!store.getState().request?.data?.user?.id)
  })

  const showBuyPanel = (plan) => {
    const panel = (
      <div className="buy-panel-wrapper">
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
        <input
          className="buy-button"
          type="button"
          value="Wykup"
          onClick={() => buy(plan)}
        />
      </div>
    )

    setBuyPanel(panel)
  }

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
        {!userExists ? (
            <div>
              Zaloguj się aby oglądać lub kupić ten film
            </div>
          ) :
          !content.video ? null :
            hasAccess ? (
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
                  <React.Fragment>
                    <ContentSection title="Dostępne w planach:">
                      {
                        content.plans.length === 0 ? (
                          <div className="info-box">
                            Aktualnie niedostępne
                          </div>
                        ) : content.plans.map(plan => (
                          <div className="plans-wrapper">
                            <div className="plan-row">
                              <p>
                                {plan.auto_renew ? "[SVOD]" : "[TVOD]"} {plan.name} czas trwania: {plan.duration} dni,
                                dostępny w {plan.currencies.length} walutach. Ilość filmów w tym planie: {plan.contents}
                              </p>
                              <input
                                className="buy-button"
                                type="button"
                                value="Przejdź do zakupu"
                                onClick={() => showBuyPanel(plan)}
                              />
                            </div>
                          </div>
                        ))
                      }
                    </ContentSection>
                    {buyPanel}
                  </React.Fragment>
                )}
              </React.Fragment>
            )
        }
        {
          content?.seasons?.length > 0 ? (
            <ContentSection title={`Sezony (${content.seasons.length}):`}>
              {content.seasons.map(season =>
                (
                  <a href={`/content/${season.id}/${season.url}`}>
                    <div className="single-season-wrapper">
                      {season.title}
                    </div>
                  </a>
                ),
              )}
            </ContentSection>
          ) : null
        }
        {
          content?.episodes?.length > 0 ? (
            <ContentSection title={`Odcinki (${content.episodes.length}):`}>
              {content.episodes.map(episode => (
                  <a href={`/content/${episode.id}/${episode.url}`}>
                    <div className="single-episode-wrapper">
                      {episode.title}
                    </div>
                  </a>
                ),
              )}
            </ContentSection>
          ) : null
        }
      </div>
    </main>
  )
}

export default ContentInfo