/*import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function RandonGame({ randomGame }) {
    return (
        <>
            <div className="InfoImg">
            {randomGame && randomGame.image ? <src={`${randomGame.image}`}/> : <Img src={Default} alt="Default videogame image"/>}
            </div>
            <div className="InfoCont">
            {randomGame && <h3 className="rgInfo">Have you tried the new <span className="rgTitle">{randomGame.name}</span>?</h3>}
            {randomGame && <Link className="gdLink" to={`/home/GameDetail/${randomGame.id}`}>Check it out!</Link>}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        randomGame: state.gamesAPI[Math.round(Math.random() * state.gamesAPI.length)]
    }
}

export default connect(mapStateToProps, null) (RandonGame)*/