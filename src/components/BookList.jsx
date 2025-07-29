import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: "",
    // Elevo lo stato selected a BookList in origine era sul singolo libro, ogni volta che clicco su un libro si aggiorna questo stato
  };

  handleBookSelection = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };
  // Metodo inserito che aggiorna selectedBookAsin nello stato

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={8} md={8}>
            <Row className="g-0 g-lg-3">
              {this.props.books
                .filter((b) =>
                  b.title
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase())
                )
                .map((b) => (
                  <Col xs={7} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      // Passo l'intero oggetto libro (con titolo, immagine, asin, ecc.
                      isSelected={this.state.selectedBookAsin === b.asin}
                      // Confronto l'asin del libro corrente (b.asin) con lo stato (selectedBookAsin) per capire se è selezionato.
                      onSelect={this.handleBookSelection}
                      // Passiamo la funzione handleBookSelection che si occupa di salvare l'asin selezionato nello state di BookList.
                    />
                  </Col>
                ))}
            </Row>
          </Col>

          <Col xs={4} md={4}>
            {this.state.selectedBookAsin ? (
              <CommentArea asin={this.state.selectedBookAsin} />
            ) : (
              // BookList passa selectedBookAsin come prop a CommentArea
              <div className="text-center mt-5 text-muted">
                <p>Seleziona un libro per visualizzare i commenti</p>
              </div>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
