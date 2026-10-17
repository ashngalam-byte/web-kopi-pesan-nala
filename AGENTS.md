<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Neon (via Lovable connector gateway) stores app users in public.users; access only from server code through src/lib/neon.server.ts — keeps credentials server-side.
- Authentication uses server-verified Neon passwords and an encrypted HttpOnly session cookie; only the verified user ID is stored, and profile reads recheck the user in Neon to prevent client-controlled identity.
