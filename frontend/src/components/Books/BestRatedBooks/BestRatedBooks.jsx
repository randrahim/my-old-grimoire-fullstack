import React from "react";
import { useBestRatedBooks } from "../../../lib/customHooks";
import BookItem from "../BookItem/BookItem";
import styles from "./BestRatedBooks.module.css";

function BestRatedBooks() {
  const { bestRatedBooks } = useBestRatedBooks();

  const bestRatedBooksContent =
    bestRatedBooks.length > 0 ? (
      bestRatedBooks.map((elt) => (
        <BookItem key={`book-${elt.id}`} book={elt} size={3} />
      ))
    ) : (
      <h3>No recommendations</h3>
    );

  return (
    <section className={`content-container ${styles.BestRatedBooks}`}>
      <h2>Top rated</h2>
      <div className={styles.List}>{bestRatedBooksContent}</div>
    </section>
  );
}

export default BestRatedBooks;
