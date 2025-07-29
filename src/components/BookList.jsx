import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
import { useState } from "react";

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookAsin, setSelectedBookAsin] = useState("");

  const handleBookSelection = (asin) => {
    setSelectedBookAsin(asin);
  };

  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={4} className="text-center">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Cerca un libro"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={8} md={8}>
          <Row className="g-0 g-lg-3">
            {books
              .filter((b) =>
                b.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((b) => (
                <Col xs={7} md={4} key={b.asin}>
                  <SingleBook
                    book={b}
                    isSelected={selectedBookAsin === b.asin}
                    onSelect={handleBookSelection}
                  />
                </Col>
              ))}
          </Row>
        </Col>

        <Col xs={4} md={4}>
          {selectedBookAsin ? (
            <CommentArea asin={selectedBookAsin} />
          ) : (
            <div className="text-center mt-5 text-muted">
              <p>Seleziona un libro per visualizzare i commenti</p>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default BookList;
