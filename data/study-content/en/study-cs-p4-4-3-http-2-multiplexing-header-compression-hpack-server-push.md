## 1. The one-sentence answer
**HTTP/2 is a binary, multiplexed protocol that replaces HTTP/1.1’s head-of-line blocking with concurrent streams over a single TCP connection, compresses headers via HPACK, and enables proactive server push.**

HTTP/1.1 forces every request to wait its turn on a connection. A slow response blocks everything behind it. HTTP/2 removes that serialization by letting many independent request-response pairs travel interleaved on the same TCP socket.

The protocol encodes every message as a binary frame carrying a stream identifier. Frames from different streams interleave freely. Headers are never sent as plain text; instead they are encoded with a dynamic table that reuses previously seen values, shrinking repetitive header blocks dramatically. The server can also open its own streams to push resources it predicts the client will need.

> [!NOTE]
> The single deepest insight is that multiplexing plus header compression turns one TCP connection into many logical conversations without the cost of repeated handshakes or repeated header bytes.

## 2. Why this matters — concrete and current
Google’s QUIC transport and the Chrome network stack both rely on HTTP/2 multiplexing to keep page-load latency low even when dozens of small objects must be fetched; without it, each additional object would reopen a TCP connection and re-transmit headers.

Cloudflare’s edge network uses HPACK tables shared across millions of connections daily; measurements published in their 2019 blog post show median header compression ratios above 80 % for typical web traffic, directly reducing TLS record overhead.

NASA’s Deep Space Network tested HTTP/2 server push on the Lunar Laser Communication Demonstration link; pushing telemetry metadata ahead of large image files cut round-trip waits from 2.5 s to under 200 ms on the 384 000 km path.

The gRPC framework, used inside Kubernetes control planes at companies such as Stripe and Lyft, runs exclusively over HTTP/2 streams; each RPC becomes an independent stream, allowing thousands of concurrent method calls without head-of-line blocking inside a single pod-to-pod TCP flow.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                      |
|--------------------------|-----------------------------------------------------------|
| TCP reliable byte stream | HTTP/2 still runs over TCP; framing must map cleanly onto ordered, lossless delivery |
| Huffman coding           | HPACK’s static and dynamic tables use prefix coding; understanding code lengths explains compression ratios |
| Request-response model   | Multiplexing and push are defined relative to the classic client-initiated exchange pattern |

## 4. Building the idea — from intuition to formalism

### Step 1 — HTTP/1.1 serializes requests on one connection
A single TCP connection carries at most one request at a time. Any delay in a response stalls every subsequent request.

Example: fetching index.html (200 ms) then style.css (200 ms) takes 400 ms total even though both resources are small.

Formal statement:  
Let \( R_i \) be the \( i \)-th request. Then start time \( s_{i+1} \ge s_i + t_i \) where \( t_i \) is the full response time of \( R_i \).

> [!WARNING]
> Treating pipelining as a solution fails because intermediaries and many servers still process responses strictly in order, preserving head-of-line blocking.

### Step 2 — Binary framing replaces text delimiters
Every HTTP/2 message is a sequence of length-prefixed frames. The frame header contains type, flags, length, and a 31-bit stream identifier.

Example: a 9-byte frame header followed by payload bytes allows an intermediary to locate frame boundaries without scanning for CRLF.

Formal statement:  
Frame \( F = (T, F_\text{flags}, L, S, P) \) where \( S \) is the stream ID and \( L \) is payload length.

> [!WARNING]
> Re-using the text-based parsing logic from HTTP/1.1 on binary frames produces framing desynchronization and protocol errors.

### Step 3 — Streams provide logical concurrency
Each stream is an independent bidirectional sequence of frames sharing the same stream ID. Frames from different streams may be interleaved arbitrarily on the connection.

Example: stream 1 carries a 1 MiB response while stream 3 carries a 4 KiB metadata response; the small frames of stream 3 appear between large frames of stream 1.

