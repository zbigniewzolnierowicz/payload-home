import { CollectionConfig } from "payload/types";

export const HallOfFamePerson: CollectionConfig = {
    slug: 'hof-person',
    labels: { singular: 'Hall of Fame person', plural: 'Hall of Fame people'},
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'name'
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true
        },
        {
            name: 'username',
            type: 'text',
        },
        {
            name: 'website',
            type: 'text'
        },
    ]
}
