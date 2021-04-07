import React from "react";
//import ViewDeck from "./ViewDeck";
import {Switch, Route, useParams} from "react-router-dom";
import StudyDeck from "./StudyDeck";
import EditDeck from "./EditDeck";

const DeckHome = ({decks, deleteDeckHandler}) => {
    const {deckId} = useParams();
    const [cards, setCards] = useState([]);

// fetch specific deck
const deck = decks.find(deck => `${deck.id}` === deckId)

// fetch cards per deck
useEffect(() => {
    async function getCards () {
        const gettingDeck = await listCards(deckId);
       setCards(gettingDeck);
    }
    getCards();
}, []);

const ViewDeck = () => {
    if (deck) {
        return (
    <div className="container">
        <div>
             <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-active">{deck.name}</li>
            </ol>
        </div>
        <div className="deck-info">
             <h3>{deck.name}</h3>   
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}>Edit</Link>
            <Link to={`/decks/${deck.id}/study`}>Study</Link>
            <Link to={`/decks/${deck.id}/addcards`}>Add Cards</Link>
            <button onClick={() => deleteDeckHandler(deckId)}>Delete Deck</button>
        </div>
        <div>
            <CardList deck={deck} decks={decks} setDecks={setDecks} deckId={deckId} cards={cards} setDeck={setDeck}/>
        </div>
    </div>
        
}
    
    return (
        <div>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <ViewDeck deckId={deckId} decks={decks} deck={deck} cards={cards} setDeck={setDeck}/>
                </Route>
                <Route path="/decks/:deckId/study"> 
                <StudyDeck deckId={deckId} deck={deck} deleteDeckHandler={deleteDeckHandler}/>
            </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeck />
                </Route> 
                <Route>
                    <p>Deck not found</p>   
                </Route>          
            </Switch>
        </div>  
    )
}



export default DeckHome;