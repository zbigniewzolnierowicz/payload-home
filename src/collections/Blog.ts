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
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'content',
            type: 'richText',
            required: true
        },
        {
            name: 'summary',
            type: 'text',
        },
        {
            name: 'date',
            type: 'date',
        },
    ],
    endpoints: [
        {
            path: '/slug/:slug',
            method: 'get',
            handler: async (req, res) => {
                try {
                    const blog = await req.payload.find({ collection: 'blog', where: { slug: { equals: req.params.slug } } })
                    res.status(200).send(blog.docs[0])
                } catch {
                    res.status(404)
                }
            }
        }
    ]
}
