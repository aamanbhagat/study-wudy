## What it is
HTTP/2 is a major revision of the HTTP network protocol that enables a more efficient use of network resources. Its key features—multiplexing, header compression, and server push—work together to reduce latency by allowing multiple requests and responses to be in flight concurrently over a single TCP connection. This is achieved by breaking down HTTP messages into binary-formatted frames, which are then interleaved and reassembled at the destination.

## Why it matters
In high-performance computing and physics, you often deal with web-based interfaces for data visualization, experiment control, or monitoring distributed systems. These interfaces frequently load dozens of small assets (graphs, data points, status icons). HTTP/2's multiplexing dramatically speeds up these dashboards by eliminating the overhead of setting up multiple connections, which is critical when monitoring a real-time physics experiment or a complex ML model training run. For aerospace, communication over high-latency satellite links is expensive; HTTP/2's single connection and header compression minimize round-trips and data transfer, making remote operation of probes or drones more responsive.

## When to study it
Before tackling HTTP/2, you must have a solid understanding of HTTP/1.1 and TCP. Specifically, ensure you can explain:
1.  **HTTP/1.1:** The request/response model, headers, methods (GET, POST), and status codes.
2.  **TCP:** The three-way handshake, connection establishment, and the concept of "head-of-line (HOL) blocking," where a slow response on a connection blocks all subsequent requests on that same connection.
If you cannot explain HOL blocking from first principles, review TCP before proceeding.

## How to study it (step by step)
1.  **Revisit the Problem:** Open the developer tools in your web browser (F12 or Ctrl+Shift+I). Go to the "Network" tab, disable the cache, and load a complex website (like a news site). Filter by HTTP/1.1 requests. Observe the "waterfall" diagram and notice how many connections are opened to the same domain. This is the problem HTTP/2 solves.
2.  **Inspect the Solution:** Now, find a modern website that uses HTTP/2 (most do, e.g., google.com). In the Network tab, you should see "h2" in the protocol column. Notice how many requests are handled over a single connection to the domain. Compare this waterfall to the HTTP/1.1 version.
3.  **Read the Abstract:** Read only the abstract and introduction of RFC 7540 (the HTTP/2 specification). Don't get bogged down in details. The goal is to understand the authors' stated motivation in their own words.
4.  **Isolate Multiplexing:** Draw a diagram comparing six requests (A, B, C for HTML, CSS, JS; D, E, F for images) over HTTP/1.1 (using multiple connections) versus HTTP/2 (using one connection with interleaved frames). Label the TCP handshake overhead in the first case.
5.  **Deconstruct HPACK:** Write down the full request headers for two consecutive requests to the same API endpoint from your browser's network tab. Manually identify every byte that is identical between the two. This is the redundancy HPACK eliminates.
6.  **Explain Server Push:** In one paragraph, explain to an imaginary colleague why Server Push is not the same as a WebSocket. Focus on initiation (server vs. client) and communication direction (unidirectional push vs. bidirectional).

## Key ideas, with intuition
1.  **A Single Connection with many "Streams":** HTTP/1.1 is like a single-lane road. One slow car (a slow response) blocks everyone behind it (head-of-line blocking). To get around this, browsers open multiple parallel roads (up to 6-8 TCP connections per domain), but each road requires its own setup cost (TCP handshake). HTTP/2 changes the road into a multi-lane highway (a single TCP connection) where each lane is a "stream". A request/response pair travels in its own stream. If one stream is slow, others can just overtake it. The messages are broken into small binary `FRAMES` (like packets) that are tagged with their stream ID, sent interleaved over the single connection, and reassembled on the other side.

2.  **Header Compression (HPACK) is Memory:** HTTP headers are very repetitive. On a single site, your browser might send the same `User-Agent` and `Accept` headers dozens of times. Instead of re-sending this redundant data, HPACK uses a clever form of compression. Both client and server maintain a shared table of headers they've seen before. When a header is sent, it can be replaced by a tiny index into this table. It's like agreeing on a shorthand: instead of saying "User-Agent: Mozilla/5.0...", you just say "#5". This uses a static table for ultra-common headers (`:method: GET`) and a dynamic table for headers specific to the connection.

3.  **Server Push is Proactive Delivery:** Normally, the browser requests `index.html`, parses it, sees a tag like `<link rel="stylesheet" href="style.css">`, and only then requests `style.css`. This is a wasted round trip. With Server Push, when the client requests `index.html`, a smart server can say, "I know you're going to need `style.css` immediately, so I'm pushing it to you now, even before you ask." The server sends a `PUSH_PROMISE` frame, which is like saying, "I'm about to send you the response for a request you haven't made yet." This populates the browser's cache, so when the browser parses the HTML and goes to request the CSS, it's already there.

## Worked example
Let's trace a request for a simple webpage, `page.html`, which requires `main.css` and `app.js`.

**Scenario: HTTP/1.1 with Pipelining**

1.  **Client -> Server:** TCP Handshake (SYN, SYN-ACK, ACK).
2.  **Client -> Server:** `GET /page.html HTTP/1.1`
3.  **Client -> Server:** `GET /main.css HTTP/1.1` (Pipelined immediately after)
4.  **Client -> Server:** `GET /app.js HTTP/1.1` (Pipelined immediately after)
5.  **Server -> Client:** `200 OK` + `page.html` content.
6.  **Server -> Client:** `200 OK` + `main.css` content.
7.  **Server -> Client:** `200 OK` + `app.js` content.

*Reflection:* The requests are sent together, but the responses *must* arrive in the same order. If `page.html` is a large file that takes a long time for the server to generate, the responses for the small `main.css` and `app.js` files are blocked behind it, even though the server could have sent them earlier. This is head-of-line blocking at the HTTP level.

