## 1. The one-sentence answer
**HTTP/1.1 ek text-based request-response protocol hai jo clients aur servers ke beech web resources exchange karta hai, methods se actions define karta hai, status codes se outcomes batata hai, headers se metadata pass karta hai, aur persistent connections se latency kam karta hai.**

HTTP/1.1 RFC 2616 mein specify kiya gaya tha. Iska core yeh hai ki har message ek start line, zero ya zyada headers, ek blank line, aur optional body se banta hai. Client ek request bhejta hai, server response deta hai, aur Connection header decide karta hai ki TCP socket band hoga ya reuse hoga.

Persistent connections (default on in HTTP/1.1) ka matlab hai ki ek hi TCP connection par multiple request-response pairs ho sakte hain bina har baar handshake kiye. Yeh bandwidth aur latency dono bachata hai jab multiple objects (HTML, CSS, images) ek hi page mein hote hain.

> [!NOTE]
> Sabse badi "aha" yeh hai ki HTTP/1.1 stateless hai per request lekin persistent connections state ko connection level par maintain karke performance deta hai bina protocol ko stateful banaye.

## 2. Why this matters — concrete and current
Cloudflare aur Akamai jaise CDNs HTTP/1.1 persistent connections ka use karke edge servers par thousands of concurrent clients ko serve karte hain bina har object ke liye naya TCP handshake kiye.

Google Chrome aur Firefox browsers abhi bhi HTTP/1.1 fallback support karte hain jab server HTTP/2 ya HTTP/3 na bole; unke network stacks mein Connection: keep-alive header automatically add hota hai.

Kubernetes aur Docker container orchestration mein liveness probes aur readiness probes HTTP/1.1 GET requests bhejte hain; 200 status code milna hi pod ko healthy maanta hai.

TLS 1.3 handshake ke baad bhi HTTP/1.1 ka use hota hai jab ALPN negotiation fail ho jaaye, jaise kuch legacy load balancers (AWS Classic ELB) mein dekha gaya hai.

SpaceX Starlink terminals apne onboard web interfaces mein HTTP/1.1 status codes (especially 503) ka use karke ground stations ko satellite health report karte hain.

## 3. Mental prerequisites

| Concept              | Why you need it here                                      |
|----------------------|-----------------------------------------------------------|
| TCP three-way handshake | Persistent connections iske upar build hote hain          |
| MIME types           | Content-Type header isko use karta hai                    |
| ASCII text encoding  | HTTP messages hamesha ASCII lines mein hote hain          |
| Client-server model  | Request-response flow is model par based hai              |

Agar TCP ya sockets aapko clear nahi hain to pehle woh padh lo.

## 4. Building the idea — from intuition to formalism

### Step 1 — Request line structure
HTTP/1.1 request ek single line se shuru hoti hai jisme method, URI aur version hota hai.  
Example: `GET /index.html HTTP/1.1`.  
Formal statement:  
`Request-Line = Method SP Request-URI SP HTTP-Version CRLF`  
> [!WARNING]
> Agar version galat likha (HTTP/1.0) to server persistent connection band kar sakta hai.

### Step 2 — Response status line
Server ek status line se reply karta hai: version, numeric code, aur reason phrase.  
Example: `HTTP/1.1 200 OK`.  
Formal:  
`Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase CRLF`

### Step 3 — Header fields
Headers key-value pairs hote hain jo metadata carry karte hain. Har header ek line mein hota hai aur colon se alag hota hai.  
Important headers: Host (mandatory in 1.1), Connection, Content-Length.

### Step 4 — Persistent connection semantics
Default behaviour: TCP connection band mat karo jab tak `Connection: close` na dikhe.  
Formal rule:  
Agar `Connection` header mein `close` token na ho to connection reusable hai.

### Step 5 — Method semantics
Safe methods (GET, HEAD) side-effect free hote hain. Idempotent methods (PUT, DELETE) repeat karne par same result dete hain.

### Step 6 — Status code classes
1xx informational, 2xx success, 3xx redirection, 4xx client error, 5xx server error.

### Step 7 — Complete message framing
Headers ke baad blank line (CRLF) body ko alag karta hai. Content-Length ya chunked encoding se body length pata chalta hai.

## 5. Worked examples — har step show karo

**Example 1 — Simple GET with persistent connection**  
*Given:* Client ek HTML page maang raha hai.  
*Find:* Poora request-response exchange.  
Request:  
```
GET /page.html HTTP/1.1
Host: example.com
Connection: keep-alive
```  
*Why:* Host header RFC 2616 requirement hai.  
Response:  
```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 127
Connection: keep-alive

<html>...</html>
```  
**Final answer**  
Connection abhi bhi khuli hai, agla request isi socket par bhej sakte ho.  
*Reflection:* Yeh example simple hai lekin Connection header dikhata hai ki 1.1 default alag hai 1.0 se.

