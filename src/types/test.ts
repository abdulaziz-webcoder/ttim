
export interface Test {
  id: number;
  title: string;
  subject: string;
  description: string;
  duration: number;
  max_score: number;
  status: 'completed' | 'available' | 'upcoming';
  date: string;
  score: number | null;
}

export interface Statistics {
  total_tests_taken: number;
  average_score: number;
  total_tests_available: number;
}
