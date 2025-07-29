// Import dei componenti e hook necessari
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState } from "react";
import { useEffect } from "react";

// Componente CommentArea che riceve asin come prop (codice del libro)
const CommentArea = (props) => {
  // Stato per i commenti caricati
  const [comments, setComments] = useState([]);
  // Stato che indica se il caricamento è in corso
  const [isLoading, setIsLoading] = useState(false);
  // Stato che indica se si è verificato un errore durante il fetch
  const [isError, setIsError] = useState(false);

  // Funzione asincrona che effettua il fetch dei commenti relativi all'asin ricevuto
  const fetchComments = async () => {
    // Se asin non è presente, esce senza fare nulla
    if (!props.asin) return;

    // Imposta lo stato di caricamento e resetta eventuali errori precedenti
    setIsLoading(true);
    setIsError(false);

    try {
      // Effettua la richiesta GET per ottenere i commenti relativi all'asin
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NzZmZTEyODg5NzAwMTVmMjdiYmQiLCJpYXQiOjE3NTM3MDgyODcsImV4cCI6MTc1NDkxNzg4N30.Urj3XDJvrGYQlPTFARoicWtHZ66jH6Wqh_HgxRO4PMw",
          },
        }
      );

      // Se la risposta è ok, aggiorna lo stato dei commenti
      if (response.ok) {
        const comments = await response.json();
        setComments(comments); // aggiorna lo stato dei commenti
        setIsLoading(false); // termina il caricamento
      } else {
        // Se la risposta non è ok, lancia un errore
        throw new Error("Errore nel fetch");
      }
    } catch (error) {
      // Gestione dell'errore
      console.error(error); // stampa l'errore in console per debugging
      setIsError(true); // imposta lo stato di errore a true
      setIsLoading(false); // termina il caricamento
    }
  };

  // useEffect si attiva ogni volta che props.asin cambia
  useEffect(() => {
    fetchComments(); // chiama la funzione per caricare i commenti
    // disabilita l'avviso ESLint per le dipendenze mancanti (in questo caso va bene così)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  // Render del componente
  return (
    <div className="text-center">
      {/* Mostra il componente Loading durante il caricamento */}
      {isLoading && <Loading />}
      {/* Mostra il componente Error se c'è stato un errore nel fetch */}
      {isError && <Error />}
      {/* Componente per aggiungere un nuovo commento: riceve l'asin corrente */}
      <AddComment asin={props.asin} />
      {/* Componente per mostrare la lista dei commenti ricevuti dal server */}
      <CommentList commentsToShow={comments} />
    </div>
  );
};

// Esporta il componente per poterlo usare in altri file
export default CommentArea;
