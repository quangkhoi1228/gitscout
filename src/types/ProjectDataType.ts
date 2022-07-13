export default interface ProjectDataType {
  background: string;
  background_thumb: string;
  code: string;
  company: {
    logo: string;
    name: string;
    slug: string;
  };
  created_at: {
    date_for_humans: string;
    timestamp: number;
    timezone: string;
  };
  dates: {
    start: string;
    due: string;
  };

  id: number;
  labels: [];
  logo: string;
  name: string;
  owner: {
    avatar: string;
    confirmed: boolean;
    headline: string;
    link: boolean;
    name: string;
    username: string;
  };
  percent: number;
  pure_name: string;
  slug: string;
  status: {
    code: number;
    title: string;
  };

  visibility: {
    is_private: boolean;
    title: string;
  };
}
