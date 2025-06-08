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
  rawContent: string;
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
      // Split content by h1 headers (# Title)
      const sections = project.content.split(/^# /m).filter(section => section.trim());
      const posts: Post[] = [];

      for (const section of sections) {
        const lines = section.split('\n');
        const title = lines[0].trim();
        const content = lines.slice(1).join('\n').trim();

        if (title) {
          posts.push({
            title,
            project: project.name,
            slug: title.toLowerCase()
              .replace(/[^\w\s-]/g, '') // Remove special chars
              .replace(/\s+/g, '-')      // Replace spaces with hyphens
              .trim(),
            content: marked(content),
            rawContent: content
          });
        }
      }

      return posts;

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