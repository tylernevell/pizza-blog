import { Pane, majorScale } from 'evergreen-ui';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import Container from '../../components/container';
import HomeNav from '../../components/home-nav';
import PostPreview from '../../components/post-preview';
import { posts as postsFromCMS } from '../../content';

const Blog = ({ posts }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  );
};

Blog.defaultProps = {
  posts: [],
};

export function getStaticProps(ctx) {
  // turn into JSON
  const cmsPosts = (
    ctx.preview ? postsFromCMS.draft : postsFromCMS.published
  ).map((post) => {
    const { data } = matter(post);
    return data;
  });

  const filenames = fs.readdirSync(path.join(process.cwd(), 'posts'));

  const filePosts = filenames.map((name) => {
    const fullPath = path.join(process.cwd(), 'posts', name);
    const file = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(file);
    return data;
  });

  const posts = [...cmsPosts, ...filePosts];

  return {
    props: { posts },
  };
}

export default Blog;

/**
 * Need to get the posts from the
 * fs and our CMS
 */
