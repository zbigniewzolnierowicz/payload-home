import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { viteBundler } from '@payloadcms/bundler-vite'
import { buildConfig } from 'payload/config'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import Users from './collections/Users'
import { HallOfFameEntry } from './collections/HallOfFameEntry'
import { HallOfFamePerson } from './collections/HallOfFamePerson'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Users, HallOfFameEntry, HallOfFamePerson, Media, Blog],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    disable: false,
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
