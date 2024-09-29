export interface PostFormProps {
  onSuccessSubmit: () => void;
}

export interface PostPayload {
  body: string;
  image: string;
}

export interface PostForm extends PostPayload {}
