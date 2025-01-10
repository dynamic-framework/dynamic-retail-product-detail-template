import type { ApiDispute } from '../api-interface';
import { Dispute } from '../interface';

export default function disputeMapper(apiDispute: ApiDispute): Dispute {
  return {
    id: apiDispute.dispute_id,
    name: apiDispute.description,
    date: apiDispute.effective_date,
    amount: apiDispute.amount,
  };
}
