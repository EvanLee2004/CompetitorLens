export interface AnalysisResult {
  companyName: string;
  summary: string;
  coreFeatures: string[];
  targetAudience: string[];
  sellingPoints: string[];
  pricingModel?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Mixed';
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  FETCHING = 'FETCHING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ScrapedData {
  url: string;
  text: string;
  title: string;
}