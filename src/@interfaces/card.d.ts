export interface UserRatingProps {
  hasRating: boolean;
  userRating?: number;
}

export interface MovieDataProps {
  name: string;
  src: string;
  hasRating: Pick<UserRatingProps, "hasRating">;
}
