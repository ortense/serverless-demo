# Serverless demo with Google Cloud Functions

A simple serveless demo with [Google Cloud Functions](https://cloud.google.com/functions/), [Serverless Framework](https://serverless.com/framework/) and [MongoDB](https://www.mongodb.com).

This repository contains 4 functions that simulate a survey service.

All examples are for demonstration and may not be the best choice for production.

## /src/survey/create.js

This is where we created our survey.

### request

```sh
curl -X POST https://your-google-cloud-host-here/create \
  -H "Content-Type: application/json" \
  -d '{ "title": "Serverless is the future?" }'
```

### response

```json
{
  "survey": {
    "id": "e252c1d7-b81d-49e4-b846-a93853196782",
    "title": "Serverless is the future?"
  }
}
```

## /src/survey/get-by-id.js

Search for a survey on database by the ID provided in the query string.

### request

```SH
curl -X GET https://your-google-cloud-host-here/survey?id=SURVEY_ID
```

### response

```json
{
  "survey": {
    "id": "e252c1d7-b81d-49e4-b846-a93853196782",
    "title": "Serverless is the future?"
  }
}
```

## /src/vote/vote.js

Creates a vote record in the database.

### request

```sh
curl -X POST https://your-google-cloud-host-here/vote \
  -H 'content-type: application/json' \
  -d '{ "survey_id": "SURVEY_ID", "vote": "yes" }'
```

### response

```json
{
  "message": "success"
}
```

## /src/survey/couting.js

Calculate the votes for a survey with [MongoDB aggregate API](https://docs.mongodb.com/manual/aggregation/).

### request

```sh
curl -X GET https://your-google-cloud-host-here/counting?id=SURVEY_ID
```

### response

```json
{
  "survey": {
    "id": "SURVEY_ID",
    "title": "Serverless is the future?",
    "votes": {
      "yes": 2,
      "no": 1
    }
  }
}
```

## How to run

I'm assuming that you already have the [node.js 6 LTS](https://nodejs.org/en/download/) installed in your computer.

First you must create your project and Google Cloud Platform credentials following [this guide](https://serverless.com/framework/docs/providers/google/guide/credentials/).

Then edit the file `serverless.yml` changing the properties `project` and `credentials`.

Create a `./config.json` file like that:

```json
{
  "dburl": "mongodb://YOUR-DATABASE-URL",
  "collection": {
    "survey": "survey",
    "votes": "votes"
  }
}
```

Now just install the dependencies of the project with the `npm install` or `Yarn` and deploy it with the `serverless deploy` command.

## Cool stuffs that I want to do but I didn't have the time.

- [ ] Unit Tests
- [ ] PubSub Example
- [ ] Cloud Storage Example
- [ ] Firebase Example
