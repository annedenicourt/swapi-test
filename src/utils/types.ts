export type Character = {
  name: string | undefined;
  mass?: string;
  height?: string | undefined;
  hair_color?: string;
  eye_color?: string;
  gender?: string;
  films?: Film[];
  created?: Date;
  edited?: Date;
  url?: string;
};

export type Film = {
  title: string;
  episode_id: string;
  url: string;
};
