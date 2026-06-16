import { useState } from 'react';
import { UserRound } from 'lucide-react';
import { getAvatarUrl } from '../utils/ambassadors';

export function Avatar({ ambassador, large = false }) {
  const [failed, setFailed] = useState(false);
  const className = large ? 'avatar large' : 'avatar';

  if (failed) {
    return (
      <div className={className}>
        <UserRound size={large ? 46 : 28} />
      </div>
    );
  }

  return (
    <div className={className}>
      <img src={getAvatarUrl(ambassador)} alt="" loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
}
