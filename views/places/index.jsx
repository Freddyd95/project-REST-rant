const React = require('react')
const Def = require('../default')

function index (data) {
    let placesFormatted = data.places.map((place) => {
        return (
            <div className="col-sm-6">
                    <h2>
                        <a href={`/places/${place.id}`}>
                            {place.name}
                        </a>
                    </h2>
                <p className="text-center">
                    {place.cuisines}
                </p>
                <img src={place.pic} alt={place.name}></img>
                <p className="text-center">
                    Located in {place.city}, {place.state}
                </p>
            </div>
        )
    })
    return (
        <Def>
            <main>
                <h1>Places to Rant or Rave About</h1>
                <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">BOX</div>
                <div className="col-sm-6 col-md-4 col-lg-3">BOX</div>
                <div className="col-sm-6 col-md-4 col-lg-3">BOX</div>
                <div className="col-sm-6 col-md-4 col-lg-3">BOX</div>
                </div>
            </main>
        </Def>
    )
}

module.exports = index 