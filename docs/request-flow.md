# Request Flow

This document describes the high-level flow of a client request through the API layer down to the Notion database.

```mermaid
sequenceDiagram
    participant Client as Browser/Client
    participant API as Next.js API Route
    participant Lib as Notion Library
    participant NotionDB as Notion Database

    Client->>API: GET /api/config
    API->>Lib: getNotionConfig()
    Lib->>NotionDB: Retrieve page
    NotionDB-->>Lib: Page data
    API->>Lib: getAutomationScripts()
    Lib->>NotionDB: Query database
    NotionDB-->>Lib: Script list
    API-->>Client: JSON response
```

## Steps

1. The browser sends a `GET` request to **/api/config**.
2. `src/pages/api/config.js` handles the request and calls helper functions from `src/lib/notion.js`.
3. `getNotionConfig` retrieves configuration data from the configured Notion page using the Notion API.
4. `getAutomationScripts` queries the Notion database containing automation scripts.
5. The API route formats the returned data into an application configuration object.
6. The server sends the JSON configuration back to the client.
