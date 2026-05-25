## What it is
Representational State Transfer (REST) is an architectural style, not a protocol, for designing networked applications. It uses the standard HTTP protocol to allow a client (like a web browser or another server) to access and manipulate representations of web resources (data or objects) on a server. The core idea is to treat data as resources identified by URIs, and to use standard HTTP methods as verbs to act upon these noun-like resources.

## Why it matters
REST is the dominant paradigm for building APIs on the web, making it fundamental for distributed systems. In your fields, you will encounter it constantly:
*   **Rocket Science**: Ground control software uses REST APIs to request telemetry data (position, velocity, fuel levels) from spacecraft or to send commands.
*   **Physics**: Large-scale simulation frameworks (like those at CERN or for astrophysical modeling) expose data via REST APIs, allowing researchers to query vast datasets without direct database access.
*   **Machine Learning**: Models are often deployed as services with REST APIs, allowing applications to send input data (e.g., an image) and receive a prediction (e.g., object classifications) via a simple HTTP request.

## When to study it
You must have a solid grasp of the following before proceeding. If not, study them first.
*   **HTTP Protocol**: Understand the client-server model, request-response cycle, and the structure of an HTTP message (method, URI, headers, body).
*   **APIs (General Concept)**: Know what an Application Programming Interface is and its purpose in allowing different software components to communicate.
*   **JSON Data Format**: Be able to read and write data in JavaScript Object Notation, as it is the de facto standard for REST API message bodies.

## How to study it (step by step)
1.  **Identify a Resource.** Pick a physical or conceptual object from your field, like a "Star" from an astronomical catalog. This is your noun. The collection of all stars is `/stars`, and a specific star is `/stars/{star_id}`.
2.  **Map Verbs to Methods.** List the basic operations you'd perform on a star: Create, Read, Update, Delete (CRUD). Map these directly to HTTP methods:
    *   `POST /stars` -> Create a new star.
    *   `GET /stars/{star_id}` -> Read data for a specific star.
    *   `PUT /stars/{star_id}` -> Update a star's data (replace the entire resource).
    *   `DELETE /stars/{star_id}` -> Delete a star.
3.  **Define Representations.** Sketch the JSON structure for your "Star" resource. What fields does it have? E.g., `{"id": "proxima_centauri", "mass_kg": 2.445e29, "type": "M-type"}`.
4.  **Assign Status Codes.** For each method-resource pair, determine the correct HTTP status codes for success and failure. `GET /stars/proxima_centauri` should return `200 OK` on success or `404 Not Found` if it doesn't exist. `POST /stars` should return `201 Created` on success.
5.  **Plan for Collections (Pagination).** A `GET /stars` request could return millions of results. Plan how to break this into pages. A common method is limit/offset: `GET /stars?limit=100&offset=200` would retrieve stars 201 through 300.
6.  **Plan for Change (Versioning).** Your star model might change; perhaps you'll add an `age_gyr` field. How do you introduce this without breaking old clients? The most common strategy is URI versioning: `/api/v1/stars` becomes `/api/v2/stars`.

## Key ideas, with intuition
1.  **Resources are Nouns, Methods are Verbs.** This is the central principle. The Uniform Resource Identifier (URI) points to a *thing* (a resource), not an *action*. You do not design an endpoint like `/getUser?id=123`. Instead, the user is the resource, identified by `/users/123`, and the action is the HTTP method you use to access it, `GET`. This creates a clean, predictable structure.

2.  **Statelessness.** Every request from client to server must contain all the information needed for the server to fulfill it. The server does not store any session state about the client between requests. Imagine a calculator that forgets the previous number after every operation; you must provide both operands for every calculation. This constraint simplifies server design and makes scaling horizontally (adding more servers) trivial, as any server can handle any request.

3.  **Idempotency.** An operation is idempotent if making the request once has the same effect as making it multiple times.
    *   `GET`, `PUT`, `DELETE` are idempotent. `GET /stars/sirius` will always return the same data. `DELETE /stars/sirius` will delete it the first time, and subsequent calls will result in `404 Not Found`, but the system state (Sirius is gone) remains the same.
    *   `POST` is *not* idempotent. Sending `POST /stars` twice will create two new, distinct stars.
    This property is critical for building robust clients that can safely retry requests after a network failure.

4.  **Standardized Interface.** REST leverages existing standards instead of inventing new ones. By using HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) and status codes (`2xx` for success, `4xx` for client errors, `5xx` for server errors), developers have a common, well-understood vocabulary for interacting with any REST API.

## Worked example
Let's design an API endpoint to log a new telemetry reading from a deep space probe.

**Goal:** Create a new telemetry reading for a probe named `voyager1`.

1.  **Identify Resource & URI:** The resource is a "telemetry reading". It belongs to a specific probe. A good URI structure would be `/probes/{probe_id}/telemetry`.
2.  **Choose HTTP Method:** We are creating a new resource, so we use `POST`.
3.  **Construct the Request:**
    *   **Method:** `POST`
    *   **URI:** `/api/v1/probes/voyager1/telemetry`
    *   **Headers:** `Content-Type: application/json` (Tells the server we are sending JSON data).
    *   **Body:** A JSON object representing the new telemetry reading.
        ```json
        {
          "timestamp": "2023-10-27T10:00:00Z",
          "subsystem": "power",
          "metric": "RTG_output_watts",
          "value": 249.0
        }
        ```
