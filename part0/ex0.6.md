```mermaid
sequenceDiagram
    participant browser
    participant server
browser->>server: POST {content: "meaning of life", date: "2024-11-26T16:36:05.225Z"}
server-->>browser: 201 Created status code sent: {"message":"note created"}
```