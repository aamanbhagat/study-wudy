## What it is
Socket programming is the practice of writing programs that communicate over a network. A socket is an endpoint for this communication, an interface provided by the operating system that allows an application to send and receive data using network protocols like TCP or UDP. Think of it as a software equivalent of a physical network jack for your application.

## Why it matters
This is the fundamental API for all networked applications, from web browsers to distributed computing frameworks. In aerospace, ground control software uses sockets to send commands (TCP for reliability) and receive telemetry (UDP for low-latency, real-time data) from rockets and satellites. In physics and ML, large-scale simulations and training jobs distribute workloads across compute clusters using sockets for inter-node communication.

## When to study it
You must understand the TCP/IP model, specifically the roles of the Application, Transport, and Network layers. Crucially, you must know the conceptual difference between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol):
- **TCP**: Connection-oriented, reliable, stream-based. Guarantees that data arrives in order and without errors.
- **UDP**: Connectionless, unreliable, datagram-based. Offers no guarantees; packets may be lost, duplicated, or reordered.

If you cannot explain why you'd use one over the other, review that material first.

## How to study it (step by step)
1.  **Implement a TCP Echo Server:** Write a Python script that creates a TCP socket, binds it to a local address (e.g., `127.0.0.1`) and a port (e.g., `65432`), listens for incoming connections, and accepts one. When it receives data, it sends the exact same data back.
2.  **Implement a TCP Echo Client:** Write a second script that creates a TCP socket and connects to your server's address and port. It should send a message, receive the echo, print it, and then close the connection.
3.  **Run and Analyze:** Run the server, then the client. Observe the sequence of operations. Use a tool like `netstat` or `lsof` to see the socket states (`LISTEN`, `ESTABLISHED`).
4.  **Implement a UDP Time Server:** Write a script that creates a UDP socket and binds it to an address and port. It should wait to receive any datagram. Upon receipt, it sends back the current time to the source address it received the datagram from.
5.  **Implement a UDP Time Client:** Write a script that creates a UDP socket and sends a message (the content doesn't matter) to the server. It then waits to receive the time back and prints it.
6.  **Compare the Code:** Place the TCP server code and UDP server code side-by-side. Identify the key differences: TCP uses `listen()` and `accept()`, while UDP directly uses `recvfrom()`. Why does this reflect the connection-oriented vs. connectionless nature of the protocols?

## Key ideas, with intuition
1.  **Sockets are like File Descriptors:** The operating system presents sockets to your application as if they were files. You can `read()` from them and `write()` to them. This powerful abstraction, part of the "everything is a file" Unix philosophy, means you can use similar logic for network I/O as you do for disk I/O.
2.  **Address Family vs. Socket Type:** When creating a socket, you specify two things:
    - `socket.AF_INET`: The address family. This tells the OS you're using IPv4 addresses (e.g., `192.168.1.100`). `AF_INET6` is for IPv6. Think of this as choosing the format of the "street address."
    - `socket.SOCK_STREAM` or `socket.SOCK_DGRAM`: The socket type. `SOCK_STREAM` is for TCP, a continuous stream of data. `SOCK_DGRAM` is for UDP, which sends discrete packets called datagrams. Think of this as choosing between a "dedicated phone line" (TCP) or "sending individual postcards" (UDP).
3.  **The TCP Connection Lifecycle:** A TCP server doesn't just receive data; it manages connections. This maps directly to the function calls:
    - `socket()`: Create the socket endpoint.
    - `bind()`: Assign an address (IP and port) to the socket, like giving your house a street address.
    - `listen()`: Put the socket in server mode, enabling it to accept incoming connection requests. You are now "listening for the phone to ring."
    - `accept()`: Block until a client connects, then create a *new* socket just for communication with that specific client. You have "picked up the phone."
4.  **The UDP "Fire and Forget" Model:** A UDP server is simpler because it's connectionless.
    - `socket()`: Create the socket.
    - `bind()`: Assign an address.
    - `recvfrom()`: Block until a datagram arrives from *any* client. This call gives you both the data and the address of the sender, so you know where to reply. The client simply uses `sendto()`, specifying the server's address with each message.

## Worked example
Here is a complete, minimal TCP echo server and client in Python.

**TCP Echo Server (`server.py`)**
```python
import socket

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

# 1. Create a socket object
# AF_INET specifies IPv4. SOCK_STREAM specifies TCP.
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # 2. Bind the socket to the address and port
    s.bind((HOST, PORT))
    
    # 3. Listen for incoming connections
    s.listen()
    print(f"Server listening on {HOST}:{PORT}")
    
    # 4. Accept a connection
    # accept() blocks and waits for a connection.
    # It returns a new socket object (conn) for the connection
    # and the address (addr) of the client.
    conn, addr = s.accept()
    
    with conn:
        print(f"Connected by {addr}")
        while True:
            # 5. Receive data from the client
            # 1024 is the maximum number of bytes to receive at once.
            data = conn.recv(1024)
            if not data:
                break # If client closes connection, recv() returns empty bytes
            
            # 6. Send the data back (echo)
            conn.sendall(data)

print("Connection closed.")
```

**TCP Echo Client (`client.py`)**
```python
import socket

HOST = "127.0.0.1"  # The server's hostname or IP address
PORT = 65432        # The port used by the server

# 1. Create a socket object
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # 2. Connect to the server
    s.connect((HOST, PORT))
    
    # 3. Send data
    # Note: data must be bytes. We encode the string.
    s.sendall(b"Hello, world")
    
    # 4. Receive the echo
    data = s.recv(1024)

print(f"Received echo: {data.decode('utf-8')}")
```

**Reflection:**
- The `with` statement ensures sockets are automatically closed, which is crucial.
- The server uses two sockets: `s` for listening and `conn` for communicating with the connected client. This allows `s` to potentially accept other connections (in a more complex, multi-threaded server).
- The client's `connect()` call corresponds to the server's `accept()` call. The three-way handshake happens under the hood here.
- Data is sent as `bytes`. We must explicitly `encode()` strings before sending and `decode()` them after receiving. This is a common point of error.

## Diagrams
**TCP Connection Lifecycle**
```text
      SERVER                                  CLIENT
      ------                                  ------
1. socket()  (create listening socket)
2. bind()    (assign IP/port)
3. listen()  (enable accepting connections)
4. accept()  -------------------------------> socket() (create client socket)
      |         (blocks until client connects)    |
      |          <SYN>                            |
      |          ---------------------------> 5. connect() (initiate connection)
      |          <SYN-ACK>                        |
      |          <---------------------------     |
      |          <ACK>                            |
      |          --------------------------->     |
      |                                           |
(new socket `conn` is created)               (connection established)
      |                                           |
5. recv() <---------------------------------- send()
6. send() ----------------------------------> recv()
      |                                           |
7. close() <--------------------------------- close()
```

**UDP Message Exchange**
```text
      SERVER                                  CLIENT
      ------                                  ------
1. socket()                                 1. socket()
2. bind()
3. recvfrom() (blocks waiting for a packet)
      |                                           |
      | <------ (data + src_addr) ----------- 2. sendto(data, server_addr)
      |                                           |
4. sendto(reply, src_addr) ------------>    3. recvfrom() (blocks for reply)
      |                                           |
```

## Memory technique — remember this forever
1.  **Mnemonic:** TCP is a **Telephone Call**. UDP is a **Postcard**.
    - **Telephone (TCP):** You need to know the number (`bind`). You wait for a call (`listen`). You pick up (`accept`). You have a dedicated, two-way conversation (`send`/`recv` on the new connection). You hang up (`close`). It's reliable and ordered.
    - **Postcard (UDP):** You write a message and the destination address on it (`sendto`). You drop it in the mailbox. It might get there, it might not. The recipient just checks their mail (`recvfrom`) and sees a message from you, with your return address on it.

2.  **Must-overlearn facts:**
    - TCP Server sequence: `socket`, `bind`, `listen`, `accept`.
    - UDP Server sequence: `socket`, `bind`, `recvfrom`.
    - Data on the wire is `bytes`, not `str`. Always `encode()`/`decode()`.

3.  **Spaced Repetition Schedule:** Review your implementations and these key facts at: 1 day, 3 days, 7 days, 16 days, 35 days. Actively re-implement one of the examples from scratch at each interval.

4.  **First Principles Pathway:** If you forget the API calls, re-derive them from the protocol's nature.
    - Does this protocol need a dedicated connection?
    - **Yes (TCP):** Then the server must have a way to *listen* for requests and a way to *accept* them. The client must have a way to *connect*.
    - **No (UDP):** Then the server just needs to *receive from* an address, and the client just needs to *send to* an address. The address must be specified with every single message.

## Common mistakes
1.  **Forgetting `bind()` on the server:** A client needs a fixed, known address and port to connect to. If the server doesn't `bind()`, the OS will assign an ephemeral port, which the client won't know.
2.  **String vs. Bytes:** Trying to send a string (`"hello"`) instead of bytes (`b"hello"` or `"hello".encode()`). This will raise a `TypeError` in Python 3. Network sockets only transact in bytes.
3.  **Assuming `recv(1024)` gets 1024 bytes:** For TCP (`SOCK_STREAM`), `recv(bufsize)` reads *up to* `bufsize` bytes. It returns whatever is currently in the OS network buffer for that socket. It might be 1 byte, or 500 bytes. A correct implementation loops until the entire expected message is received.
4.  **Using `connect()` with UDP:** A UDP socket can use `connect()`, but it behaves differently. It simply sets a default destination address for subsequent `send()` calls. It does not establish a connection. This can be confusing; for clarity, stick to `sendto()`/`recvfrom()`.

## Self-check
1.  Modify the TCP echo client to send three separate messages in a row. Does the server handle this correctly? What happens if you add a `time.sleep(1)` between the client's `sendall()` calls?
2.  Write a UDP client/server pair. The client sends the string `"get_telemetry"`. The server, upon receiving this specific string, replies with a simulated data packet like `"temp=25.5C;pressure=101.3kPa"`. If it receives anything else, it replies with an error message.
3.  A TCP server executes `s.listen(5)`. What does the `5` signify? If six clients attempt to `connect()` simultaneously while the server is busy and has not called `accept()`, what happens to the sixth client?