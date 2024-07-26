Site structure:

```
- `/': Home page
- `/<project>`: List all post from project's `DEVLOG.md`
- `/<project>/<post>`: Detailed post for each day in `DEVLOG.md`
```

Every project defined in `utils/consts.ts` will be served as `/<project>` page.

The project's posts are parsed from `https://github.com/MH111097/<project>/DEVLOG.md`.