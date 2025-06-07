import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { SEO } from '../components/SEO';
import { BackArrow } from '../components/Icons';
import { getAllPosts, getPostBySlug, Post } from '../utils/posts';

interface PostPageProps {
  post: Post;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  return (
    <>
      <SEO 
        title={post.title} 
        description={post.excerpt || `Read ${post.title}`} 
      />
      <main className="container-center my-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-stone-500 hover:text-stone-700 mb-8 text-sm font-mono"
          >
            <BackArrow />
            <span className="ml-2">All posts</span>
          </Link>
          
          {/* Post header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-stone-500 font-mono text-sm">
              Posted on {new Date(post.date).toLocaleDateString()}
            </time>
          </header>
          
          {/* Post content */}
          <div 
            className="github-theme prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default PostPage;