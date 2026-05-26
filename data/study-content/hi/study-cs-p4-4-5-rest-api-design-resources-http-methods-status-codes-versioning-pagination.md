## 1. The one-sentence answer
**REST API design is the practice of modelling server data as addressable resources and exposing them through a small set of HTTP methods, status codes, versioning rules and pagination mechanisms so that clients can interact with the system in a uniform, stateless and cacheable way.**

Iska matlab yeh hai ki aap har cheez ko ek noun (resource) ki tarah sochte ho — jaise /orders ya /users/42 — aur phir us resource par sirf standard HTTP verbs (GET, POST, PUT, DELETE) istemal karte ho. Har response mein ek clear status code hota hai jo batata hai ki operation success hua ya nahi. Versioning ensure karti hai ki purane clients bhi chalte rahein jab aap naye features add karte ho. Pagination badi lists ko chhote chunks mein todti hai taaki network aur memory dono par load na pade.

Yeh design style ek contract banata hai jo dono taraf ke developers ko ek dusre se independent rakhta hai. Ek baar contract sahi se define ho jaaye to frontend aur backend teams parallel mein kaam kar sakte hain bina roz baat kiye.

> [!NOTE]
> The single most important “aha” is that REST treats URLs as nouns and HTTP methods as verbs; once you internalise this noun-verb split, every other rule (status codes, versioning, pagination) becomes a natural consequence rather than an arbitrary checklist.

## 2. Why this matters — concrete and current
Stripe’s public API uses resource-oriented URLs (/v1/charges, /v1/customers) and predictable status codes so that thousands of fintech companies can integrate payments without reading source code.

GitHub’s REST API v3 still serves millions of requests per minute; its pagination headers (Link: <…>; rel="next") allow crawlers and IDE plugins to traverse repositories efficiently without hitting rate limits.

Kubernetes’ API server exposes every cluster object (pods, deployments, services) as REST resources; controllers inside the control plane rely on consistent HTTP semantics and status codes to reconcile desired state.

Shopify’s Admin API uses cursor-based pagination on the /orders endpoint so that merchants can fetch millions of orders in successive pages without ever loading the entire set into memory.

OpenAI’s fine-tuning endpoints accept JSONL files via POST /v1/files and return 200 with an id; the same resource URL later accepts GET to poll status, demonstrating how a single resource plus proper status codes can drive long-running asynchronous workflows.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| HTTP request/response cycle | Every REST interaction is an HTTP message; you must know what a method, header and body are. |
| URL syntax and path segments | Resources are identified by paths; you need to parse and construct them correctly. |
| JSON as a data format    | Almost all modern REST APIs exchange JSON; you must serialise and deserialise it. |
| Idempotency              | PUT and DELETE must be safe to retry; understanding this prevents duplicate side-effects. |

## 4. Building the idea — from intuition to formalism

### Step 1 — Identify the resource
Aap pehle decide karte ho ki duniya mein kaunsi cheez ko aap ek noun ki tarah model karna chahte ho. Concrete example: ek online store mein “order” ek resource hai, isliye URL /orders banega. Formally, a resource R is any addressable entity identified by a URI:  
$$R \subseteq \text{URI} \times \text{Representation}.$$  
> [!WARNING] Agar aap resource ko verb ke naam par rakhte ho (jaise /createOrder) to REST contract toot jaata hai aur caching aur discovery dono fail ho jaate hain.

### Step 2 — Choose the HTTP method
Method decide karta hai ki aap resource ke saath kya karna chahte ho. GET /orders/42 sirf data laata hai, POST /orders naya order banata hai. Formally, the method M belongs to the set {GET, POST, PUT, PATCH, DELETE} and its semantics are defined by RFC 9110.  
> [!WARNING] POST ko har jagah daal dena idempotency kharab karta hai; retry karne par duplicate orders ban sakte hain.

### Step 3 — Return an appropriate status code
Status code ek single integer hai jo outcome batata hai. 201 Created batata hai ki POST ne successfully naya resource banaya. Formally, status code \( s \in \{1xx,2xx,3xx,4xx,5xx\} \) aur har class ka meaning fixed hai.  
> [!WARNING] 200 OK har jagah use karne se client ko pata nahi chalta ki resource actually bana ya sirf update hua.

### Step 4 — Introduce versioning
Jab aap schema change karte ho to purane clients ko break na karna pade. Common practice hai URL mein prefix: /v1/orders. Formally, a version identifier V is part of the URI authority or path so that two versions remain distinct resources.  
> [!WARNING] Header-based versioning (Accept: application/vnd.company.v2+json) log aur cache dono mein mushkil paida karti hai.

### Step 5 — Add pagination metadata
Badi collections ko page-wise laana padta hai. Query parameters ?limit=20&offset=40 ya cursor-based ?after=xyz istemal hote hain. Formally, a paginated response is a triple (items, next_cursor, total_count) with the guarantee that repeated calls with the same cursor return identical results.  
> [!WARNING] Offset-based pagination mein page drift hota hai jab beech mein records insert/delete ho jaayein.

## 5. Worked examples — har step show karo

