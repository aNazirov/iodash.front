import { ReactElement } from "react";

export interface ILinkObj {
  name: string;
  href: string;
  icon: ReactElement;
  current: boolean;
}

export interface IStatus {
  id: number;
  title: string;
}

export interface IType {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface IRegistration {
  name: string;
  email: string;
  password: string;
}

export interface IAutoComplete {
  index: string;
  search: string;
  filter?: string[];
}

export interface IRole {
  id: number;
  title: string;
}

export interface ICategory {
  id: number;
  title: string;
  _count?: {
    lessons: number;
  };
}

export interface ITag {
  id: number;
  title: string;
  icon?: IFile;
}

export interface ISubscriptionType {
  id: number;
  title: string;
  description?: string;
  months: number;
  price: number;
  downloadsPerDay: number;
}

export interface ILesson {
  id: number;
  price: number;
  title: string;
  description?: string;
  poster?: IFile;
  file?: IFile;
  categories: ICategory[];
  isFavourite?: boolean;
  tags: ITag[];
  _count?: {
    downloads: number;
    views: number;
  };
}

export interface IUser {
  id: number;
  name: string;
  contact: IContact;
  role: IRole;
  balance?: number;
  activeBefore: Date;
  avatar?: IFile;
  subscriptionType?: ISubscriptionType;
  _count: {
    downloads: number;
    favourites: number;
    views: number;
  };
}

export interface IContact {
  email: string;
}

export interface IFile {
  id: number;
  name: string;
  url: string;
}
