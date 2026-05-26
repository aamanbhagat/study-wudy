## 1. The one-sentence answer
**REST API design organizes server functionality around addressable resources that clients manipulate through a uniform set of HTTP methods, status codes, and conventions for versioning and pagination.**

A resource is any named piece of data or capability—users, orders, sensor readings—exposed at a stable URL. Clients interact with these resources by sending HTTP requests whose method (GET, POST, PUT, DELETE) signals the intended operation, whose status code reports the outcome, and whose parameters control large result sets or evolution of the contract over time. The resulting interface is stateless, cacheable, and uniform, so any client that speaks HTTP can discover and use the service without custom protocol knowledge.

The uniformity removes the need for ad-hoc RPC styles; every interaction re-uses the same small vocabulary of verbs and response codes. Versioning and pagination are not afterthoughts but explicit mechanisms that keep the contract stable while data volumes and business rules change.

> [!NOTE]
> The single deepest insight is that URLs name nouns and HTTP methods name verbs; once this separation is respected, most design questions reduce to “which resource and which verb?” rather than inventing new endpoints.

## 2. Why this matters — concrete and current
Stripe’s public API uses resource-oriented URLs (`/v1/customers`, `/v1/charges`) together with idempotency keys and cursor-based pagination; this design lets thousands of independent fintech products integrate without breaking when Stripe adds new fields. NASA’s Earthdata REST endpoints expose satellite granules as resources with consistent status codes and offset/limit pagination, allowing climate researchers to script reproducible downloads across petabyte-scale archives. GitHub’s GraphQL layer still sits atop the same REST foundation; its issue and pull-request resources are versioned in the URL path (`/repos/{owner}/{repo}/issues`) and paginated with Link headers, enabling the entire open-source tooling ecosystem. Kubernetes’ API server exposes every cluster object (pods, deployments, nodes) through REST; controllers rely on precise status codes (409 Conflict, 422 Unprocessable Entity) and etcd-backed optimistic concurrency to maintain cluster state safely.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| HTTP request/response model | Supplies the transport and the uniform interface verbs    |
| URL syntax (RFC 3986)       | Defines how resources are named and hierarchically grouped |
| Idempotency                 | Determines safe retry behavior for PUT and DELETE         |
| Statelessness               | Guarantees that each request contains all required context |

## 4. Building the idea — from intuition to formalism

### Step 1 — Resources are nouns, not actions
A resource is any discrete, addressable piece of information. Identify it first; never embed the verb in the path.  
Example: the collection of users lives at `/users`; a single user lives at `/users/42`.  
Formal statement: a resource \( R \) is identified by a URI \( u \) such that repeated GET requests to \( u \) return representations of the same conceptual entity.  
> [!WARNING]  
> Treating an action (“sendEmail”) as a top-level resource produces non-uniform URLs that cannot be cached or discovered consistently.

### Step 2 — HTTP methods map to CRUD semantics
Use the method to indicate intent while keeping URLs stable. GET retrieves, POST creates, PUT replaces, PATCH modifies, DELETE removes.  
Example: `POST /users` creates a new user; the server responds with 201 and a Location header pointing to `/users/43`.  
Formal statement: method \( m \) applied to resource \( u \) yields state transition \( \delta(R,u,m) \).  
> [!WARNING]  
> Using POST for every write hides idempotency guarantees and defeats caches and load balancers.

### Step 3 — Status codes communicate outcome precisely
The three-digit code is the only universally understood signal of success or failure. 2xx means the request achieved its purpose; 4xx means client error; 5xx means server error.  
Example: attempting to create a duplicate username returns 409 Conflict, not 200.  
Formal statement: status code \( s \in \{200,201,204,400,404,409,500,\dots\} \) partitions the result space.  
> [!WARNING]  
> Returning 200 for every response masks errors and forces every client to parse bodies to detect failure.

### Step 4 — Versioning keeps contracts stable
Embed the version in the URL path or Accept header so that incompatible changes can coexist.  
Example: `/v2/users` versus `/v1/users`.  
Formal statement: version \( v \) selects representation \( R_v \) while preserving URI stability for clients that have not migrated.  
> [!WARNING]  
> Header-based versioning is invisible to simple caches and proxies unless Vary is set correctly.

### Step 5 — Pagination bounds result sets
Large collections must be split; supply limit/offset or cursor tokens so clients can iterate without memory exhaustion.  
Example: `GET /users?limit=50&cursor=abc123` returns the next page and a new cursor.  
Formal statement: collection \( C \) is partitioned into pages \( P_i = \{ r \in C \mid \text{order}(r) \ge t_i \} \) where token \( t_i \) encodes the boundary.  
> [!WARNING]  
> Offset pagination on rapidly changing data produces duplicates or skipped items; cursor pagination avoids this by using stable sort keys.

### Step 6 — Combining the elements yields the uniform interface
Any client that knows the five rules above can interact with any compliant service without additional documentation beyond the resource catalogue. The resulting contract satisfies the REST constraints of addressability, statelessness, and uniform methods.

## 5. Worked examples — every step shown

