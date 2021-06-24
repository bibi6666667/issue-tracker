export interface UserType {
  id: number;
  name: string;
  login_id: string;
}

export interface ListItemsType {
  id: number | string;
  title: string;
}

export interface LabelType extends ListItemsType {
  color: string;
}

export interface MilestoneType extends ListItemsType {
  due_date: string;
  color: string;
}

export interface IssueDetailType {
  id: number;
  title: string;
  content: string;
  status: boolean;
  created_at: string;
  label_list: string[];
  author: {
    name: string;
    user_id: string;
  };
  milestone: {
    milestone_id: number;
    title: string;
  };
  comment: {
    id: number;
    content: string;
    created_at: string;
    author: {
      name: string;
      user_id: string;
    };
  }[];
}

export interface IssueType {
  id: number;
  title: string;
  content: string;
  status: boolean;
  created_at: string;
  label_list: LabelType[];
  author: {
    name: string;
    user_id: string;
  };
  assignees: {
    name: string;
    user_id: string;
  }[];
  milestone: {
    milestone_id: number;
    title: string;
  };
}

export interface filterOptionType {
  title: string;
  key: string;
}

export interface UsefulObjectType {
  [key: string]: string | ListItemsType;
}

export interface IssueRefStateType {
  assignee: string | ListItemsType[];
  author: string | ListItemsType[];
  milestone: string | ListItemsType[];
  label: string | ListItemsType[];
}

export interface TemporalRefStateType {
  assignees: ListItemsType[];
  labels: LabelType[];
  milestones: ListItemsType[];
}

// export interface IssueRefArrayType {
//   assignee: ListItemsType[];
//   author: ListItemsType[];
//   milestone: ListItemsType[];
//   label: ListItemsType[];
// }

export interface IssueRefMenuProps {
  buttonTitle: keyof IssueRefStateType;
  listItems: ListItemsType[];
}

export interface SimpleAppBarProps {
  openIssues: IssueType[];
  closeIssues: IssueType[];
}

export interface EditorRefsType {
  [key: string]: any;
}
