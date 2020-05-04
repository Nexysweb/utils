export type Id = number;
export type Uuid = string;

export interface OptionSet {
  id: Id,
  name: string,
  description?: string
}

export interface UOptionSet {
  uuid: Uuid,
  name: string,
  description?: string
}