export interface TechNode {
  id: string
  label: string
  category: 'language' | 'frontend' | 'backend' | 'ml' | 'tools'
  size: number // 1-10, represents proficiency/importance
}

export interface TechLink {
  source: string
  target: string
}

export const techStackData = {
  nodes: [
    // Languages
    { id: 'typescript', label: 'TypeScript', category: 'language', size: 10 },
    { id: 'javascript', label: 'JavaScript', category: 'language', size: 9 },
    { id: 'python', label: 'Python', category: 'language', size: 10 },
    { id: 'java', label: 'Java', category: 'language', size: 7 },
    { id: 'c', label: 'C', category: 'language', size: 6 },
    { id: 'sql', label: 'SQL', category: 'language', size: 7 },

    // Frontend
    { id: 'react', label: 'React', category: 'frontend', size: 10 },
    { id: 'nextjs', label: 'Next.js', category: 'frontend', size: 10 },
    { id: 'react-native', label: 'React Native', category: 'frontend', size: 8 },
    { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', size: 9 },

    // Backend
    { id: 'flask', label: 'Flask', category: 'backend', size: 8 },
    { id: 'fastapi', label: 'FastAPI', category: 'backend', size: 8 },
    { id: 'nodejs', label: 'Node.js', category: 'backend', size: 7 },

    // ML/AI
    { id: 'tensorflow', label: 'TensorFlow', category: 'ml', size: 9 },
    { id: 'xgboost', label: 'XGBoost', category: 'ml', size: 8 },
    { id: 'numpy', label: 'NumPy', category: 'ml', size: 7 },
    { id: 'pandas', label: 'Pandas', category: 'ml', size: 7 },

    // Tools
    { id: 'git', label: 'Git', category: 'tools', size: 9 },
    { id: 'docker', label: 'Docker', category: 'tools', size: 7 },
    { id: 'firebase', label: 'Firebase', category: 'tools', size: 6 },
    { id: 'postman', label: 'Postman', category: 'tools', size: 6 },
  ] as TechNode[],

  links: [
    // TypeScript connections
    { source: 'typescript', target: 'react' },
    { source: 'typescript', target: 'nextjs' },
    { source: 'typescript', target: 'react-native' },
    { source: 'typescript', target: 'nodejs' },

    // Language Grouping (Java/C/SQL -> Python)
    { source: 'java', target: 'python' },
    { source: 'c', target: 'python' },
    { source: 'sql', target: 'python' },

    // JavaScript connections
    { source: 'javascript', target: 'react' },
    { source: 'javascript', target: 'nextjs' },

    // React ecosystem
    { source: 'react', target: 'nextjs' },
    { source: 'react', target: 'react-native' },
    { source: 'react', target: 'tailwind' },
    { source: 'nextjs', target: 'tailwind' },

    // Python connections
    { source: 'python', target: 'flask' },
    { source: 'python', target: 'fastapi' },
    { source: 'python', target: 'tensorflow' },
    { source: 'python', target: 'numpy' },
    { source: 'python', target: 'pandas' },

    // ML connections
    { source: 'tensorflow', target: 'numpy' },
    { source: 'tensorflow', target: 'pandas' },
    { source: 'xgboost', target: 'python' },
    { source: 'xgboost', target: 'numpy' },
    { source: 'xgboost', target: 'pandas' },
    { source: 'numpy', target: 'pandas' },

    // Backend connections
    { source: 'flask', target: 'sql' },
    { source: 'fastapi', target: 'sql' },
    { source: 'nodejs', target: 'javascript' },

    // Tools connections
    { source: 'git', target: 'docker' },
    { source: 'firebase', target: 'react' },
    { source: 'firebase', target: 'react-native' },
    { source: 'postman', target: 'git' },
  ] as TechLink[],
}

export const getCategoryColor = (category: TechNode['category']) => {
  const colors = {
    language: '#FF6B35',    // Orange (existing accent)
    frontend: '#00D9FF',     // Blue
    backend: '#1EFF00',      // Terminal green
    ml: '#B794F6',           // Purple
    tools: '#FFD23F',        // Yellow
  }
  return colors[category]
}
