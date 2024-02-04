import { CollectionConfig } from "payload/types";

export const HallOfFameEntry: CollectionConfig = {
    slug: 'hof',
    labels: { singular: 'Hall of Fame entry', plural: 'Hall of Fame entries'},
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'id',
            type: 'text',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media'
                }
            ]
        },
        {
            name: 'transcript',
            type: 'richText'
        },
        {
            name: 'date',
            type: 'date',
        },
        {
            name: 'people',
            type: 'array',
            fields: [
                {
                    name: 'person',
                    type: 'relationship',
                    relationTo: 'hof-person'
                }
            ]
        },
    ]
}
