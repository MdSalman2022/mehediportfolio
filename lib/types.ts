export interface Project {
  _id: string;
  title: string;
  technologies: string[];
  img: string[];
  sitelink: string;
  codelink: string;
  project_id: string;
  desc: string;
  project_type: string;
  isHidden?: boolean;
}
