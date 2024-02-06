# BulletinBoard

**Proect title - Bulletin Board for School Events**
This is the project conducted for the Distribution Systems - 2024.

# Overall Architecture

The system will consist of three nodes as client, broker and a central server. 

**Server Node:** Server node is responsible for listens=ing for incoming client connections and managing client connections, authentication, event article storage, and distribution. As for communication, RPC will be used for the client-server communication. The data of client connections and subscriptions can be stored in server and logs actions of them. 

**Client Node:** The client will connect to the server to publish event articles and subscribe to event categories. As mentioned earlier, for the communication with the server RPC is used. It logs actions such as publishing events and subscribing to categories.

**Broker Node:** The publish-subscribe software architecture is used for the system and the broker node is used to act as an intermediary node for distributing event articles to clients based on their subscriptions by handling subscriptions and article dissemination. This node logs events related to message routing and distribution.

## Communication Protocols

* To ensure the reliable data communication between client and server TCP/IP will be used.
* Publish-Subscribe architecture is used as the software architecture to allow clients to subscribe to specific categories of news and receive relevant updates.
RPC (Remote Procedure Call) will be used for client-server communication, allowing clients to interact with the server's functionality.
Multi-threading will be implemented on the server-side to handle multiple client connections concurrently.

Topology Network:

The system will follow a two-tiered centralized client-server architecture.
Clients will connect to the server over TCP/IP sockets.
The server will maintain a list of connected clients and manage the distribution of news articles.

Workflow:

Clients will connect to the server and authenticate themselves.
Once authenticated, clients can:
Publish news articles: Clients will send news articles to the server, specifying the category/tags for the article.
Subscribe to news categories: Clients will request to subscribe to specific categories of news.
Receive news updates: Clients will receive updates from the server when new articles are published in categories they subscribed to.

The server will:

Listen for incoming client connections.
Manage client connections and authentication.
Store and manage news articles.
Distribute news articles to subscribed clients.
Handle client requests (publishing articles, subscribing to categories, etc.).

Components:

Server:
Socket Listener: Listens for incoming client connections.
Authentication Module: Authenticates clients upon connection.
News Manager: Manages storage and distribution of news articles.
Client Handler Threads: Handles client requests concurrently using multi-threading.
Client:
Socket Connection: Connects to the server over TCP/IP.
Authentication: Authenticates with the server upon connection.
User Interface: Allows users to publish articles, subscribe to categories, and view news updates.
