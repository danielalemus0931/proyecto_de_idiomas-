import type { LessonActivityId } from '../../types'
import { getActivityVisual, getTopicTheme } from '../../utils/activityThemes'

type Props = {
  activityId: LessonActivityId
  topic: string
  lessonTitle?: string
}

export default function ActivityThemeBanner({ activityId, topic, lessonTitle }: Props) {
  const visual = getActivityVisual(activityId, topic, lessonTitle)
  const topicTheme = getTopicTheme(topic)

  return (
    <div
      className="activity-theme-banner"
      style={{ backgroundImage: `${visual.gradient}, url(${visual.image})` }}
    >
      <div className="activity-theme-overlay">
        <span className="activity-theme-emoji" aria-hidden="true">
          {visual.emoji}
        </span>
        <div className="activity-theme-text">
          <span className="activity-theme-topic">
            {topicTheme.emoji} {topic}
          </span>
          <h4 className="activity-theme-title">{visual.label}</h4>
          {lessonTitle && <p className="activity-theme-lesson">{lessonTitle}</p>}
        </div>
      </div>
    </div>
  )
}
