export enum NotionPageStatusFilter {
    backlog,
    draft,
    published,
}

export interface NotionStatusFilter {
    property: string
    status: {
        equals: string
    },
}

export interface NotionDatabasePostTypeSelectProperty {
    type: string
    select: {
        name: string
        color: string
    }
}

export interface NotionDatabasePage {
    title: string,
    id: string,
    cover: string | null,
    type?: NotionDatabasePostTypeSelectProperty | undefined
}