import type { ApiActivity } from '../api-interface';
import { ActivityStatus } from '../config';
import type { Activity } from '../interface';

export default function activityMapper(apiActivity: ApiActivity): Activity {
  return {
    id: apiActivity.id,
    name: apiActivity.description,
    date: apiActivity.effective_date,
    amount: apiActivity.amount,
    status: 'completed' as ActivityStatus,
  };
}
