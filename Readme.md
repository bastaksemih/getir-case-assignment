# Getir Case Assignment

This application has a single endpoint to implement "getir case study" assignment.

/api/getFilteredRecords

## Setup Instructions

* Install NPM and NodeJS
* git clone https://github.com/bastaksemih/getir-assignment.git
```jsx
cd getir-case-assignment
npm install
npm run start
```

## Tests

[Jest](https://jestjs.io/) framework has been used for testing
```jsx
npm run test
```

## API Endpoint Information - /getFilteredRecords
https://semih-getir-assignment.herokuapp.com/api/getFilteredRecords

You need to use "post" as http method to get data from the api link above by providing the necessary parameters.

* “startDate” and “endDate” fields should contain the date in a “YYYY-MM-DD” format. You
  can filter the data by using them
* “minCount” and “maxCount” are for filtering the data. Sum of the “count” array in the
  documents will be between “minCount” and “maxCount”.

## Structure of Request Payload

| Parameters | Description |
| ------ | ----------- |
| startDate   | Date (YYYY-MM-DD) |
| endDate | Date (YYYY-MM-DD) |
| minCount    | number |
| maxCount    | number |

```jsx
POST /api/getFilteredRecords HTTP/1.1
Host: https://semih-getir-assignment.herokuapp.com
Content-Type: application/json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

## Structure of Response Payload
```jsx
{
  "code":0,
  "msg":"Success",
  "records":[
    {
    "key":"TAKwGc6Jr4i8Z487",
    "createdAt":"2017-01-28T01:22:14.398Z",
    "totalCount":2800
    },
    {
    "key":"NAeQ8eX7e5TEg7oH",
    "createdAt":"2017-01-27T08:19:14.135Z",
    "totalCount":2900
    }
  ]
}
```
## Return Types

### Success Response Payload
| Status | Response |
| ------ | ----------- |
| 200 | `{ code : 0, msg : "success", records: [Data] }` |

### Error Response Payload
| Status | Response |
| ------ | ----------- |
| 500 | `{ "code": 500, "msg": "internal server error, error is ; $errorMsg", "records": [] }` |
| 400 | `{ "code": 2, "msg": "Missing Parameters", "records": [] }` |
| 400 | `{ "code": 3, "msg": "Start Date must be a valid date string", "records": [] }` |
| 400 | `{ "code": 4, "msg": "End Date must be a valid date string", "records": [] }` |
| 400 | `{ "code": 5, "msg": "Minimum Count must be a integer", "records": [] }` |
| 400 | `{ "code": 6, "msg": "Maximum Count must be a integer", "records": [] }` |
| 400 | `{ "code": 7, "msg": "Maximum Count must be bigger that Minimum Count", "records": [] }` |
| 400 | `{ "code": 8, "msg": "Min or Max Count cannot be smaller than zero", "records": [] }` |



## Author

Semih Baştak