4.  **Server Processes the Request:** The server receives the request, validates the data (is the timestamp valid? is the value a number?), creates a new telemetry record in its database, and assigns it a unique ID (e.g., `tel_id_98765`).
5.  **Server Constructs the Response:**
    *   **Status Code:** `201 Created`. This specifically means a new resource was successfully created.
    *   **Headers:** `Location: /api/v1/probes/voyager1/telemetry/tel_id_98765` (A URL pointing to the newly created resource).
    *   **Body:** The full representation of the newly created resource, including the server-generated ID.
        ```json
        {
          "id": "tel_id_98765",
          "timestamp": "2023-10-27T10:00:00Z",
          "subsystem": "power",
          "metric": "RTG_output_watts",
          "value": 249.0
        }
        ```

**Reflection:** Each step followed a RESTful principle. The URI (`/probes/voyager1/telemetry`) identified a collection of nouns. The method (`POST`) was the correct verb for creation. The headers and status codes (`Content-Type`, `201 Created`, `Location`) used HTTP standards to communicate metadata clearly and efficiently. The request was stateless; it contained all information needed.

## Diagrams
A typical REST API request-response cycle.

```text
+-----------+                                                     +-----------+
|  Client   |                                                     |  Server   |
+-----------+                                                     +-----------+
      |                                                                 |
      |   1. Request Message                                            |
      |---------------------------------------------------------------->|
      |   POST /api/v1/probes/voyager1/telemetry HTTP/1.1               |
      |   Host: api.nasa.gov                                            |
      |   Content-Type: application/json                                |
      |                                                                 |
      |   { "timestamp": "...", "value": 249.0 }                        |
      |                                                                 |
      |                                                                 |
      |                                                                 |
      |                                                                 |
      |   2. Response Message                                           |
      |<----------------------------------------------------------------|
      |   HTTP/1.1 201 Created                                          |
      |   Location: /api/v1/probes/voyager1/telemetry/tel_id_98765      |
      |   Content-Type: application/json                                |
      |                                                                 |
      |   { "id": "tel_id_98765", "timestamp": "...", ... }             |
      |                                                                 |
```

## Memory technique — remember this forever
1.  **The Library Analogy:**
    *   **Library:** The Server/API.
    *   **Books:** The Resources (Nouns). Each book has a unique call number (URI), e.g., `/books/0-345-39180-2`.
    *   **Your Actions:** The HTTP Methods (Verbs). `GET` (read the book), `POST` (donate a new book), `PUT` (replace a damaged book with a new copy), `DELETE` (remove a book from the collection).
    *   **Librarian's Response:** The Status Code. `200 OK` ("Here is the book you wanted."), `201 Created` ("Thank you for your donation; it's now on the shelf at this location."), `404 Not Found` ("We don't have that book.").
    *   **Book Editions:** Versioning (`/api/v1/books/...`, `/api/v2/books/...`).
    *   **Card Catalog Pages:** Pagination (`/books?page=2&per_page=50`).

2.  **Must Overlearn:**
    *   **CRUD to HTTP Mapping:**
        *   Create -> `POST`
        *   Read -> `GET`
        *   Update -> `PUT` / `PATCH`
        *   Delete -> `DELETE`
    *   **Status Code Classes:**
        *   `2xx` -> Success (e.g., `200 OK`, `201 Created`, `204 No Content`)
        *   `4xx` -> Client Error (e.g., `400 Bad Request`, `401 Unauthorized`, `404 Not Found`)
        *   `5xx` -> Server Error (e.g., `500 Internal Server Error`, `503 Service Unavailable`)

3.  **Spaced Repetition Schedule:** Review this material at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively try to design a simple API for a concept in your field during each review.

4.  **First Principles Pathway:** If you forget everything, start with the HTTP protocol. You have a client and a server. You need to create, read, update, and delete data. HTTP gives you methods (`GET`, `POST`, etc.), URIs to identify things, and status codes to report outcomes. How would you combine these tools in the most logical, reusable, and scalable way? You will independently re-derive the core principles of REST.

## Common mistakes
1.  **Verbs in URIs:** Creating endpoints like `/rockets/getLaunchInfo?id=falcon9` instead of the correct `GET /rockets/falcon9/launchInfo`. The URI identifies the resource, the HTTP method is the verb.
2.  **Using GET for State Changes:** A `GET` request must be safe and idempotent. Never use it to delete or modify data (e.g., `GET /rockets/falcon9/delete`). Search engine crawlers and proxies can follow `GET` links, which could lead to accidental data destruction.
3.  **Ignoring Status Codes:** Returning `200 OK` for everything, with an error message in the body. This breaks standard HTTP client libraries that rely on status codes to handle control flow. A client error (`4xx`) is fundamentally different from a server error (`5xx`).
4.  **Misusing PUT vs. PATCH:** `PUT` is for complete replacement of a resource. If you `PUT` to `/users/123` with only a new email address, you are implying the user's name and other fields should be deleted. `PATCH` is for partial updates.

## Self-check
1.  You are designing an API for a catalog of exoplanets. Define the five most important REST endpoints, specifying the HTTP method and URI for each. (e.g., list all planets, get one planet, create a planet, etc.).
2.  Your `GET /probes/voyager1/telemetry` endpoint returns 10 million records. Design a pagination strategy using query parameters. Specify the exact URL for requesting the third page of 50 items. What information must you include in the response body so the client knows how to request the next page?
3.  An existing, widely-used endpoint `GET /api/v1/stars/{star_id}` returns a star's mass in kilograms. For v2, the physics team insists that all masses must be represented in solar mass units for consistency. This is a breaking change for all existing clients. Propose two different versioning strategies (how to structure the API calls for v1 and v2) and briefly analyze the trade-offs of each.