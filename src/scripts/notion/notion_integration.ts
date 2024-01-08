import { Client } from "@notionhq/client";
import {
  extractDatabaseQueryResults,
  toNotionStatusFilter,
} from "./notion_utils";
import type { NotionDatabasePage, NotionPageStatusFilter } from "./types";
import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

const notionClient = new Client({
  auth: import.meta.env.NOTION_SECRET,
});

export async function getPagesFromDatabase(
  filter?: NotionPageStatusFilter | undefined
): Promise<NotionDatabasePage[]> {
  const databaseId = import.meta.env.NOTION_DATABASE_ID;
  const statusFilter =
    filter !== undefined ? toNotionStatusFilter(filter) : undefined;

  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: statusFilter,
  });
  const databasePages: NotionDatabasePage[] = extractDatabaseQueryResults(
    response.results
  );
  return databasePages;
}

export async function getPageContent(
  pageId: string
): Promise<ListBlockChildrenResponse> {
  return await notionClient.blocks.children.list({
    block_id: pageId,
  });
}
