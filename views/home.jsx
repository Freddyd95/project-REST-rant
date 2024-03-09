const React = require('react')
const Def = require('./default')

function home () {
    return (
    <Def>
        <main>
            <h1>HOME</h1>
            <div>
                <img src="/images/tacos.jpg" alt="tacos"/>
                <div>
                    Photo by <a href="https://unsplash.com/@profxavier26">Xavier Crook</a> on <a href="https://unsplash.com/">Unsplash</a>
                </div>
            </div>
            <a href="/places">
            <button className="btn-primary">Places to Rave About</button>
            </a> 
        </main>
    </Def>
    )
}  

module.exports = home 