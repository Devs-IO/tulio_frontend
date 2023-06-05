import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BlockedError = {
  __typename?: 'BlockedError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type CreateRoleDto = {
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  typeAccess: Scalars['String']['input'];
};

export type CreateRoleOutput = {
  __typename?: 'CreateRoleOutput';
  blocked?: Maybe<BlockedError>;
  errors?: Maybe<Array<ZodValidationError>>;
  output?: Maybe<RoleEntity>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: CreateRoleOutput;
};


export type MutationCreateRoleArgs = {
  CreateRoleDTO: CreateRoleDto;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type RoleEntity = {
  __typename?: 'RoleEntity';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  typeAccess: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  documentNumber: Scalars['String']['output'];
  documentNumberContact?: Maybe<Scalars['String']['output']>;
  documentType: Scalars['String']['output'];
  documentTypeContact?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nameContact?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  phoneContact?: Maybe<Scalars['String']['output']>;
  responsibleUser?: Maybe<UserEntity>;
  role: RoleEntity;
  updatedAt: Scalars['String']['output'];
};

export type ZodValidationError = {
  __typename?: 'ZodValidationError';
  code: Scalars['String']['output'];
  fatal?: Maybe<Scalars['Boolean']['output']>;
  message: Scalars['String']['output'];
  path: Array<Scalars['String']['output']>;
};
