import { VenueInterface } from 'interfaces/venue';
import { TrainingGroupInterface } from 'interfaces/training-group';
import { GetQueryInterface } from 'interfaces';

export interface TrainingDayInterface {
  id?: string;
  date: any;
  venue_id?: string;
  training_group_id?: string;
  created_at?: any;
  updated_at?: any;

  venue?: VenueInterface;
  training_group?: TrainingGroupInterface;
  _count?: {};
}

export interface TrainingDayGetQueryInterface extends GetQueryInterface {
  id?: string;
  venue_id?: string;
  training_group_id?: string;
}
