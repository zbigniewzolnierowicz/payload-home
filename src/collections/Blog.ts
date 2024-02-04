import { CollectionConfig } from "payload/types";

export const Blog: CollectionConfig = {
    slug: 'blog',
    labels: { singular: 'Blog post', plural: 'Blog posts'},
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText'
        },
        {
            name: 'date',
            type: 'date',
        },
    ]
}