**Example 2 — POST with 201 status**  
*Given:* Form data submit karna hai.  
*Find:* Status code aur body handling.  
Request mein `Content-Length: 35` aur body `name=alice&action=login`.  
Server reply `HTTP/1.1 201 Created` deta hai.  
**Final answer**  
201 matlab resource create ho gaya.  
*Reflection:* POST safe nahi hai isliye browser back button par confirm maangta hai.

**Example 3 — 301 redirect with Host header**  
*Given:* Old URL ko new URL par bhejna.  
*Find:* Location header ka use.  
Response: `HTTP/1.1 301 Moved Permanently` + `Location: https://new.example.com`  
**Final answer**  
Client naya request bhejta hai naye host par.  
*Reflection:* 3xx codes hamesha Location header ke saath aate hain.

**Example 4 — HEAD request for metadata**  
*Given:* Sirf headers chahiye bina body ke.  
*Find:* HEAD method ka result.  
Request: `HEAD /image.png HTTP/1.1`  
Response: `HTTP/1.1 200 OK` + headers lekin zero-length body.  
**Final answer**  
Bandwidth waste nahi hoti.  
*Reflection:* HEAD idempotent aur safe dono hai.

## 6. Common traps and how to avoid them

| Trap                        | Why it happens                          | How to avoid it                              |
|-----------------------------|-----------------------------------------|----------------------------------------------|
| Connection header ignore karna | 1.0 se habit                          | Hamesha explicit `keep-alive` ya `close` likho |
| Status 404 ko 400 samajhna   | Dono client errors lagte hain           | 4xx mein 404 resource missing, 400 syntax galat |
| Body ke bina Content-Length  | Chunked encoding bhool jaana            | RFC 2616 section 4.4 padho                   |
| Multiple Host headers        | Proxy misconfiguration                  | Sirf ek Host header rakho                    |
| Assuming all 2xx same hain   | 200, 201, 204 alag meaning rakhte hain  | Status code table yaad rakho                 |
| Persistent connection leak   | Server timeout ignore karna             | TCP keep-alive timers set karo               |
| Method case sensitivity      | GET/get mix karna                       | Methods hamesha uppercase likho              |

## 7. The textbook-precise statement
HTTP/1.1 is defined in RFC 2616 (Fielding et al., 1999). A message is either a request or a response. Every request must include a Host header. Persistent connections are the default; a connection remains open unless the `Connection: close` token appears in a request or response. Status codes are three-digit integers belonging to five classes. Methods are case-sensitive tokens; GET and HEAD are safe; PUT and DELETE are idempotent. Body length is signalled either by Content-Length or chunked transfer encoding.

## 8. Visual — diagram or schematic
```
Client                  Server
  |                         |
  |--- GET / HTTP/1.1 ----->|
  |    Host: a.com          |
  |    Connection: keep-alive
  |                         |
  |<-- HTTP/1.1 200 OK -----|
  |    Content-Length: 50   |
  |    Connection: keep-alive
  |                         |
  |--- GET /style.css ----->|   (same TCP socket)
  |                         |
  |<-- HTTP/1.1 200 OK -----|
```

## 9. The memory technique
1. **The hook** — Socho ek waiter (server) jo table (connection) band nahi karta jab tak customer explicitly “bill laao” (close) na bole.
2. **What to overlearn** — 200 = success, 404 = not found, Host header mandatory, Connection: keep-alive default.
3. **Spaced-repetition schedule** — 1 din baad, 3 din, 7 din, 16 din, 35 din.
4. **First-principles fallback** — Message = start-line + headers + CRLF + body; agar yeh yaad ho to har field alag-alag derive ho jaata hai.

## 10. What this unlocks
Yeh knowledge HTTP/2 multiplexing, HTTP/3 over QUIC, REST API design, aur web security headers samajhne ka foundation banata hai.

- Next: HTTP/2 frame structure
- Next: TLS handshake integration with HTTP
- Next: Caching headers (Cache-Control, ETag)

## 11. Self-check — five questions, no answers
1. Ek GET request mein body kyun allowed nahi hoti?
2. 204 aur 200 status code mein kya farak hai jab response body ki baat aaye?
3. Agar server `Connection: close` bhejta hai lekin client nahi maanta to kya hota hai?
4. HEAD request par server ko Content-Length header bhejna zaroori kyun hai?
5. Do successive requests same TCP connection par bhejte hue Host header dono baar kyun repeat karna padta hai?