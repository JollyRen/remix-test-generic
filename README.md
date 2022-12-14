# My Part of the Readme

Hi all! I'm Jeremy and I'm learning how to create a basic React Remix app. I'll make a checklist here of things I've done so far.

- [x] basic nav
- [x] basic styling (p, h1, etc.)
- [x] basic nav styles
- [ ] conditionally render nav links
- [x] index route
- [x] basic routes for navbar
- [ ] routes for all pages (CRUD applications)
  - [ ] Users
  - [ ] Routines
  - [ ] Activities
- [ ] connect to database (going to try pg first, then prisma)
  - [ ] pg
  - [ ] prisma
- [ ] connect to outside API
- [ ] generate loaders
  - [ ] register user
  - [ ] login user
  - [ ] profile page
  - [ ] see list of routines
  - [ ] see list of activities
- [ ] generate actions
  - [ ] create routines
  - [ ] edit routines
  - [ ] delete routines
  - [ ] create activities
  - [ ] edit activities
  - [ ] delete activities
- [ ] make a few forms for the actions
  - [ ] users
    - [ ] Create
    - [ ] update
    - [ ] delete
  - [ ] routines
    - [ ] Create
    - [ ] update
    - [ ] delete
  - [ ] activities
    - [ ] Create
    - [ ] update
    - [ ] delete
- [ ] style the pages

## Welcome to Remix

- [Remix Docs](https://remix.run/docs)

## Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying express applications you should be right at home just make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
