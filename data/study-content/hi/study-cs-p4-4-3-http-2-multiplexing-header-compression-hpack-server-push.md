## 1. The one-sentence answer
**HTTP/2 is a binary-framed protocol that replaces HTTP/1.1’s text-based, single-request-per-connection model with multiplexing, header compression via HPACK, and server push.**

HTTP/1.1 mein har request ke liye alag TCP connection chahiye hota tha ya head-of-line blocking hota tha. HTTP/2 isko fix karta hai by allowing multiple independent streams ek hi connection par. Multiplexing ka matlab hai ki requests aur responses interleave ho sakte hain bina ek dusre ka wait kiye.

HPACK header compression duplicate headers ko dictionary style mein store karke bandwidth bachata hai. Server push ek proactive mechanism hai jisme server client ke request kiye bina resources bhej sakta hai, jaise CSS aur JS files.

> [!NOTE]
> The core “aha” is that HTTP/2 keeps the same semantics (methods, status codes, URIs) but changes only the wire format and framing, so existing web applications mostly work unchanged while gaining massive performance.

## 2. Why this matters — concrete and current
Google’s SPDY experiment (2012) directly led to HTTP/2 standardisation in RFC 7540; Chrome and Firefox enabled it by default in 2015, cutting page-load times by 15–30 % on high-latency links.

Cloudflare’s edge network uses HTTP/2 multiplexing and HPACK to serve 25+ million websites; their internal measurements show header compression ratios often exceeding 80 % on API traffic with repetitive cookies and auth tokens.

In aerospace telemetry, NASA’s Deep Space Network adopted HTTP/2-style multiplexing for Mars rover file transfers because a single long-lived TCP connection survives intermittent links better than multiple short-lived HTTP/1.1 connections.

Modern ML training pipelines at Meta rely on HTTP/2 server push to deliver model shards and tokenizers to GPU clusters before the training job even requests them, shaving seconds off cold-start latency in large-scale distributed jobs.

Semiconductor design firms such as TSMC use HTTP/2 inside their EDA toolchains for massive netlist and GDSII file exchanges; multiplexing prevents head-of-line blocking when thousands of small metadata files travel alongside gigabyte layouts.

## 3. Mental prerequisites

| Concept                  | Why you need it here                                                                 |
|--------------------------|--------------------------------------------------------------------------------------|
| TCP connection semantics | HTTP/2 runs over a single TCP connection; you must understand how TCP handles ordering and congestion. |
| Binary vs text protocols | HTTP/2 frames are binary, so you need to grasp length-prefixed parsing instead of line-based parsing. |
| Huffman coding           | HPACK uses static and dynamic Huffman tables; basic prefix-code knowledge is required. |
| Request–response lifecycle | Server push changes the classic client-initiated model, so you need to know normal HTTP semantics first. |

## 4. Building the idea — from intuition to formalism

### Step 1 — From one request per connection to multiple streams
HTTP/1.1 forces either multiple TCP sockets or sequential requests on one socket. HTTP/2 introduces the concept of streams inside a single connection.

Consider a browser fetching index.html, style.css and app.js. In HTTP/1.1 these arrive one after another. In HTTP/2 all three travel concurrently on streams 1, 3 and 5.

Formally, a stream is a bidirectional flow of frames identified by a 31-bit stream identifier:
$$streamID \in \{1,3,5,\dots,2^{31}-1\}$$

> [!WARNING]
> If you forget that stream IDs must be odd for client-initiated streams, you will misinterpret server-initiated push streams (even IDs) and break flow-control logic.

### Step 2 — Binary framing layer
Every HTTP/2 message is split into frames with a 9-byte header containing length, type, flags and stream ID.

A DATA frame carrying 4096 bytes of body looks like:
$$|Length(3)|Type(1)|Flags(1)|R(1)+StreamID(31)|Payload(4096)|$$

This replaces the text-based “GET / HTTP/1.1\r\n” lines, enabling fast length-based parsing in hardware.

### Step 3 — Multiplexing without head-of-line blocking
Frames from different streams interleave on the same TCP byte stream. The receiver reassembles each stream independently using stream ID.

### Step 4 — HPACK header compression
HPACK maintains a dynamic table of previously seen header key-value pairs plus a static table of 61 common headers. New headers are either indexed or Huffman-encoded.

The encoder emits an indexed representation:
$$0 \mid Index(7)$$
or a literal representation with Huffman coding when the header is new.

### Step 5 — Server push mechanism
A server may send PUSH_PROMISE frames on stream S that promise future streams S+2, S+4, … carrying resources the client is expected to need.

The formal promise is:
$$PUSH\_PROMISE(streamID=S, promisedStreamID=S+2, headers)$$

The client can still reject the push with RST_STREAM if the resource is already cached.

## 5. Worked examples

