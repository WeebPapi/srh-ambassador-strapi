import { GraduationCap } from 'lucide-react';
import { InfoRow } from '../components/InfoRow';
import { PageTitle } from '../components/PageTitle';
import { getRecordId } from '../services/cms';

export function ProgramsPage({ programs }) {
  return (
    <>
      <PageTitle eyebrow="Programs" title="Study Areas Connected To Ambassadors" />
      <section className="list">
        {programs.map((program) => (
          <InfoRow key={getRecordId(program)} icon={GraduationCap} title={program.programName}>
            <p>{program.degreeLevel} - {program.department}</p>
            <p>{program.description}</p>
          </InfoRow>
        ))}
      </section>
    </>
  );
}
