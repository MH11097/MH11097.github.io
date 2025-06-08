// GitHub username
export const GITHUB_USERNAME = 'MH11097';

// Projects to fetch from GitHub
export const ENABLED_PROJECTS = [
  'everyday', 
  'gust-lang', 
  'toylisp', 
  'ascii-d', 
  'snarkyterm', 
  'web-debugger'
];

// Site configuration - ROOT DOMAIN
export const SITE_NAME = 'MH11097 DevLog';
export const SITE_URL = 'https://MH11097.github.io'; // No /devlog suffix
export const TWITTER_USER = '@MH11097';
export const AUTHOR = 'MH11097';
export const DESCRIPTION = 'Development logs and project documentation';

// GitHub raw content base URL
export const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}`;
export const GITHUB_REPO_BASE = `https://github.com/${GITHUB_USERNAME}`;

export const getDevlogUrl = (project: string) => 
  `${GITHUB_RAW_BASE}/${project}/master/DEVLOG.md`;

export const getRepoUrl = (project: string) => 
  `${GITHUB_REPO_BASE}/${project}`;