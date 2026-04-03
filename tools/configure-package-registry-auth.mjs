#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function ensureTrailingSlash(value) {
  return value.endsWith('/') ? value : `${value}/`
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '')
}

function resolveRegistryConfig(env) {
  const baseUrl = stripTrailingSlash(env.FLEET_FORGEJO_BASE_URL || 'https://code.platform.nard.uk')
  const owner = (env.FLEET_FORGEJO_OWNER || 'narduk-enterprises').trim() || 'narduk-enterprises'
  const token = env.FORGEJO_TOKEN?.trim() || env.NODE_AUTH_TOKEN?.trim() || ''

  return {
    registryUrl: ensureTrailingSlash(`${baseUrl}/api/packages/${owner}/npm`),
    token,
  }
}

function stripManagedAuthLines(content) {
  return content
    .split('\n')
    .filter((line) => !/\/\/[^/]+\/api\/packages\/.+\/npm\/:_authToken=/.test(line))
    .join('\n')
    .trimEnd()
}

function main() {
  const targetPath = resolve(process.cwd(), process.env.PACKAGE_REGISTRY_NPMRC_PATH || '.npmrc')
  const config = resolveRegistryConfig(process.env)

  if (!config.token) {
    console.error('[package-registry-auth] missing FORGEJO_TOKEN/NODE_AUTH_TOKEN')
    process.exit(1)
  }

  const url = new URL(config.registryUrl)
  const authHostPath = `${url.host}${ensureTrailingSlash(url.pathname)}`
  const registryLine = `@narduk-enterprises:registry=${config.registryUrl}`
  const authLine = `//${authHostPath}:_authToken=${config.token}`
  const existingContent = existsSync(targetPath) ? readFileSync(targetPath, 'utf8') : ''
  const strippedContent = stripManagedAuthLines(existingContent)
  const retainedLines = strippedContent
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) =>
      line.startsWith('@narduk-enterprises:registry=') ? registryLine : line,
    )

  if (!retainedLines.some((line) => line.startsWith('@narduk-enterprises:registry='))) {
    retainedLines.unshift(registryLine)
  }

  retainedLines.push(authLine)
  writeFileSync(targetPath, `${retainedLines.join('\n').trimEnd()}\n`, 'utf8')
  console.log(`[package-registry-auth] configured auth in ${targetPath}`)
}

main()
