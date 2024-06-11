## Clickferry Technical Assessment Project

### Cloning the Repository

To clone the repository, open your terminal and run the following command:

```sh
git clone <REPOSITORY_URL>
cd <REPOSITORY_NAME>
```

- Once you have cloned the repository, navigate to the project directory and install the necessary dependencies:

```sh
npm install
```


- Replace .env.template to .env configure the following environment variables:
```
SUPPLIER1_API_URL=
SUPPLIER1_TOKEN=
SUPPLIER2_API_URL=
SUPPLIER2_USERNAME=
SUPPLIER2_PASSWORD=
```
- To start the application, run the following command:

```sh
npm run start
```

## Objective

This project aims to demonstrate the ability to handle third party information sources (APIs) that provide data in a slightly different way and aggregate these responses so that they are suitable for display on the frontend.

## Endpoints

### 1. `/departures`.

This endpoint provides information on ship departures by combining data from two providers.

- **Method**: GET
- **URL**: `/departures?date=<date>&departurePort=<port_departure>&arrivalPort=<port_arrival>`.

### 2. `/status`.

This endpoint is a simple test point that returns a message indicating that the server is up and running.

- **Method**: GET
- **URL**: `/status`
- **Response**: `‘Server is up’`.

## Services

### Supplier1Service

This service connects to the API of Supplier 1 using a Bearer token for authentication.

#### Process

1. **Authentication**: Provide the Bearer token.
2. **Data Request**: Make a GET request to the `/timetable` endpoint with the following parameters:
    - `date`: Date in ISO8601 format.
    - `departurePort`: Departure port code.
    - `arrivalPort`: Arrival port code.

### Supplier2Service

This service connects to Supplier 2's API. First, it obtains a JWT by making a POST request to the `/login` endpoint and then uses this token to request data from the `/timetable` endpoint.

#### Process

1. **Obtain JWT**: Make a POST request to the `/login` endpoint with HTTP Basic authentication.
2. **Request Data**: Make a GET request to the `/timetable` endpoint with the following parameters:
    - `route`: Concatenated string of the departure and arrival port codes.
    - `start`: Start date in ISO8601 format.
    - `end`: End date in ISO8601 format.

### Example: Testing `/departures` LOCAL

To test the `/departures` endpoint, you can use the following URL:

```http://localhost:8080/departures?date=2024-06-19&departurePort=ALGE&arrivalPort=CEUT```

#### Expected Response

```json
Respuesta naviera numero 1: [
  {
    "departurePort": "ALGE",
    "arrivalPort": "CEUT",
    "departure": "2024-06-19 15:00 PM",
    "arrival": "2024-06-19 18:00 PM",
    "ship": {
      "name": "Poseidon",
      "tipo": "FAST_FERRY"
    }
  }
]

Respuesta naviera numero dos: {
  "2024-06-19": [
    {
      "time": "14:00:00",
      "arrival": "2024-06-19T16:00:00",
      "ship": {
        "name": "SUPER SLOW CEUTA",
        "type": "Ferry"
      }
    }
  ]
}

Respuesta informacion combinada: [
  {
    "departurePort": "ALGE",
    "arrivalPort": "CEUT",
    "departureTime": "2024-06-19 15:00 PM",
    "arrivalTime": "2024-06-19 18:00 PM",
    "shipName": "Poseidon",
    "shipType": "FAST_FERRY",
    "supplier": 1
  },
  {
    "departurePort": "ALGE",
    "arrivalPort": "CEUT",
    "departureTime": "2024-06-19T14:00:00",
    "arrivalTime": "2024-06-19T16:00:00",
    "shipName": "SUPER SLOW CEUTA",
    "shipType": "Ferry",
    "supplier": 2
  }
]
```

This example demonstrates how the /departures endpoint aggregates and combines data from two suppliers to provide a comprehensive list of available departures for a given date and route.