**Example 1 — Fetch a single order**  
*Given:* Order 42 exists.  
*Find:* Its current state via REST.  
Step 1: Choose resource → /orders/42.  
Step 2: Choose method → GET (safe, idempotent).  
Step 3: Server replies 200 OK + JSON body.  
*Why* each step: GET because we only read; 200 because resource exists.  
**Final answer**  
```http
GET /v1/orders/42 HTTP/1.1
```
```json
{"id":42,"status":"shipped"}
```

*Reflection*: Simple case shows noun-verb separation; same pattern scales to any read operation.

**Example 2 — Create a new order**  
*Given:* Client wants to place an order for user 7.  
*Find:* Correct request that returns the created resource.  
Step 1: Resource → /orders.  
Step 2: Method → POST (not idempotent).  
Step 3: Status → 201 Created + Location header.  
**Final answer**  
```http
POST /v1/orders HTTP/1.1
{"user_id":7,"items":[…]}
```
Response: 201 Created, Location: /v1/orders/99.  
*Reflection*: 201 vs 200 distinction is crucial for clients that need the new URI.

**Example 3 — Versioned update**  
*Given:* v1 and v2 have different order schemas.  
*Find:* Safe way to update without breaking v1 clients.  
Step 4: Use /v2/orders/42 with PUT.  
**Final answer**  
```http
PUT /v2/orders/42 HTTP/1.1
{"status":"delivered"}
```
*Reflection*: URL versioning keeps both contracts simultaneously live.

**Example 4 — Paginated list with cursor**  
*Given:* 10 000 orders.  
*Find:* First two pages without duplicates.  
Step 5: First request uses ?limit=50.  
Response contains "next_cursor":"abc123".  
Second request: GET /v1/orders?limit=50&after=abc123.  
**Final answer**  
Two disjoint sets of 50 orders each.  
*Reflection*: Cursor survives inserts/deletes that would break offset pagination.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                              | How to avoid it                              |
|-----------------------------|---------------------------------------------|----------------------------------------------|
| Using POST for every action | Developers treat HTTP as RPC                | Map actions to nouns or use PATCH for partial updates |
| Returning 200 for every response | Copy-paste from tutorials                   | Choose status code from the 4xx/5xx families when error semantics apply |
| Embedding version in query param | Easy to implement but pollutes caching      | Put version in path prefix                   |
| Offset pagination on mutable collections | Simple SQL LIMIT/OFFSET                     | Prefer cursor or keyset pagination           |
| Exposing internal IDs as resource keys | Database primary keys leak                    | Use opaque or hashed identifiers             |
| Ignoring idempotency headers | Developers forget PUT vs POST semantics     | Document and test idempotency keys           |
| Mixing singular and plural nouns | Inconsistent team conventions               | Standardise on plural nouns everywhere       |

## 7. The textbook-precise statement
A REST API is defined by five constraints (client-server, stateless, cache, uniform interface, layered system) as stated in Fielding, *Architectural Styles and the Design of Network-based Software Architectures*, 2000, Chapter 5. Resources are identified by URIs; methods are restricted to those with defined semantics in RFC 9110; representations are negotiated via media types; and versioning is achieved by treating distinct URI paths as distinct resources. Pagination is an application-level concern that must preserve the uniform interface contract.

## 8. Visual — diagram or schematic
```
Client                  Server
  |                         |
  | GET /v1/orders?limit=20 |
  |------------------------>|
  | 200 OK + items + next   |
  |<------------------------|
  | GET /v1/orders?after=xyz|
  |------------------------>|
  | 200 OK + next page      |
  |<------------------------|
```

## 9. The memory technique

1. **The hook** — Picture a restaurant menu: dishes are resources (/menu/pasta), you only say “give”, “add”, “replace”, “remove” (GET/POST/PUT/DELETE); the waiter answers with 200, 201, 404 exactly like status codes.
2. **What to overlearn** — The five core methods and their idempotency: GET (yes), POST (no), PUT (yes), DELETE (yes), PATCH (conditional).
3. **Spaced-repetition schedule** — Review the method table after 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — If you forget a status code, ask: “Did the client do something wrong (4xx) or did the server fail (5xx)?”; that single question narrows the choice to two families.

## 10. What this unlocks
Once you can design clean REST endpoints you can safely expose data to mobile apps, third-party integrations and internal microservices without tight coupling.

- GraphQL schema stitching over existing REST resources
- OpenAPI contract generation and client SDK automation
- Rate-limiting and caching layers that rely on HTTP semantics
- Event-driven architectures that treat POST responses as triggers

## 11. Self-check — five questions, no answers
1. Why is POST /orders non-idempotent while PUT /orders/42 is idempotent?
2. A client receives 204 after DELETE; what does this imply about the representation that will be returned on a subsequent GET?
3. You need to change only the “status” field of an order. Which method and which status code should you prefer?
4. Cursor pagination returns the same record twice across two pages. Which assumption of the pagination contract has been violated?
5. Two teams argue about putting the version in the URL versus the Accept header. Which approach preserves HTTP caching semantics more cleanly and why?