## Table of contents

- [Introduction](#introduction)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Usage](#usage)

## Introduction

This action lets you retrieve page details from the Notion API, exposing them as action outputs that can be used in subsequent steps.

## Inputs

| input            | description                  | required |
| ---------------- | ---------------------------- | -------- |
| `notion_api_key` | Notion API Key               | `true`   |
| `page_id`        | Identifier for a Notion page | `true`   |

## Outputs

| output             | type     | example                                                          |
| ------------------ | -------- | ---------------------------------------------------------------- |
| `archived`         | `string` | `false`                                                          |
| `cover`            | JSON     | `{"type":"external","external":{"url":"https://..."}}`           |
| `created_time`     | `string` | `2020-03-17T19:10:04.968Z`                                       |
| `icon`             | JSON     | `{"type":"emoji","emoji":"🎉"}`                                  |
| `id`               | `string` | `b55c9c91-384d-452b-81db-d1ef79372b75`                           |
| `last_edited_time` | `string` | `2020-03-17T21:49:37.913Z`                                       |
| `object`           | JSON     | `page`                                                           |
| `parent`           | JSON     | `{"type":"database_id","database_id":"48f8fee9-..."}`            |
| `properties`       | JSON     | `{"Name":[{"id":"some-property-id","text":"Avocado"}]}`          |
| `url`              | `string` | `https://www.notion.so/Avocado-b55c9c91384d452b81dbd1ef79372b75` |

## Usage

```yml
name: Print page URL
on:
  pull_request:
    types: [opened]
jobs:
  notion:
    runs-on: ubuntu-latest
    steps:
      - name: Retrieve page details
        id: page_details
        uses: dovetail/notion-get-page@latest
        with:
          notion_api_key: secret_1234567890abcdef1234
          page_id: 1234567890abcdef1234567890abcdef
      - run: |
          echo ${{ steps.page_details.outputs.url }}
```
