import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

import Users from './collections/Users'
import { HallOfFameEntry } from './collections/HallOfFameEntry'
import { HallOfFamePerson } from './collections/HallOfFamePerson'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'

const adapter = s3Adapter({
  bucket: process.env.PAYLOAD_S3_BUCKET,
  config: {
    endpoint: process.env.PAYLOAD_S3_ENDPOINT,
    region: 'auto',
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.PAYLOAD_S3_ACCESS,
      secretAccessKey: process.env.PAYLOAD_S3_SECRET
    }
  }
})


export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
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
  plugins: [
    cloudStorage({
      enabled: true,
      collections: {
        media: { adapter }
      }
    })
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
