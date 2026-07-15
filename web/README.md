# Girky website source

`web/docs` contains the public Markdown source for the Sills website. Files use simple YAML frontmatter and relative links. The CI build stages those Markdown files into a temporary Girky project, treats `index.md` as the homepage, preserves folder-based routes, and deploys the generated artifact to Cloudflare Pages for `sills.hakobs.com`.
