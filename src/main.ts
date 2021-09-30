import * as core from '@actions/core';
import { Client } from '@notionhq/client';

async function run(): Promise<void> {
  const notionApiKey = core.getInput('notion_api_key');
  const pageId = core.getInput('page_id');

  if (notionApiKey === '') {
    core.setFailed('Missing input: notion_api_key');
    return;
  }

  if (pageId === '') {
    core.setFailed('Missing input: page_id');
    return;
  }

  if (notionApiKey === 'TEST') {
    core.setOutput('id', pageId);
    return;
  }

  const notion = new Client({ auth: notionApiKey });

  try {
    const response = await notion.pages.retrieve({ page_id: pageId });

    core.setOutput('archived', response.archived);
    core.setOutput('cover', response.cover);
    core.setOutput('created_time', response.created_time);
    core.setOutput('icon', response.icon);
    core.setOutput('id', response.id);
    core.setOutput('last_edited_time', response.last_edited_time);
    core.setOutput('object', response.object);
    core.setOutput('parent', response.parent);
    core.setOutput('properties', response.properties);
    core.setOutput('url', response.url);
  } catch (error) {
    core.setFailed(
      error instanceof Error || typeof error === 'string'
        ? error
        : JSON.stringify(error)
    );
  }
}

run();
