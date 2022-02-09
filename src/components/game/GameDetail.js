import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getGame } from "./GameManager.js"
import {deleteGame} from "./GameManager.js"

export const GameDetail = (props) => {
    const [game, setGame] = useState([])
    const history = useHistory()
    const { gameId } = useParams()
    
    useEffect(() => {
        
        getGame(gameId).then(data => setGame(data))
    
}, [])

    return (
        <>
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">{game.title} by {game.designer}</div>
                <div className="game__year">Year released: {game.year_released}</div>
                <div className="game__description">Description: {game.description}</div>
                <div className="game__ageRecommendation">Recommended Age: {game.age_rec} years old</div>
                <div className="game__estPlaytime">Estimated Playtime: {game.time_to_play} hours</div>
                <div className="game__numberOfPlayers">Number of Players: {game.num_of_players} players</div>
                <div className="game__categories">Categories:
                    {
                        game.categories?.map((category) => {
                            return <div key={category.id} className="game__category">{category.label}</div>
                        })
                    }
                </div>

                <button onClick={() => history.push(`/games/edit/${game.id}`)}>Edit Game</button>
                <button onClick={() => { deleteGame(game.id).then(setGame) }}>Delete Game</button>

            </section>
        </>
    )
}