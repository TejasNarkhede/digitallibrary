# Digital Library API Documentation

## Base URL
```
http://localhost:8080
```

## Book Management API

### Book Model
```json
{
  "id": "number (auto-generated)",
  "title": "string (required, unique)",
  "author": "string (required)",
  "genre": "string",
  "status": "enum (AVAILABLE | CHECKED_OUT)"
}
```

### Endpoints

#### 1. Add a New Book
- **URL**: `/books/add`
- **Method**: `POST`
- **Description**: Add a new book to the library
- **Request Body**:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "status": "AVAILABLE"
}
```
- **Response**: Created book object
- **Status Codes**:
  - 200: Success
  - 400: Bad Request (validation error)

#### 2. Get All Books
- **URL**: `/books/all`
- **Method**: `GET`
- **Description**: Retrieve all books in the library
- **Response**: Array of book objects
- **Status Codes**:
  - 200: Success

#### 3. Get Book by ID
- **URL**: `/books/{id}`
- **Method**: `GET`
- **Description**: Retrieve a specific book by its ID
- **Parameters**:
  - `id`: Book ID (path parameter)
- **Response**: Book object
- **Status Codes**:
  - 200: Success
  - 404: Book not found

#### 4. Search Book by Title
- **URL**: `/books/search`
- **Method**: `GET`
- **Description**: Search for a book by its title
- **Parameters**:
  - `title`: Book title (query parameter)
- **Response**: Book object
- **Status Codes**:
  - 200: Success
  - 404: Book not found

#### 5. Update Book
- **URL**: `/books/update/{id}`
- **Method**: `PUT`
- **Description**: Update an existing book's details
- **Parameters**:
  - `id`: Book ID (path parameter)
- **Request Body**:
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "genre": "Updated Genre",
  "status": "CHECKED_OUT"
}
```
- **Response**: Updated book object
- **Status Codes**:
  - 200: Success
  - 404: Book not found
  - 400: Bad Request (validation error)

#### 6. Delete Book
- **URL**: `/books/delete/{id}`
- **Method**: `DELETE`
- **Description**: Delete a book from the library
- **Parameters**:
  - `id`: Book ID (path parameter)
- **Response**: Success message
- **Status Codes**:
  - 200: Success
  - 404: Book not found

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "fieldName": "error message"
}
```

### Not Found Error (404 Not Found)
```json
"Book with ID {id} not found."
```

## CORS Configuration

The API supports CORS with the following configuration:
- Allowed Origins: Configured via `frontend.url` environment variable
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed Headers: All headers
- Credentials: Allowed

## Environment Variables

The following environment variables are required:
- `DATASOURCE_URL`: MySQL database URL
- `DATASOURCE_USER`: Database username
- `DATASOURCE_PASS`: Database password
- `FRONTEND_URL`: Frontend application URL for CORS 