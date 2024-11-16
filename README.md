# DVD Shop website (NextJS)

The website is meant to be used by a company renting DVD's. The website displays the available titles (movies/TV series). The user can search for titles by name, or browse the featured titles. The website is responsive for mobile and tablet devices.

User guide can be found here:
https://github.com/romesh-jaya/movie-shop-nextjs/blob/main/Quick%20Start%20Guide.pdf?raw=true

## Screenshots

<p align="center">
Home Page
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153548095-05880048-26d9-4809-8eef-b90cdf683838.png" height="400" alt="Home page" style="object-fit: contain;" >
</div>

---

<p align="center">
Movie Details
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153548107-45d41ed9-6e0b-4dc9-84a0-e7dd5d228713.png" height="400" alt="Movie Details" style="object-fit: contain;" >
</div>

---

<p align="center">
Filtering movies
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/56665179/153547906-25fb9cff-39da-48d0-b771-a11da023faed.png" height="400" alt="Filtering movies" style="object-fit: contain;" >
</div>

---

## Tech Stack

- NextJS
- Typescript
- Integration with GraphQL via a lambda function on netlify
- Ant Design
- React Context
- Side-drawer
- SCSS modules
- Carousel component using pure-react-carousel
- Husky pre-commit hooks

## Netlify functions env variables

These are defined in the Netlify dashboard's Build & deploy -> environment variables section

Note: the graphql queries are currently being issued under the 'user' role ('x-hasura-role': 'user'). This role needs to be granted select permissions in the graphql console.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Deploys

Auto publishing is on in the netlify console.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
