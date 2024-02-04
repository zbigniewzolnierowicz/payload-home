import { CollectionConfig } from "payload/types";

export const HallOfFamePerson: CollectionConfig = {
    slug: 'hof-person',
    labels: { singular: 'Hall of Fame person', plural: 'Hall of Fame people'},
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
