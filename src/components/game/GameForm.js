import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGame, getCategories, updateGame } from './GameManager.js'


export const GameForm = ({editGame}) => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        designer: "",
        yearReleased: 0,
        description: "",
        ageRec: 0,
        timeToPlay: 0,
        numOfPlayers: 0,
        categories: []
    })

    useEffect(() => {
        if (gameId){
            getGame(gameId).then((res) => {
                const gameToEdit = {
                    title: res.title,
                    designer: res.designer,
                    yearReleased: res.year_released,
                    description: res.description,
                    ageRec: res.age_rec,
                    timeToPlay: res.time_to_play,
                    numOfPlayers: res.num_of_players,
                }
                const existingCategories = []
                for (const category of res.categories) {
                    existingCategories.push(category.id)
                }
                gameToEdit.categories = existingCategories
                setCurrentGame(gameToEdit)
            })
        }
    },[gameId])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    const changeGameState = (event) => {
        const copy = {...currentGame}
        copy[event.target.name] = event.target.value

        setCurrentGame(copy)
    }

    const checkCategory = (event) => {
        let catId = parseInt(event.target.value)
        let copy = {...currentGame}
        let alreadyChecked = copy.categories.find((cat) => cat === catId)
        if (alreadyChecked) {
            let newCategories = copy.categories.filter((id) => id !== catId)
            copy.categories = newCategories
            setCurrentGame(copy)
        } else {
            copy.categories.push(catId)
            setCurrentGame(copy)
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">{editGame ? "Edit Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="number" name="yearReleased" required autoFocus className="form-control"
                        value={currentGame.yearReleased}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="textarea" max="10" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRecommendation">Recommended Age: </label>
                    <input type="number" name="ageRec" required autoFocus className="form-control"
                        value={currentGame.age_rec}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estPlaytime">Est. Playtime (hrs): </label>
                    <input type="number" name="timeToPlay" required autoFocus className="form-control"
                        value={currentGame.time_to_play}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numOfPlayers" required autoFocus className="form-control"
                        value={currentGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category: </label>

                    <div className="categories">
                        {
                            categories.map((category) => {
                                return <div key={category.id} className="category__option">
                                    <input type="checkbox" id={category.id} name="categories" value={category.id}
                                    onChange={checkCategory}
                                    checked={currentGame.categories.find((catId) => catId === category.id) ? "checked" : ""}
                                    ></input>
                                    <label className="category__label" htmlFor={category.id}>{category.label}</label>
                                    
                                </div>
                            })
                        }
                    </div>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()                   
                    // Send PUT/POST request to your API
                    editGame
                    ? updateGame(gameId, currentGame)
                        .then(() => history.push("/games"))
                    : createGame(currentGame)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">{editGame ? "Update Game" : "Create"}</button>
        </form>
    )
}