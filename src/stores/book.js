import { defineStore } from "pinia";
import rawData from "@/data.json";

export const useBooksStore = defineStore("books", {
    state: () => ({
        books: [...rawData.books],
        authors: [...rawData.authors],
        publishers: [...rawData.publishers],
        nextId: Math.max(...rawData.books.map((b) => b.id), 0) + 1,
        nextAuthorId: Math.max(...rawData.authors.map((a) => a.id), 0) + 1,
        nextPublisherId:
            Math.max(...rawData.publishers.map((p) => p.id), 0) + 1,
    }),

    actions: {
        addBook(book) {
            const newBook = {
                ...book,
                id: this.nextId++,
            };
            this.books.push(newBook);
            return newBook;
        },

        updateBook(id, updatedBook) {
            const index = this.books.findIndex((b) => b.id === id);
            if (index !== -1) {
                this.books[index] = { ...this.books[index], ...updatedBook };
                return this.books[index];
            }
            return null;
        },

        getBookById(id) {
            return this.books.find((b) => b.id === Number(id));
        },

        addAuthor(author) {
            const newAuthor = { ...author, id: this.nextAuthorId++ };
            this.authors.push(newAuthor);
            return newAuthor;
        },

        updateAuthor(id, data) {
            const index = this.authors.findIndex((a) => a.id === id);
            if (index !== -1) {
                this.authors[index] = { ...this.authors[index], ...data };
            }
        },

        getAuthorById(id) {
            return this.authors.find((a) => a.id === Number(id));
        },

        addPublisher(publisher) {
            const newPublisher = { ...publisher, id: this.nextPublisherId++ };
            this.publishers.push(newPublisher);
            return newPublisher;
        },

        updatePublisher(id, data) {
            const index = this.publishers.findIndex((p) => p.id === id);
            if (index !== -1) {
                this.publishers[index] = { ...this.publishers[index], ...data };
            }
        },

        getPublisherById(id) {
            return this.publishers.find((p) => p.id === Number(id));
        },
    },
});