**Scenario: HTTP/2**

1.  **Client -> Server:** TCP Handshake.
2.  **Client -> Server:** HTTP/2 connection preface (settings frames).
3.  **Client -> Server:** A `HEADERS` frame for `GET /page.html` on Stream 1.
4.  **Client -> Server:** A `HEADERS` frame for `GET /main.css` on Stream 3.
5.  **Client -> Server:** A `HEADERS` frame for `GET /app.js` on Stream 5. (Streams initiated by the client must have odd numbers).
6.  **Server -> Client:** The server starts processing all three requests in parallel. It has the small `main.css` file ready first.
    *   `HEADERS` frame for `200 OK` on Stream 3.
    *   One or more `DATA` frames with `main.css` content on Stream 3.
7.  **Server -> Client:** Next, the `app.js` file is ready.
    *   `HEADERS` frame for `200 OK` on Stream 5.
    *   `DATA` frames with `app.js` content on Stream 5.
8.  **Server -> Client:** Finally, the larger `page.html` is ready.
    *   `HEADERS` frame for `200 OK` on Stream 1.
    *   `DATA` frames with `page.html` content on Stream 1.

*Reflection:* All communication happens over one TCP connection. The requests are mapped to streams. The server can send back response frames as they become available, interleaving them. The small, fast resources (`main.css`, `app.js`) are not blocked by the slow one (`page.html`), dramatically reducing the total page load time.

## Diagrams
Here is a comparison of HTTP/1.1 multiple connections vs. HTTP/2 multiplexing.

```text
HTTP/1.1 (Multiple Connections)

Client |------------------------------------------------->| Server
       | TCP Handshake 1 |                                |
       | GET resource A  |------------------------------>|
       |<------------------------------| Response A      |
       | TCP Handshake 2 |                                |
       | GET resource B  |------------------------------>|
       |<------------------------------| Response B      |
       (High overhead, slow start for each connection)


HTTP/2 (Multiplexing on a Single Connection)

Client |------------------------------------------------->| Server
       | TCP Handshake (once) |                           |
       | Settings Frames      |                           |
       |                      | Stream 1: GET A --------> |
       |                      | Stream 3: GET B --------> |
       |                      |                           |
       | <-------------------- Stream 3: Response B Data |
       | <-------------------- Stream 1: Response A Data |
       | <-------------------- Stream 3: Response B Data |
       (Frames are interleaved, no head-of-line blocking)
```

## Memory technique — remember this forever
1.  **Mnemonic:** **"One Big Pipe, Many Fast Streams."**
    *   **One Big Pipe:** Reminds you that HTTP/2 uses a single TCP connection, eliminating handshake overhead.
    *   **Many Fast Streams:** Reminds you of multiplexing, where each request/response pair gets its own stream, avoiding head-of-line blocking. The "Fast" part links to HPACK (less data to send) and Server Push (no waiting).

2.  **Facts to Overlearn:**
    *   HTTP/2 uses a single, long-lived TCP connection per origin.
    *   Communication is broken into binary `FRAMES`, each tagged with a `Stream ID`.
    *   HPACK compresses redundant headers using static and dynamic tables.

3.  **Spaced Repetition Schedule:**
    *   Review these concepts in 1 day.
    *   Review again in 3 days.
    *   Review again in 7 days.
    *   Review again in 16 days.
    *   Review again in 35 days.
    At each review, try to re-draw the diagram from memory and explain the "One Big Pipe" mnemonic.

4.  **First Principles Pathway:** If you forget the details, rebuild from the limitations of HTTP/1.1.
    *   Start with: "HTTP/1.1 is text-based and sequential."
    *   Problem 1: One request/response per connection at a time. Slow.
    *   Solution: Pipelining. But this leads to head-of-line blocking.
    *   Better solution: Multiple TCP connections. But TCP handshakes are expensive.
    *   *This leads to the need for HTTP/2's multiplexing over a single connection.*
    *   Problem 2: Text headers are verbose and repetitive. `User-Agent`, `Cookie`, etc., are sent over and over.
    *   *This leads to the need for HTTP/2's HPACK header compression.*

## Common mistakes
1.  **Confusing HTTP/2 Streams with TCP Connections:** Students often think a "stream" is just another TCP connection. It is not. A stream is a logical, bidirectional sequence of frames *inside* a single TCP connection. Many streams are multiplexed over one connection.
2.  **Assuming HPACK is just Gzip:** Gzip is a generic compressor that works on a single block of text. It cannot exploit redundancy *between* requests. HPACK is stateful; it builds a dictionary (the dynamic table) over the life of a connection, allowing it to achieve much higher compression ratios for headers across many requests.
3.  **Treating Server Push as a Magic Bullet:** Server Push can harm performance if used incorrectly. Pushing a resource the user already has cached is a waste of bandwidth. The logic for deciding *what* to push is non-trivial, which is why its adoption has been slower than other HTTP/2 features.

## Self-check
1.  Explain precisely how HTTP/2 multiplexing solves the head-of-line blocking problem that affects HTTP/1.1 pipelining. What is the fundamental unit of communication that enables this?
2.  A client makes 10 requests to the same server over a single HTTP/2 connection. The 1st and 10th requests contain a new, unique `X-Request-ID` header, but are otherwise identical. Describe how HPACK would handle the headers for the 1st, 2nd, and 10th requests. Which request's headers would be the smallest in size, and why?
3.  Consider a web application with a complex user-specific dashboard. The dashboard's structure is defined by `dashboard.js`, but the specific widgets to display are determined by user data fetched from `/api/widgets`. Would it be a good idea to use Server Push to send `dashboard.js` along with the initial `index.html`? What if you also pushed a common `charts-library.js`? Argue the trade-offs.