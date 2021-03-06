<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@firebase/storage](./storage.md) &gt; [getMetadata](./storage.getmetadata.md)

## getMetadata() function

A promise that resolves with the metadata for this object. If this object doesn't exist or metadata cannot be retreived, the promise is rejected.

<b>Signature:</b>

```typescript
export declare function getMetadata(ref: StorageReference): Promise<FullMetadata>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  ref | [StorageReference](./storage.storagereference.md) | StorageReference to get metadata from. |

<b>Returns:</b>

Promise&lt;[FullMetadata](./storage.fullmetadata.md)<!-- -->&gt;