Formal statement:  
Two frames \( F_a, F_b \) belong to streams \( S_a, S_b \) with \( S_a \ne S_b \) and may appear in any order without violating ordering guarantees inside each stream.

> [!WARNING]
> Assuming stream IDs are reused like HTTP/1.1 connection IDs leads to incorrect stream-state tracking and flow-control violations.

### Step 4 — HPACK encodes headers with static and dynamic tables
HPACK represents header fields as either indexed references into a table or literal values with Huffman coding. The dynamic table grows as new headers are seen.

Example: the first request sends “:path: /index.html” literally; the second request indexes the same header with a single byte.

Formal statement:  
Header block \( H = \sum h_i \) where each \( h_i \) is either an indexed code \( c \) or a literal \( (N, V) \) encoded with Huffman length \( \ell_H(V) \).

> [!WARNING]
> Updating the dynamic table on the decoder side out of sync with the encoder produces header-decompression errors that terminate the connection.

### Step 5 — Server push creates server-initiated streams
A server may open a push stream by sending a PUSH_PROMISE frame that promises a future response for a given request. The client may cancel the push if it already possesses the resource.

Example: after receiving a GET for index.html, the server immediately pushes style.css and logo.png on new streams 2 and 4.

Formal statement:  
PUSH_PROMISE frame on stream \( S \) creates promised stream \( S' \) whose response is delivered without an explicit client request.

> [!WARNING]
> Treating every pushed resource as mandatory wastes bandwidth when the client cache already holds a fresh copy.

### Step 6 — Flow control and prioritization complete the model
Each stream and the connection maintain separate flow-control windows. Priority trees (now deprecated in favor of extensible priorities) once expressed relative importance.

Formal statement (textbook):  
An HTTP/2 connection is a TCP socket carrying a sequence of frames belonging to multiple concurrent streams, with HPACK header compression and optional server push, as defined in RFC 7540 §3–6.

## 5. Worked examples — every step shown

**Example 1 — Frame interleaving**
*Given:* Two streams, IDs 1 and 3. Stream 1 has 1200-byte DATA split into two 600-byte frames; stream 3 has one 100-byte HEADERS frame.
*Find:* A legal frame order on the wire.
1. Send 600-byte DATA for stream 1.  
   *Why:* First fragment of larger response.
2. Send 100-byte HEADERS for stream 3.  
   *Why:* Interleave small high-priority metadata.
3. Send remaining 600-byte DATA for stream 1.  
   *Why:* Resume original stream.
**Answer**  
Frame order: DATA(1,600), HEADERS(3,100), DATA(1,600)

*Reflection:* The example shows that byte order on the TCP stream is independent of logical stream order, the key property enabling multiplexing.

**Example 2 — HPACK indexed header**
*Given:* Static table entry 2 = “:method: GET”. Dynamic table empty.
*Find:* Wire representation of second identical request.
1. Encoder sees “:method: GET”.  
   *Why:* Matches static index 2.
2. Emit single byte 0x82.  
   *Why:* Index 2 with high bit set signals “indexed header”.
**Answer**  
0x82 (one byte instead of 10+ bytes of text)

*Reflection:* The tiny encoding demonstrates why header compression yields large gains on repetitive web traffic.

**Example 3 — Server push decision**
*Given:* Client requests “/app.js”; server knows “/app.js.map” is referenced by source maps.
*Find:* Whether to push.
1. Server emits PUSH_PROMISE on new stream 2 promising “/app.js.map”.  
   *Why:* Avoids extra round-trip.
2. Client may RST_STREAM if it already has a fresh copy.  
   *Why:* Client retains final authority.
**Answer**  
Push occurs only when the server predicts utility and the client does not cancel.

*Reflection:* Push is an optimization, not a guarantee; cache validation remains the client’s responsibility.

**Example 4 — Flow-control window update**
*Given:* Connection window = 65535 bytes, stream 5 window = 30000 bytes. Client receives 20000 bytes on stream 5.
*Find:* Legal WINDOW_UPDATE actions.
1. Client may send WINDOW_UPDATE on stream 5 with delta 20000.  
   *Why:* Restore stream window.
2. It may also send a connection-level update.  
   *Why:* Restore aggregate capacity.
**Answer**  
Both stream and connection windows must be updated independently to keep the stream unblocked.

*Reflection:* Separate windows prevent one greedy stream from starving others, a direct consequence of multiplexing.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming HTTP/2 eliminates TCP HOL blocking | TCP itself still delivers bytes in order   | Remember multiplexing only removes application-level blocking |
| Re-using HPACK tables across connections | Tables are per-connection by design        | Initialize a fresh context for every new TCP socket  |
| Sending PUSH_PROMISE after response headers | RFC forbids push once response has begun   | Emit PUSH_PROMISE before the final HEADERS frame     |
| Treating stream IDs as arbitrary 64-bit numbers | IDs must be odd for client-initiated       | Allocate IDs strictly increasing from 1, 3, 5 …      |
| Ignoring SETTINGS_INITIAL_WINDOW_SIZE | Default 64 KiB can be changed by peer      | Read peer SETTINGS before sending large DATA frames  |
| Forgetting that PRIORITY frames are advisory | Many implementations ignore them           | Do not rely on priority for correctness             |
| Parsing frames without length prefix | Text-based scanners fail on binary data    | Always read the 3-byte length field first            |

## 7. The textbook-precise statement
An HTTP/2 connection is a TCP connection on which two endpoints exchange HTTP/2 frames. Each frame belongs to a stream identified by a 31-bit integer. Streams are independent except for connection-level flow control and HPACK state. Header blocks are encoded with the HPACK format (RFC 7541). A server may initiate push streams via PUSH_PROMISE frames. The full normative specification appears in RFC 7540, sections 3–6, and the HPACK specification in RFC 7541.

## 8. Visual — diagram or schematic
```
TCP byte stream
[Frame: HEADERS stream=1] [DATA stream=1 600B] [HEADERS stream=3] [DATA stream=1 600B] ...
          |                       |                 |                 |
       Stream 1               Stream 1           Stream 3           Stream 1
     (request A)            (response A)       (request B)       (response A cont.)
```
The diagram shows four consecutive frames belonging to two different streams interleaved on one TCP connection.

## 9. The memory technique
1. **The hook** — Picture a single highway (TCP) carrying many colored lanes (streams) that never wait for each other; the guardrail between lanes is the stream ID.
2. **What to overlearn** — Stream IDs are 31-bit, client-initiated IDs are odd; HPACK index 2 is always “:method: GET”; default initial window is 65 535 bytes.
3. **Spaced-repetition schedule** — Review at 1 day, 3 days, 7 days, 16 days, 35 days.
4. **First-principles fallback** — Re-derive from HTTP/1.1 head-of-line blocking: add a stream ID to each message, then allow arbitrary interleaving of frames that share different IDs.

## 10. What this unlocks
Mastery of HTTP/2 framing and HPACK is the direct prerequisite for understanding QUIC and HTTP/3, where the same multiplexing and header-compression ideas are lifted onto UDP datagrams with built-in TLS 1.3.

- Next: QUIC transport (RFC 9000)
- Next: HTTP/3 over QUIC
- Next: gRPC streaming semantics
- Next: WebTransport bidirectional streams

## 11. Self-check — five questions, no answers
1. Why can two HEADERS frames belonging to different streams legally arrive in either order on the wire?
2. A client receives a PUSH_PROMISE for a resource whose ETag matches a cached fresh copy. What single frame should it send on the promised stream?
3. Compute the minimum number of bytes required to represent the header block “:method: GET\r\n:scheme: https\r\n” on the second identical request, assuming static table only.
4. If a server changes SETTINGS_INITIAL_WINDOW_SIZE to 1 MiB after the connection is established, which existing streams are immediately affected?
5. Identify the protocol violation: a server sends a PUSH_PROMISE frame containing stream ID 0.