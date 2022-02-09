import React from "react"
import { Route } from "react-router-dom"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import {GameDetail} from "./game/GameDetail"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/game">
                <GameList />
            </Route>

            <Route exact path="/game/:gameId(\d+)">
                <GameDetail />
            </Route>

            <Route exact path="/game/new">
                <GameForm />
            </Route>
        </main>
    </>
}