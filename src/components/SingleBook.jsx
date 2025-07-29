import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleBook extends Component {
  render() {
    const { book, isSelected, onSelect } = this.props;
    // Prendi le proprietà book, isSelected e onSelect dall’oggetto this.props e crea 3 variabili locali con lo stesso nome.

    return (
      <Card
        onClick={() => onSelect(book.asin)}
        // Quando un SingleBook viene cliccato, chiama onSelect().

        // Le passo come argomento book.asin (cioè il valore della proprietà asin del libro corrente).
        style={{
          border: isSelected ? "3px solid red" : "1px solid #ddd",
          // Quando clicco su una card (<Card>), il book.asin viene passato a onSelect, che aggiorna lo stato selectedBookAsin nel componente padre (BookList).
          // Questo fa sì che il libro selezionato abbia isSelected === true, e quindi venga evidenziato con il bordo rosso.
          cursor: "pointer",
        }}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
