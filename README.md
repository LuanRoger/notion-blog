# notion-blog

This is a simple blog system using Notion as a backend.
Access a deployed instance [here](https://notion-blog-luanroger.vercel.app).

## Stack

- Astro
- TypeScript
- React
- Notion API
- Tailwind CSS

## How to run

1. Clone this repository

```bash
git clone https://github.com/LuanRoger/notion-blog.git
```

2. Configure the environment variables

```bash
cp .env.example .env
```

And the fill the `.env` file with your Notion API key, database ID and the other variables.

3. Install the dependencies

```bash
npm install
```

4. Run the project

```bash
npm run dev
```

If you want a more detailed tutorial about the setup, you can head over to my [blog post (pt-br)](https://lrtechblog.vercel.app/post/notion_cms_blog) about how to use the Notion as a CMS, you will see how to implement the blog system step by step and you can even use your favorite framework.
