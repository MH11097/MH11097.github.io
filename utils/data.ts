import { marked } from 'marked';
import { ENABLED_PROJECTS, getDevlogUrl } from './consts';

export interface Project {
  name: string;
  content: string;
  exists: boolean;
}

export interface Post {
  title: string;
  project: string;
  slug: string;
  content: string;
  rawTokens: marked.Token[];
}

async function fetchWithFallback(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn(`Error fetching ${url}:`, error);
    return null;
  }
}

export const DataService = {
  allProjects: async (): Promise<Project[]> => {
    const results = await Promise.allSettled(
      ENABLED_PROJECTS.map(async (project) => {
        const url = getDevlogUrl(project);
        const content = await fetchWithFallback(url);
        
        return {
          name: project,
          content: content || '',
          exists: content !== null
        };
      })
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          name: ENABLED_PROJECTS[index],
          content: '',
          exists: false
        };
      }
    });
  },

  allPostsOfProject: async (project: Project): Promise<Post[]> => {
    if (!project.exists || !project.content) {
      return [];
    }

    try {
      const tokens = marked.lexer(project.content);
      const posts: Post[] = [];
      let currentPost: Post | null = null;

      for (const token of tokens) {
        if (token.type === "heading" && token.depth === 1) {
          // Save previous post
          if (currentPost !== null) {
            posts.push(currentPost);
          }

          // Start new post
          currentPost = {
            title: token.text,
            project: project.name,
            slug: token.text.toLowerCase()
              .replace(/[^\w\s-]/g, '') // Remove special chars
              .replace(/\s+/g, '-')      // Replace spaces with hyphens
              .trim(),
            content: '',
            rawTokens: []
          };
        } else if (currentPost !== null) {
          currentPost.rawTokens.push(token);
        }
      }

      // Add last post
      if (currentPost) {
        posts.push(currentPost);
      }

      // Generate content for each post
      return posts.map(post => ({
        ...post,
        content: marked.parser(post.rawTokens)
      }));

    } catch (error) {
      console.error(`Error parsing DEVLOG for ${project.name}:`, error);
      return [];
    }
  },

  allPosts: async (): Promise<Post[]> => {
    const projects = await DataService.allProjects();
    const validProjects = projects.filter(p => p.exists);
    
    const postArrays = await Promise.all(
      validProjects.map(DataService.allPostsOfProject)
    );
    
    return postArrays.flat().sort((a, b) => {
      // Sort by title (assuming date format in title)
      return b.title.localeCompare(a.title);
    });
  },

  getProject: async (projectName: string): Promise<Project | null> => {
    if (!ENABLED_PROJECTS.includes(projectName)) {
      return null;
    }

    const url = getDevlogUrl(projectName);
    const content = await fetchWithFallback(url);
    
    return {
      name: projectName,
      content: content || '',
      exists: content !== null
    };
  },

  getPost: async (projectName: string, slug: string): Promise<Post | null> => {
    const project = await DataService.getProject(projectName);
    if (!project || !project.exists) {
      return null;
    }

    const posts = await DataService.allPostsOfProject(project);
    return posts.find(post => post.slug === slug) || null;
  }
};