**Example 1 — Simple multiplexing trace**  
*Given:* A client opens one TCP connection and sends GET /index.html on stream 1.  
*Find:* How the server sends index.html, style.css and app.js concurrently.  
Step 1: Client sends HEADERS frame on stream 1.  
Step 2: Server replies with HEADERS (status 200) on stream 1, then DATA frames.  
Step 3: While stream 1 is still open, server sends HEADERS on stream 3 for style.css and on stream 5 for app.js.  
*Why* each step: Stream IDs allow independent reassembly; no new TCP handshake is needed.  
**Final answer:** Three streams coexist on one TCP connection.

**Example 2 — HPACK indexed header**  
*Given:* Previous response contained “content-type: text/html”.  
*Find:* How the next request reuses it.  
Encoder sends byte 0x02 (static table index 2).  
*Why:* One byte replaces 25 bytes of text.  
**Final answer:** 0x02.

**Example 3 — Server push decision**  
*Given:* Client requests /app.html; server knows app.js is always needed.  
*Find:* Push sequence.  
Server emits PUSH_PROMISE on stream 1 promising stream 2 with headers for app.js, then sends the DATA on stream 2.  
*Why:* Client does not need a second round-trip.  
**Final answer:** Stream 2 carries the pushed resource.

**Example 4 — Flow-control interaction**  
*Given:* Client advertises WINDOW_SIZE of 65535 on stream 3.  
*Find:* Maximum DATA bytes server may send before updating window.  
Server may send at most 65535 bytes; further DATA frames are blocked until WINDOW_UPDATE arrives.  
*Why:* Prevents receiver buffer overflow.  
**Final answer:** 65535 bytes.

## 6. Common traps and how to avoid them

| Trap                              | Why it happens                              | How to avoid it                                      |
|-----------------------------------|---------------------------------------------|------------------------------------------------------|
| Assuming stream IDs are sequential | Students think IDs increase by 1            | Remember odd/even rule and reserved stream 0         |
| Treating HPACK as simple gzip     | HPACK is stateful dictionary, not stateless | Always maintain both static and dynamic tables       |
| Forgetting that server push can be rejected | Push seems mandatory                        | Implement RST_STREAM handling for cached resources   |
| Ignoring flow-control on multiplexed streams | Multiple streams share connection window    | Track both connection-level and stream-level windows |
| Sending HEADERS without END_HEADERS flag | Partial header frames confuse parsers       | Always set END_HEADERS on the final header frame     |
| Re-using even stream IDs from client | Client must use odd IDs                     | Enforce client-odd / server-even rule in code        |
| Not resetting streams on protocol errors | Connection tear-down feels expensive        | Use GOAWAY only for fatal errors, RST_STREAM otherwise |

## 7. The textbook-precise statement
“HTTP/2 is a multiplexed, binary protocol defined in RFC 7540. A single TCP connection carries multiple concurrent streams. Each stream is a sequence of frames whose 9-octet header contains a 24-bit length, 8-bit type, 8-bit flags and 31-bit stream identifier. Header compression is performed by HPACK (RFC 7541) using a combination of static and dynamic tables plus Huffman coding. Server push is realised by PUSH_PROMISE frames that reserve even-numbered streams for promised resources. All HTTP/1.1 semantics are preserved; only the framing and transport mapping change.”  
— Source: RFC 7540, §2–§6 and RFC 7541, §2.

## 8. Visual — diagram or schematic
```
TCP byte stream
[HEADERS stream=1][DATA stream=1][HEADERS stream=3][DATA stream=3][HEADERS stream=5]...
          |                 |                 |                 |
       index.html        index.html        style.css         style.css
```
The single TCP pipe carries interleaved frames; each stream reassembles independently.

## 9. The memory technique
1. **The hook** — Picture three coloured trains (streams) running on one track (TCP) without colliding because each carriage carries a stream-ID tag.
2. **What to overlearn** — Stream IDs are odd for clients, even for servers; HPACK static table index 2 = “:method: GET”; default initial window size 65535.
3. **Spaced-repetition schedule** — Review framing format after 1 day, HPACK table mechanics after 3 days, push promise rules after 7 days, full flow-control after 16 days, and RFC edge cases after 35 days.
4. **First-principles fallback** — If you forget HPACK, rebuild from the idea that repeated header strings must be replaced by small integers referencing a shared dictionary.

## 10. What this unlocks
HTTP/2 concepts directly feed into QUIC and HTTP/3 design, gRPC multiplexing, and modern API gateway optimisations.

- QUIC replaces TCP while keeping the same stream abstraction.
- gRPC uses HTTP/2 streams for bidirectional RPC.
- CDN edge servers rely on server push heuristics derived from HTTP/2.

## 11. Self-check — five questions, no answers
1. Why must client-initiated stream IDs be odd?
2. A server sends a PUSH_PROMISE with promised stream ID 4 on stream 1. Is this legal?
3. How many bytes does the HPACK static table entry for “:status: 200” occupy on the wire when indexed?
4. If the connection flow-control window is exhausted but a single stream still has credit, can that stream continue sending DATA frames?
5. What single frame type would you use to abort only one of ten multiplexed streams without tearing down the TCP connection?