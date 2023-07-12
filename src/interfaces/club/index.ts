import { TrainingGroupInterface } from 'interfaces/training-group';
import { VenueInterface } from 'interfaces/venue';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClubInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  training_group?: TrainingGroupInterface[];
  venue?: VenueInterface[];
  user?: UserInterface;
  _count?: {
    training_group?: number;
    venue?: number;
  };
}

export interface ClubGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
