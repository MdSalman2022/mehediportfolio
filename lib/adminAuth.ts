import { createRemoteJWKSet, jwtVerify } from "jose";

// Admin routes sit behind Cloudflare Access. Access injects a signed JWT on
// every request it lets through; we verify it server-side so the API is safe
// even if someone hits the Worker directly.
//
//   CF_ACCESS_TEAM_DOMAIN  e.g. https://myteam.cloudflareaccess.com
//   CF_ACCESS_AUD          the Access application's Audience (AUD) tag

let jwks: ReturnType<typeof createRemoteJWKSet> | undefined;

export async function isAuthorizedAdmin(request: Request): Promise<boolean> {
  // Access isn't in front of localhost
  if (process.env.NODE_ENV === "development") return true;

  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const aud = process.env.CF_ACCESS_AUD;
  if (!teamDomain || !aud) return false;

  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) return false;

  try {
    jwks ??= createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
    await jwtVerify(token, jwks, { issuer: teamDomain, audience: aud });
    return true;
  } catch {
    return false;
  }
}
