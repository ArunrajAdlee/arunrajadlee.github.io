import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { useIntl } from 'react-intl';
import Section from './Section';
import ExperienceItem from './ExperienceItem';
import useResume from '../data/useResume';

export default function Experience() {
  const { formatMessage } = useIntl();
  const resume = useResume();
  return (
    <Section
      id='experience'
      eyebrow={formatMessage({ id: 'section.experience.eyebrow' })}
      title={formatMessage({ id: 'section.experience.title' })}
      maxWidth='md'
    >
      <Timeline
        sx={{
          p: 0,
          m: 0,
          // remove the empty left-hand opposite content column
          [`& .${timelineItemClasses.root}:before`]: {
            flex: '0 !important',
            padding: '0 !important',
          },
        }}
      >
        {resume.experience.map((role, i) => (
          <TimelineItem key={`${role.company}-${role.title}`}>
            <TimelineSeparator>
              <TimelineDot
                variant='outlined'
                color='primary'
                sx={{ borderWidth: 2 }}
              />
              {i < resume.experience.length - 1 && (
                <TimelineConnector sx={{ bgcolor: 'divider' }} />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ pb: 4, pr: 0 }}>
              <ExperienceItem role={role} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
