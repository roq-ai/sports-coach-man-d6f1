import { TrainingDayInterface } from 'interfaces/training-day';
import { ClubInterface } from 'interfaces/club';
import { GetQueryInterface } from 'interfaces';

export interface VenueInterface {
  id?: string;
  name: string;
  club_id?: string;
  created_at?: any;
  updated_at?: any;
  training_day?: TrainingDayInterface[];
  club?: ClubInterface;
  _count?: {
    training_day?: number;
  };
}

export interface VenueGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  club_id?: string;
}
