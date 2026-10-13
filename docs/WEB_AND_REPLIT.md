# Responsive web and Replit handoff

## Web support

This Expo project targets web, iOS, and Android from the same React Native screens. The
English app name is Prayer Guide, and the Arabic app name is دليل المصلّي الميسّر. The shared
`Screen` container fills narrow viewports and caps reading content at 720 points on
wide screens. Text wraps and each route scrolls. Arabic and English set the page language and
direction on web without a reload; native direction keeps its existing restart behavior.

Start the web development server with `npm run start:web`, or create a static production
export with `npm run build:web`. Expo writes the export to `dist/`.

## Move the project to Replit

1. On this computer, save the current work to Git. From the project folder run:

   ```powershell
   git add -A
   git commit -m "Prepare responsive web platform"
   ```

2. Create a **private** GitHub repository, then connect and push this branch:

   ```powershell
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin feature/phase-1b
   ```

   If the repository already has a remote, inspect it with `git remote -v` and use that
   address instead of adding a second `origin`.

3. In Replit, import the GitHub repository and keep it private. For a web preview, install
   dependencies with `npm install`, then run `npm run start:web`. For a static deployment,
   run `npm run build:web` and configure the publish directory as `dist`.

4. Keep credentials out of Git. Add any future service credentials through Replit Secrets.

The project currently has no backend or database. This handoff publishes the web client;
database schema, server routes, authentication, and any online sync need a separately scoped
implementation before connecting them to the app. The present prayer-time calculations and
preferences continue to work locally.

## Verification

Expo SDK 57's compatible `react-dom`, `react-native-web`, and `@expo/metro-runtime` packages
are in `package.json` and `package-lock.json`. `npm run typecheck` and `npm run build:web`
completed successfully; the export contains 19 static routes. A browser-size visual review
remains to be done after import into Replit or another environment where the local preview is
reachable.
