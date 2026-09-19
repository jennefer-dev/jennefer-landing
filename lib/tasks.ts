export type AgentClass =
  | 'Supervisor'
  | 'Business Analyst'
  | 'Tasker'
  | 'Developer'
  | 'Designer'
  | 'DevOps'
  | 'QA'
  | 'Reviewer';

export const AGENT_THEMES: Record<AgentClass, { color: string; gradient: string }> = {
  Supervisor: {
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.42), rgba(15, 23, 42, 0.88))'
  },
  'Business Analyst': {
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Tasker: {
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Developer: {
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, rgba(8, 145, 178, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Designer: {
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(219, 39, 119, 0.42), rgba(15, 23, 42, 0.88))'
  },
  DevOps: {
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.42), rgba(15, 23, 42, 0.88))'
  },
  QA: {
    color: '#f87171',
    gradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.42), rgba(15, 23, 42, 0.88))'
  },
  Reviewer: {
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(79, 70, 229, 0.42), rgba(15, 23, 42, 0.88))'
  },
};

export interface TaskType {
  id: string;
  title: string;
  targetAgent: AgentClass;
  fileBadge: string;
}

export const DEMO_TASKS: TaskType[] = [
  {
    id: 't1',
    title: 'Coordinate the upcoming quarterly release across all teams',
    targetAgent: 'Supervisor',
    fileBadge: 'Planning'
  },
  {
    id: 't2',
    title: 'Analyze user feedback and create feature requirements',
    targetAgent: 'Business Analyst',
    fileBadge: 'Feedback'
  },
  {
    id: 't3',
    title: 'Update all copyright years in the project files to 2026',
    targetAgent: 'Tasker',
    fileBadge: 'Routine'
  },
  {
    id: 't4',
    title: 'Implement the new OAuth2 login flow in the backend',
    targetAgent: 'Developer',
    fileBadge: 'Feature'
  },
  {
    id: 't5',
    title: 'Create a modern, soft-UI mockup for the user profile',
    targetAgent: 'Designer',
    fileBadge: 'Design'
  },
  {
    id: 't6',
    title: 'Migrate the database to the new AWS cluster',
    targetAgent: 'DevOps',
    fileBadge: 'Infrastructure'
  },
  {
    id: 't7',
    title: 'Write end-to-end Cypress tests for the checkout process',
    targetAgent: 'QA',
    fileBadge: 'Testing'
  },
  {
    id: 't8',
    title: 'Review the pull request for the new payment gateway',
    targetAgent: 'Reviewer',
    fileBadge: 'Code Review'
  }
];
