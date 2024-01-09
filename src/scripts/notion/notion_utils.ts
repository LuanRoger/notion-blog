import {
  NotionPageStatusFilter,
  type NotionDatabasePage,
  type NotionStatusFilter,
  type NotionDatabasePostTypeSelectProperty,
  type NotionDatabasePropertiesName,
} from "./types";

const databaseProperties: NotionDatabasePropertiesName = {
  statusProperty: import.meta.env.STATUS_PROPERTY,
  backlogStatus: import.meta.env.BACKLOG_STATUS,
  draftStatus: import.meta.env.DRAFT_STATUS,
  publishedStatus: import.meta.env.PUBLISHED_STATUS,
  postTitleProperty: import.meta.env.POST_TITLE_PROPERTY,
  postTypeSelectProperty: import.meta.env.POST_TYPE_SELECT_PROPERTY,
};

export function toNotionStatusFilter(
  filter: NotionPageStatusFilter
): NotionStatusFilter {
  switch (filter) {
    case NotionPageStatusFilter.backlog:
      return {
        property: databaseProperties.statusProperty,
        status: {
          equals: databaseProperties.backlogStatus,
        },
      };
    case NotionPageStatusFilter.draft:
      return {
        property: databaseProperties.statusProperty,
        status: {
          equals: databaseProperties.draftStatus,
        },
      };
    case NotionPageStatusFilter.published:
      return {
        property: databaseProperties.statusProperty,
        status: {
          equals: databaseProperties.publishedStatus,
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
      databasePages.push(parseDatabasePage(result));
    });

  return databasePages;
}

export function parseDatabasePage(page: any): NotionDatabasePage {
  return {
    id: page.id,
    title: extractDatabasePageTitle(page.properties),
    cover: extractDatabasePageExternalCover(page.cover),
    type: extractDatabasePageSelectProperty(page.properties),
  }
}

function extractDatabasePageTitle(pageProperties: any): string {
  const titleProperty = pageProperties[databaseProperties.postTitleProperty];

  if (titleProperty.type !== "title") {
    throw new Error("Title property is not a title property");
  }
  
  return titleProperty.title[0].plain_text;
}

function extractDatabasePageExternalCover(cover: any): string | null { 
  if(cover === null || cover.type !== "external") {
    return null
  }

  return cover.external.url
}

function extractDatabasePageSelectProperty(
  pageProperties: any
): NotionDatabasePostTypeSelectProperty | undefined {
  const postTypeProperty = pageProperties[databaseProperties.postTypeSelectProperty];

  if (postTypeProperty.type !== "select" || postTypeProperty.select === null && postTypeProperty.color === undefined) {
    return undefined
  }

  return {
    type: postTypeProperty.type,
    select: {
      name: postTypeProperty.select.name,
      color: postTypeProperty.select.color,
    },
  };
}
