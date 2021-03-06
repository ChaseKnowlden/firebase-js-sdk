<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@firebase/database](./database.md) &gt; [get](./database.get.md)

## get() function

Gets the most up-to-date result for this query.

<b>Signature:</b>

```typescript
export declare function get(query: Query): Promise<DataSnapshot>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  query | [Query](./database.query.md) | The query to run. |

<b>Returns:</b>

Promise&lt;[DataSnapshot](./database.datasnapshot.md)<!-- -->&gt;

A promise which resolves to the resulting DataSnapshot if a value is available, or rejects if the client is unable to return a value (e.g., if the server is unreachable and there is nothing cached).

