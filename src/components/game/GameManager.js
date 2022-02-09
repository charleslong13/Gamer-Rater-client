export const getGames = () => {
    return fetch("http://localhost:8000/game", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
}

export const getGame = (id) => {
    return fetch(`http://localhost:8000/game/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/game", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)

    })
        .then(getGames)
}

export const updateGame = (id, game) => {
    return fetch(`http://localhost:8000/game/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)

    })
        .then(getGames)
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/game/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(getGames)
}

export const getCategories = () => {
    return fetch("http://localhost:8000/category", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}