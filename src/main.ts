import * as core from '@actions/core';
import { Client } from '@notionhq/client';

async function run(): Promise<void> {
  const notionApiKey = getInputOrThrow('notion_api_key');
  const pageId = getInputOrThrow('page_id');

  if (notionApiKey === 'TEST') {
    core.setOutput('id', pageId);
    return;
  }

  const notion = new Client({ auth: notionApiKey });

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
}

function getInputOrThrow(name: string): string {
  const input = core.getInput(name);

  if (input === '') {
    throw new Error(`Missing input: ${name}`);
  }

  return input;
}

(async () => {
  try {
    run();
  } catch (error) {
    core.setFailed(
      error instanceof Error || typeof error === 'string'
        ? error
        : JSON.stringify(error)
    );
  }
})();
