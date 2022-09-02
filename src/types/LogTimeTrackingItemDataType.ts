export interface LogTimeTrackingItemDataType {
  comment: string;
  time: {
    id: number;
    start: {
      date_for_humans: string;
      timezone: string;
      timestamp: number;
    };
    end: {
      date_for_humans: string;
      timezone: string;
      timestamp: number;
    };
    total: string;
  };
  task: {
    uuid: string;
    code: string;
    value_fixed: string;
    effort: {
      title: string;
      effort: string;
    };
    type: {
      title: string;
      color: string;
    };
    timer: boolean;
    has_sprints: boolean;
    has_user_stories: boolean;
    workflow: {
      id: number;
      slug: string;
      state: number;
      title: string;
      color: string;
    };
    parent_id: number;
    image: boolean;
    labels: [];
    slug: string;
    state: null;
    title: string;
    description: string;
    user: {
      name: string;
      headline: string;
      username: string;
      avatar: string;
      link: boolean;
      confirmed: boolean;
    };
    users: [
      {
        name: string;
        headline: string;
        username: string;
        avatar: string;
        link: boolean;
        confirmed: boolean;
      }
    ];
    features: {
      attachments: [];
      checklists: {
        data: [];
        stats: {
          completed_percent: null;
        };
      };
      task_fields: [];
      videos: {
        data: [];
        total: 0;
        count: 0;
        per_page: 15;
        current_page: 1;
        total_pages: 1;
      };
      subtasks: [];
      comments: {
        data: [];
      };
    };
    completed_user: null;
    completed_date: [];
    start_date: [];
    due_date: [];
    created_at: {
      date_for_humans: string;
      timezone: string;
      timestamp: number;
    };
    settings: {
      is_blocker: boolean;
      is_bug: boolean;
      is_draft: boolean;
      is_archived: boolean;
    };
    time_tracker: null;
    time_tracker_user: null;
    stats: {
      time_trackers: number;
      comments: number;
      checklists: number;
      attachments: number;
      subtasks: number;
      videos: number;
      checklist_percentage: number;
    };
    company: {
      slug: string;
      name: string;
    };
    project: {
      slug: string;
      name: string;
    };
    sprint: {
      slug: null;
      title: null;
    };
    user_story: {
      slug: null;
      title: null;
    };
    rating: 0;
    has_recurring: false;
    is_favorite: false;
  };
  user: {
    name: string;
    headline: string;
    username: string;
    avatar: string;
    link: boolean;
    confirmed: boolean;
  };
  billed: boolean;
}
