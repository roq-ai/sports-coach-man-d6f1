import { TrainingDayInterface } from 'interfaces/training-day';
import { ClubInterface } from 'interfaces/club';
import { GetQueryInterface } from 'interfaces';

export interface TrainingGroupInterface {
  id?: string;
  schedule: string;
  club_id?: string;
  created_at?: any;
  updated_at?: any;
  training_day?: TrainingDayInterface[];
  club?: ClubInterface;
  _count?: {
    training_day?: number;
  };
}

export interface TrainingGroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  schedule?: string;
  club_id?: string;
}
