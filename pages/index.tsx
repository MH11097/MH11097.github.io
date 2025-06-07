import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { SEO } from '../components/SEO';
import { DataService, Post, Project } from '../utils/data';
import { SITE_NAME, DESCRIPTION, ENABLED_PROJECTS, getRepoUrl } from '../utils/consts';

interface HomeProps {
  allPosts: Post[];
  projects: Project[];
}

const Home: NextPage<HomeProps> = ({ allPosts, projects }) => {
  // Group posts by project
  const postsByProject = ENABLED_PROJECTS.reduce((acc, projectName) => {
    acc[projectName] = allPosts.filter(post => post.project === projectName);
    return acc;
  }, {} as Record<string, Post[]>);

  const validProjects = projects.filter(p => p.exists);
  const recentPosts = allPosts.slice(0, 10); // Latest 10 posts

  return (
    <>
      <SEO title={SITE_NAME} description={DESCRIPTION} />
      <main className="container-center github-theme my-10 min-h-full flex-1">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Hello! I'm MH11097!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Look like you've found my space on the internet.
            </p>
            <p className="text-gray-700">
              I keep development logs for the projects I'm working on. You can find them here:
            </p>
          </section>

          {/* Projects Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Projects</h2>
            <div className="space-y-4">
              {ENABLED_PROJECTS.map((projectName) => {
                const project = projects.find(p => p.name === projectName);
                const posts = postsByProject[projectName] || [];
                const isActive = project?.exists && posts.length > 0;
                
                return (
                  <div key={projectName} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        href={`/${projectName}`}
                        className={`text-xl font-bold ${isActive ? 'text-blue-600 hover:underline' : 'text-gray-400'}`}
                      >
                        {projectName}
                      </Link>
                      <span className={`text-sm px-2 py-1 rounded ${
                        isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {isActive ? `${posts.length} posts` : 'No devlog'}
                      </span>
                      <a 
                        href={getRepoUrl(projectName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        GitHub →
                      </a>
                    </div>
                    <p className="text-gray-600 text-sm italic">
                      {getProjectDescription(projectName)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <article key={`${post.project}-${post.slug}`} className="border-b pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {post.project}
                      </span>
                      <span className="text-sm text-gray-500">
                        {extractDate(post.title) || 'Recent'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      <Link 
                        href={`/${post.project}/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {cleanTitle(post.title)}
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-3">
                      {getPostExcerpt(post.content)}
                    </p>
                    <Link 
                      href={`/${post.project}/${post.slug}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </article>
                ))}
              </div>
              
              {allPosts.length > 10 && (
                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Showing {recentPosts.length} of {allPosts.length} total posts.
                    Browse individual projects above to see all posts.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* No Posts Message */}
          {allPosts.length === 0 && (
            <section className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">No Posts Yet</h2>
              <p className="text-gray-600 mb-4">
                It looks like the development logs are still being set up.
              </p>
              <p className="text-sm text-gray-500">
                Make sure your projects have DEVLOG.md files in their repositories.
              </p>
            </section>
          )}

          {/* Contact */}
          <section className="mt-16 pt-8 border-t">
            <p className="text-gray-700">
              Most of my other projects don't have a DEVLOG, but please feel free to check them on{' '}
              <a 
                href="https://github.com/MH11097" 
                className="text-blue-600 hover:underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

// Helper functions
function getProjectDescription(projectName: string): string {
  const descriptions: Record<string, string> = {
    'everyday': 'Writing about what I learned everyday',
    'gust-lang': 'My journey to build a toy programming language',
    'toylisp': 'A toy LISP-alike language, focusing on building a bytecode interpreter',
    'ascii-d': 'Cross-platform ASCII diagram drawing application',
    'snarkyterm': 'A terminal emulator written in Rust and WGPU',
    'web-debugger': 'A Web-based JavaScript debugger'
  };
  return descriptions[projectName] || 'Project development log';
}

function extractDate(title: string): string | null {
  // Try to extract date from title (assuming format like "2024-01-01 - Title")
  const dateMatch = title.match(/^(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return new Date(dateMatch[1]).toLocaleDateString();
  }
  return null;
}

function cleanTitle(title: string): string {
  // Remove date prefix if exists
  return title.replace(/^\d{4}-\d{2}-\d{2}\s*-\s*/, '').trim();
}

function getPostExcerpt(content: string): string {
  // Remove HTML tags and get first few sentences
  const text = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\n+/g, ' ')    // Replace newlines with spaces
    .trim();
  
  const sentences = text.split('. ').slice(0, 2).join('. ');
  return sentences.length > 200 
    ? sentences.substring(0, 200) + '...'
    : sentences + (sentences.endsWith('.') ? '' : '...');
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [allPosts, projects] = await Promise.all([
      DataService.allPosts(),
      DataService.allProjects()
    ]);

    return {
      props: {
        allPosts,
        projects
      },
      // Revalidate every hour in case of updates
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    
    return {
      props: {
        allPosts: [],
        projects: []
      },
      revalidate: 3600
    };
  }
};

export default Home;