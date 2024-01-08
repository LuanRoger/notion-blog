import {
  NotionPageStatusFilter,
  type NotionDatabasePage,
  type NotionStatusFilter,
  type NotionDatabasePostTypeSelectProperty,
} from "./types";

const STATUS_PROPERTY = "Status";
const BACKLOG_STATUS = "Backlog";
const DRAFT_STATUS = "Rascunho";
const PUBLISHED_STATUS = "Publicado";

const POST_TITLE_PROPERTY = "Name";
const POST_TYPE_SELECT_PROPERTY = "Tipo";

export function toNotionStatusFilter(
  filter: NotionPageStatusFilter
): NotionStatusFilter {
  switch (filter) {
    case NotionPageStatusFilter.backlog:
      return {
        property: STATUS_PROPERTY,
        status: {
          equals: BACKLOG_STATUS,
        },
      };
    case NotionPageStatusFilter.draft:
      return {
        property: STATUS_PROPERTY,
        status: {
          equals: DRAFT_STATUS,
        },
      };
    case NotionPageStatusFilter.published:
      return {
        property: STATUS_PROPERTY,
        status: {
          equals: PUBLISHED_STATUS,
        },
      };
  }
}

export function extractDatabaseQueryResults(
  results: any[]
): NotionDatabasePage[] {
  const databasePages: NotionDatabasePage[] = [];
  results
    .filter((r) => r.object === "page")
    .forEach((result) => {
      databasePages.push({
        id: result.id,
        title: extractDatabasePageTitle(result.properties),
        cover: extractDatabasePageExternalCover(result.cover),
        type: extractDatabasePageSelectProperty(result.properties),
      });
    });

  return databasePages;
}

function extractDatabasePageTitle(pageProperties: any): string {
  const titleProperty = pageProperties[POST_TITLE_PROPERTY];

  if (titleProperty.type !== "title") {
    throw new Error("Title property is not a title property");
  }
  
  return titleProperty.title[0].plain_text;
}

function extractDatabasePageExternalCover(cover: any): string | null { 
  if(cover.type !== "external") {
    return null
  }

  return cover.external.url
}

function extractDatabasePageSelectProperty(
  pageProperties: any
): NotionDatabasePostTypeSelectProperty {
  const postTypeProperty = pageProperties[POST_TYPE_SELECT_PROPERTY];

  if (postTypeProperty.type !== "select") {
    throw new Error("Post type property is not a select property");
  }

  return {
    type: postTypeProperty.type,
    select: {
      name: postTypeProperty.select.name,
      color: postTypeProperty.select.color,
    },
  };
}
