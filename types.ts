
export interface User {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  avatar: string;
  lastSeen?: string;
  isSigner?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'text' | 'gesture' | 'system';
}

export interface CallSession {
  active: boolean;
  participant?: User;
  startTime?: number;
  isGesturing: boolean;
}

export enum AppRoute {
  DASHBOARD = '/',
  CALL = '/call',
  CHAT = '/chat',
  SETTINGS = '/settings'
}
