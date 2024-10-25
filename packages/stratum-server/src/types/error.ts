import http from 'http';

export interface StratumError extends http.ServerResponse {
  code: string;
  message: string;
}
