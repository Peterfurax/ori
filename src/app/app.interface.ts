export interface PageObj {
  title?: string;
  component?: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
}

export interface FullInfo {
  uri?: string;
  uriThumb?: string;
  bitrate?: number;
  duration?: string;
  height?: string;
  orientation?: string;
  size?: string;
  width?: string;
  guestname?: string;
  guestfirstname?: string;
  guestoccupation?: string;
  guestplace?: string;
  guestS1?: string;
  guesttext?: string;
  journalistname?: string;
  journalistfirstname?: string;
  journalistoccupation?: string;
  journalistsociety?: string;
  journalistservice?: string;
  distributionembargo_date?: string;
  distributionsave_rush?: string;
  distributionArr?: string[];
  dateImport?: number;
  datePrise?: string;
  dateSend?: string;
  resultSend?: string;
}

export interface AppAllInfo {
  Names: string;
  PackageName: string;
  VersionCode: string;
  VersionNumber: string;
}

export interface VideoAllInfo {
  dateImport: number;
  datePrise: string;
  dateSend: string;
  resultSend: string;
  uri: string;
  uriThumb: string;
  infoVideo: InfoVideo;
}

export interface InfoVideo {
  bitrate: number;
  duration: number;
  height: number;
  orientation: string;
  size: number;
  width: number;
}

export interface Profile {
  name: string;
  firstname: string;
  occupation: string;
  service: string;
  society: string;
}
