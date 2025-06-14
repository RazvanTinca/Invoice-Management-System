# InvoiceApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**invoiceControllerCreateInvoice**](#invoicecontrollercreateinvoice) | **POST** /invoice/create | |
|[**invoiceControllerDeleteInvoice**](#invoicecontrollerdeleteinvoice) | **DELETE** /invoice/delete/{id} | |
|[**invoiceControllerGetAllInvoices**](#invoicecontrollergetallinvoices) | **GET** /invoice/all | |
|[**invoiceControllerGetAllInvoicesWithPagination**](#invoicecontrollergetallinvoiceswithpagination) | **GET** /invoice/all/pagination/{page}/{limit} | |
|[**invoiceControllerGetInvoice**](#invoicecontrollergetinvoice) | **GET** /invoice/id/{id} | |
|[**invoiceControllerUpdateInvoice**](#invoicecontrollerupdateinvoice) | **PATCH** /invoice/update/{id} | |

# **invoiceControllerCreateInvoice**
> invoiceControllerCreateInvoice(createInvoiceDto)


### Example

```typescript
import {
    InvoiceApi,
    Configuration,
    CreateInvoiceDto
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let createInvoiceDto: CreateInvoiceDto; //

const { status, data } = await apiInstance.invoiceControllerCreateInvoice(
    createInvoiceDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createInvoiceDto** | **CreateInvoiceDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoiceControllerDeleteInvoice**
> invoiceControllerDeleteInvoice()


### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.invoiceControllerDeleteInvoice(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoiceControllerGetAllInvoices**
> Array<InvoiceDto> invoiceControllerGetAllInvoices()


### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

const { status, data } = await apiInstance.invoiceControllerGetAllInvoices();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<InvoiceDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoiceControllerGetAllInvoicesWithPagination**
> PaginationDTO invoiceControllerGetAllInvoicesWithPagination()


### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let page: number; // (default to undefined)
let limit: number; // (default to undefined)

const { status, data } = await apiInstance.invoiceControllerGetAllInvoicesWithPagination(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] |  | defaults to undefined|
| **limit** | [**number**] |  | defaults to undefined|


### Return type

**PaginationDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoiceControllerGetInvoice**
> InvoiceDto invoiceControllerGetInvoice()


### Example

```typescript
import {
    InvoiceApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.invoiceControllerGetInvoice(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] |  | defaults to undefined|


### Return type

**InvoiceDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**0** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **invoiceControllerUpdateInvoice**
> invoiceControllerUpdateInvoice(updateInvoiceDTO)


### Example

```typescript
import {
    InvoiceApi,
    Configuration,
    UpdateInvoiceDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new InvoiceApi(configuration);

let id: number; // (default to undefined)
let updateInvoiceDTO: UpdateInvoiceDTO; //

const { status, data } = await apiInstance.invoiceControllerUpdateInvoice(
    id,
    updateInvoiceDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateInvoiceDTO** | **UpdateInvoiceDTO**|  | |
| **id** | [**number**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

