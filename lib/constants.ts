export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'nsk6704'

export const SITE_CONFIG = {
  name: 'Saketh Kashyap Nagendra',
  title: 'Software Engineer & Data Science Student',
  description: 'Software Engineering Intern at Boeing | Data Science Student at IIT Madras',
  email: 'sakethkashyap.nagendra@gmail.com',
  location: 'Hyderabad, India',
  github: 'https://github.com/nsk6704',
  linkedin: 'https://www.linkedin.com/in/saketh-kashyap-nagendra/',
  leetcode: 'https://leetcode.com/u/saketh6704/',
  availability: 'Available for Opportunities',
}

export const FEATURED_PROJECTS = [
  'Credify',
  'InterviewAssistant',
  'ProdReady',
  'UpWell',
]

// Project descriptions for GitHub repos
export const PROJECT_DESCRIPTIONS: Record<string, string> = {
  Credify: 'A personal wellness and finance tracker designed as an all-in-one companion for monitoring habits, financial goals, and overall well-being. Built to help users maintain a balanced lifestyle.',
  InterviewAssistant: 'An AI-powered interview practice application built with FastAPI, React, and Groq\'s Llama 3.3 models. Designed to simulate realistic technical interviews with a focus on conversational quality, adaptability, and professional feedback.',
  ProdReady: 'A production readiness checker that scans any public GitHub repo across 14 health checks — from CI/CD and testing to error handling and monitoring. Built with Next.js, Prisma, and the GitHub API.',
  UpWell: 'Landing page for UpWell — an Android app for tracking habits, finances, and well-being with gamification. Features XP systems, streaks, and fully private local storage.',
}

// Project complexity metrics (replaces star/fork counts)
export const PROJECT_METRICS: Record<string, string> = {
  Credify: 'Wellness & Finance',
  InterviewAssistant: 'AI-Powered Tool',
  ProdReady: '14 Health Checks',
  UpWell: 'Habits • Finance • Wellness',
  AgriGuard: '37 Classes • CNN Model',
}

// Custom project not on GitHub
export const CUSTOM_PROJECTS = {
  AgriGuard: {
    title: 'AgriGuard',
    description: 'Designed a web application to detect diseases in crops like tomato and bell pepper using a TensorFlow CNN model trained on 37 disease classes. Developed a custom RAG chatbot using LLaMA 3 and Groq API to deliver real-time, contextual disease insights to users. Built a modular Flask backend handling image preprocessing, model inference, and chatbot responses.',
    tech: ['Flask', 'TensorFlow', 'LLaMA 3', 'Groq API'],
    links: { github: null, demo: null }
  }
}