**Example 1 — Minimal resource creation**  
*Given:* an empty user collection.  
*Find:* the request that creates a user named “alice”.  
`POST /v1/users HTTP/1.1`  
`Content-Type: application/json`  
`{"name":"alice"}`  
*Why:* POST signals creation; the URL names the collection resource.  
Server replies:  
`HTTP/1.1 201 Created`  
`Location: /v1/users/7`  
**Final answer**  
`201 Created` with Location header.  
*Reflection:* The status code alone tells the client where to find the new resource; body inspection is unnecessary.

**Example 2 — Safe replacement**  
*Given:* existing user `/v1/users/7`.  
*Find:* idempotent update of email.  
`PUT /v1/users/7 HTTP/1.1`  
`{"name":"alice","email":"alice@example.com"}`  
*Why:* PUT replaces the entire representation and is safe to retry.  
Server replies `200 OK` (or `204 No Content`).  
**Final answer**  
`200 OK`.  
*Reflection:* Because PUT is idempotent, network retries cannot create duplicate users.

**Example 3 — Conflict detection**  
*Given:* two clients attempt simultaneous username change.  
*Find:* correct status when second request collides.  
Second request receives `409 Conflict`.  
*Why:* 409 signals that the current state precludes the requested change.  
**Final answer**  
`409 Conflict`.  
*Reflection:* Clients learn they must re-fetch before retrying.

**Example 4 — Cursor pagination**  
*Given:* 120 000 orders.  
*Find:* second page of 50 newest orders.  
`GET /v1/orders?limit=50&cursor=eyJpZCI6MTAwfQ==`  
Server returns orders 51–100 plus next cursor.  
*Why:* Cursor encodes the last seen primary key, preserving order even if new orders arrive.  
**Final answer**  
50 orders plus `next_cursor` token.  
*Reflection:* Cursor pagination tolerates inserts without skipping or duplicating rows.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                              |
|-----------------------------------|---------------------------------------------|----------------------------------------------|
| Using POST for all writes         | Developer treats HTTP as transport only     | Map POST to create, PUT/PATCH to update      |
| Returning 200 for validation errors | Desire to keep client code simple           | Use 4xx codes; reserve 2xx for success       |
| Version in query string           | Quick-and-dirty evolution                   | Use path segment or Accept header            |
| Offset pagination on mutable data | Assumes stable row order                    | Prefer cursor or keyset pagination           |
| Exposing internal IDs in URLs     | Leaks database keys                         | Use opaque or hashed identifiers             |
| Ignoring 429/Retry-After          | Rate-limit handling omitted                 | Always propagate Retry-After to clients      |
| Nested resources beyond two levels| Over-modeling relationships                 | Flatten or use query parameters              |

## 7. The textbook-precise statement
A REST API is defined by a set of resources \( R \), each identified by a URI, together with a fixed set of methods \( M = \{\text{GET, PUT, POST, DELETE, PATCH}\} \) whose semantics are those of the uniform interface constraint in Fielding’s architectural style (Fielding, “Architectural Styles and the Design of Network-based Software Architectures,” 2000, §5.2). Status codes partition the result space into success (2xx), client error (4xx), and server error (5xx). Versioning is realized by distinct resource identifiers or content negotiation. Pagination is an application-level mechanism that decomposes a collection resource into a sequence of partial representations linked by continuation tokens. The resulting system satisfies the six REST constraints: client-server, stateless, cacheable, uniform interface, layered system, and code-on-demand (optional).

## 8. Visual — diagram or schematic
```text
Client                  Server
  |                         |
  | GET /v1/orders?limit=50 |
  |------------------------>|
  |                         |  (resource /v1/orders)
  | 200 OK, 50 items,       |
  | next_cursor=abc         |
  |<------------------------|
  |                         |
  | GET /v1/orders?cursor=abc
  |------------------------>|
```

The diagram shows a client traversing a paginated collection resource; each response contains the next navigation token rather than an offset.

## 9. The memory technique
1. **The hook** — Picture a library: books are resources on shelves (URLs), the librarian’s verbs are GET (read), POST (add new book), PUT (replace a book), DELETE (remove). The card in the back tells you the outcome (status code).  
2. **What to overlearn** — GET is safe and idempotent; POST is neither; PUT and DELETE are idempotent but unsafe. Status codes 2xx success, 4xx client, 5xx server.  
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.  
4. **First-principles fallback** — Re-derive from “URL = noun, method = verb, status = outcome” and test each new endpoint against the idempotency table.

## 10. What this unlocks
Mastery of REST resource design directly enables construction of reliable, cache-friendly backends and client SDKs. It is the foundation for subsequent topics in distributed systems: hypermedia controls (HATEOAS), OpenAPI contract generation, rate-limiting algorithms, eventual consistency patterns, and GraphQL gateway layers that still speak REST to origin services.

## 11. Self-check — five questions, no answers
1. A client retries a POST that creates a payment; the server creates two records. Which constraint was violated and which method should have been used instead?  
2. An endpoint returns 200 OK with body `{"error":"invalid email"}`. Rewrite the response using only status codes.  
3. Design a URL and method to cancel an order without creating a new “cancellation” resource.  
4. Two clients fetch page 3 of a comment list using offset pagination; one client sees a duplicate comment that the other misses. Explain the race condition and propose a cursor-based fix.  
5. A new requirement adds a required field to the user resource. Show both the v1 and v2 request/response pairs that keep existing clients working.