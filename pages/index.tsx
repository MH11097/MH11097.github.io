import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { SEO } from '../components/SEO';
import { getAllPosts, Post } from '../utils/posts';
import { SITE_NAME, DESCRIPTION } from '../utils/consts';

interface HomeProps {
  posts: Post[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <SEO title={SITE_NAME} description={DESCRIPTION} />
      <main className="container-center github-theme my-10 min-h-full flex-1">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
          <p className="text-lg text-gray-600 mb-8">
            {DESCRIPTION}
          </p>
          
          {posts.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
              {posts.map((post) => (
                <article key={post.slug} className="border-b pb-6 mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link 
                      href={`/${post.slug}`} 
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <time className="text-sm text-gray-500 block mb-3">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                  {post.excerpt && (
                    <p className="text-gray-700 mb-3">{post.excerpt}</p>
                  )}
                  <Link 
                    href={`/${post.slug}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No posts yet. Add some markdown files to the posts/ directory!</p>
              <p className="text-sm text-gray-400">Check the README for instructions.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  
  return {
    props: {
      posts: posts.slice(0, 10), // Show latest 10 posts
    },
  };
};

export default Home;