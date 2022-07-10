export interface CompanyDataType {
  description: string;
  description_mention: string;
  favicon: string;
  header_color: string;
  logo: string;
  name: string;
  owner: {
    name: string;
    username: string;
  };
  settings: {
    share_project_labels: string;
    disable_chat: boolean;
    personalised_email: boolean;
    can_create_projects: boolean;
  };

  slug: string;
  stats: {
    plan: {
      active: true;
      description: string;
      plan: string;
      projects: any;
      title: string;
      type: string;
      users: number;
      white_label: boolean;
    };
    private_projects: number;
    public_projects: number;
    team_members: number;
  };
  subscription: string;
  trial_period: boolean;
  unlimited_workspaces: boolean;
  whitelabel: {
    domains: [];
    email_footer: string;
    enabled: boolean;
    logo: string;
  };
}
