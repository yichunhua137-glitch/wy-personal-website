import { createClient } from '@supabase/supabase-js'
import WebSocket from 'ws'

const ALLOWED_EVENT_TYPES = new Set(['resume_open', 'resume_download'])

function readEnv(env, key) {
  return env?.[key] ?? process.env[key] ?? ''
}

function getClient(env) {
  const url = readEnv(env, 'SUPABASE_URL')
  const serviceRoleKey =
    readEnv(env, 'SUPABASE_SERVICE_ROLE_KEY') || readEnv(env, 'SUPABASE_SERVICE_KEY')

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    realtime: {
      transport: WebSocket,
    },
  })
}

function normalizeVisitorId(visitorId) {
  const normalized = String(visitorId ?? '').trim()
  if (!/^[a-zA-Z0-9_-]{8,120}$/.test(normalized)) {
    throw new Error('Invalid visitor identifier.')
  }

  return normalized
}

async function ensureVisitorRecord(supabase, visitorId) {
  const now = new Date().toISOString()
  const { data: existingVisitor, error: readError } = await supabase
    .from('site_visitors')
    .select('visitor_id, visit_count')
    .eq('visitor_id', visitorId)
    .maybeSingle()

  if (readError) throw readError
  if (existingVisitor) return existingVisitor

  const { error: insertError } = await supabase.from('site_visitors').insert({
    visitor_id: visitorId,
    first_seen: now,
    last_seen: now,
    visit_count: 0,
  })

  if (insertError) throw insertError
  return { visitor_id: visitorId, visit_count: 0 }
}

export async function recordVisit(visitorId, env) {
  const supabase = getClient(env)
  const normalizedVisitorId = normalizeVisitorId(visitorId)
  const now = new Date().toISOString()
  const existingVisitor = await ensureVisitorRecord(supabase, normalizedVisitorId)
  const isNewVisitor = Number(existingVisitor.visit_count ?? 0) === 0

  const { error: updateError } = await supabase
    .from('site_visitors')
    .update({
      last_seen: now,
      visit_count: Number(existingVisitor.visit_count ?? 0) + 1,
    })
    .eq('visitor_id', normalizedVisitorId)

  if (updateError) throw updateError
  return { isNewVisitor }
}

export async function recordEvent({ visitorId, eventType, pagePath, metadata = null }, env) {
  const supabase = getClient(env)
  const normalizedVisitorId = normalizeVisitorId(visitorId)
  const normalizedEventType = String(eventType ?? '').trim()

  if (!ALLOWED_EVENT_TYPES.has(normalizedEventType)) {
    throw new Error('Unsupported analytics event.')
  }

  await ensureVisitorRecord(supabase, normalizedVisitorId)

  const { error } = await supabase.from('site_events').insert({
    visitor_id: normalizedVisitorId,
    event_type: normalizedEventType,
    page_path: String(pagePath ?? '').slice(0, 240),
    metadata,
  })

  if (error) throw error
}

export async function getAdminStats(env) {
  const supabase = getClient(env)

  const [
    { count: uniqueVisitors, error: uniqueVisitorsError },
    { data: visitorRows, error: visitorRowsError },
    { count: resumeOpens, error: resumeOpensError },
    { count: resumeDownloads, error: resumeDownloadsError },
    { data: recentEvents, error: recentEventsError },
  ] = await Promise.all([
    supabase.from('site_visitors').select('visitor_id', { count: 'exact', head: true }),
    supabase.from('site_visitors').select('visit_count'),
    supabase
      .from('site_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_type', 'resume_open'),
    supabase
      .from('site_events')
      .select('id', { count: 'exact', head: true })
      .eq('event_type', 'resume_download'),
    supabase
      .from('site_events')
      .select('event_type, page_path, created_at')
      .order('created_at', { ascending: false })
      .limit(12),
  ])

  if (uniqueVisitorsError) throw uniqueVisitorsError
  if (visitorRowsError) throw visitorRowsError
  if (resumeOpensError) throw resumeOpensError
  if (resumeDownloadsError) throw resumeDownloadsError
  if (recentEventsError) throw recentEventsError

  const totalVisits = (visitorRows ?? []).reduce(
    (sum, row) => sum + Number(row.visit_count ?? 0),
    0,
  )

  return {
    uniqueVisitors: uniqueVisitors ?? 0,
    totalVisits,
    resumeOpens: resumeOpens ?? 0,
    resumeDownloads: resumeDownloads ?? 0,
    recentEvents: recentEvents ?? [],
    lastUpdated: new Date().toISOString(),
  }
}
