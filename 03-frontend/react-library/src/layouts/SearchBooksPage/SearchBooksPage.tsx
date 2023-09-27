import { useState, useEffect } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";
import React from "react";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Book Category')

    useEffect(() => {

        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            let url: string = ``;

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

            if (!response) {
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;


            setTotalBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);

        };

        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

        window.scrollTo(0, 0);
    }, [booksPerPage, currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}:: Unable to fetch data from API..</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        const categoryMap = new Map<string, string>();
        categoryMap.set('Frontend', 'fe');
        categoryMap.set('Backend', 'be');
        categoryMap.set('Data', 'data');
        categoryMap.set('DevOps', 'devops');
        categoryMap.set('All', '');

        const categoryName: string = categoryMap.get(value) || '';
        const searchUrl = categoryName === '' ? `?page=<pageNumber>&size=${booksPerPage}`
            :
            `/search/findByCategory?category=${categoryName}&page=<pageNumber>&size=${booksPerPage}`

        setSelectedCategory(value);
        setSearchUrl(searchUrl)
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalBooks ? booksPerPage * currentPage : totalBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2"
                                    placeholder="Search" aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <button className="btn btn-outline-success"
                                    onClick={() => searchHandleChange()}>Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                    type="button" id="dropdownmenuButton1" data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {selectedCategory}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField('All')}>
                                        <a href="#" className="dropdown-item">
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Frontend')}>
                                        <a href="#" className="dropdown-item">
                                            Frontend
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Backend')}>
                                        <a href="#" className="dropdown-item">
                                            Backend
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Data')}>
                                        <a href="#" className="dropdown-item">
                                            Data
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('DevOps')}>
                                        <a href="#" className="dropdown-item">
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItem} of {totalBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <div className="m-5">
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type="button" href="#" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">Library Services</a>
                        </div>

                    }

                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>

        </div>
    );
}