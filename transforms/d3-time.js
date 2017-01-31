import { isMemberExpression, buildMemberExpressionFromLiteral } from './common/utils.js'


const timeMap = [
  ['d3.time.second.utc',      buildMemberExpressionFromLiteral('d3.utcSecond')],
  ['d3.time.minute.utc',      buildMemberExpressionFromLiteral('d3.utcMinute')],
  ['d3.time.hour.utc',        buildMemberExpressionFromLiteral('d3.utcHour')],
  ['d3.time.day.utc',         buildMemberExpressionFromLiteral('d3.utcDay')],
  ['d3.time.sunday.utc',      buildMemberExpressionFromLiteral('d3.utcSunday')],
  ['d3.time.monday.utc',      buildMemberExpressionFromLiteral('d3.utcMonday')],
  ['d3.time.tuesday.utc',     buildMemberExpressionFromLiteral('d3.utcTuesday')],
  ['d3.time.wednesday.utc',   buildMemberExpressionFromLiteral('d3.utcWednesday')],
  ['d3.time.thursday.utc',    buildMemberExpressionFromLiteral('d3.utcThursday')],
  ['d3.time.friday.utc',      buildMemberExpressionFromLiteral('d3.utcFriday')],
  ['d3.time.saturday.utc',    buildMemberExpressionFromLiteral('d3.utcSaturday')],
  ['d3.time.week.utc',        buildMemberExpressionFromLiteral('d3.utcWeek')],
  ['d3.time.month.utc',       buildMemberExpressionFromLiteral('d3.utcMonth')],
  ['d3.time.year.utc',        buildMemberExpressionFromLiteral('d3.utcYear')],

  ['d3.time.second',          buildMemberExpressionFromLiteral('d3.timeSecond')],
  ['d3.time.minute',          buildMemberExpressionFromLiteral('d3.timeMinute')],
  ['d3.time.hour',            buildMemberExpressionFromLiteral('d3.timeHour')],
  ['d3.time.day',             buildMemberExpressionFromLiteral('d3.timeDay')],
  ['d3.time.sunday',          buildMemberExpressionFromLiteral('d3.timeSunday')],
  ['d3.time.monday',          buildMemberExpressionFromLiteral('d3.timeMonday')],
  ['d3.time.tuesday',         buildMemberExpressionFromLiteral('d3.timeTuesday')],
  ['d3.time.wednesday',       buildMemberExpressionFromLiteral('d3.timeWednesday')],
  ['d3.time.thursday',        buildMemberExpressionFromLiteral('d3.timeThursday')],
  ['d3.time.friday',          buildMemberExpressionFromLiteral('d3.timeFriday')],
  ['d3.time.saturday',        buildMemberExpressionFromLiteral('d3.timeSaturday')],
  ['d3.time.week',            buildMemberExpressionFromLiteral('d3.timeWeek')],
  ['d3.time.month',           buildMemberExpressionFromLiteral('d3.timeMonth')],
  ['d3.time.year',            buildMemberExpressionFromLiteral('d3.timeYear')],

  ['d3.time.seconds.utc',     buildMemberExpressionFromLiteral('d3.utcSeconds')],
  ['d3.time.minutes.utc',     buildMemberExpressionFromLiteral('d3.utcMinutes')],
  ['d3.time.hours.utc',       buildMemberExpressionFromLiteral('d3.utcHours')],
  ['d3.time.days.utc',        buildMemberExpressionFromLiteral('d3.utcDays')],
  ['d3.time.sundays.utc',     buildMemberExpressionFromLiteral('d3.utcSundays')],
  ['d3.time.mondays.utc',     buildMemberExpressionFromLiteral('d3.utcMondays')],
  ['d3.time.tuesdays.utc',    buildMemberExpressionFromLiteral('d3.utcTuesdays')],
  ['d3.time.wednesdays.utc',  buildMemberExpressionFromLiteral('d3.utcWednesdays')],
  ['d3.time.thursdays.utc',   buildMemberExpressionFromLiteral('d3.utcThursdays')],
  ['d3.time.fridays.utc',     buildMemberExpressionFromLiteral('d3.utcFridays')],
  ['d3.time.saturdays.utc',   buildMemberExpressionFromLiteral('d3.utcSaturdays')],
  ['d3.time.weeks.utc',       buildMemberExpressionFromLiteral('d3.utcWeeks')],
  ['d3.time.months.utc',      buildMemberExpressionFromLiteral('d3.utcMonths')],
  ['d3.time.years.utc',       buildMemberExpressionFromLiteral('d3.utcYears')],

  ['d3.time.seconds',         buildMemberExpressionFromLiteral('d3.timeSeconds')],
  ['d3.time.minutes',         buildMemberExpressionFromLiteral('d3.timeMinutes')],
  ['d3.time.hours',           buildMemberExpressionFromLiteral('d3.timeHours')],
  ['d3.time.days',            buildMemberExpressionFromLiteral('d3.timeDays')],
  ['d3.time.sundays',         buildMemberExpressionFromLiteral('d3.timeSundays')],
  ['d3.time.mondays',         buildMemberExpressionFromLiteral('d3.timeMondays')],
  ['d3.time.tuesdays',        buildMemberExpressionFromLiteral('d3.timeTuesdays')],
  ['d3.time.wednesdays',      buildMemberExpressionFromLiteral('d3.timeWednesdays')],
  ['d3.time.thursdays',       buildMemberExpressionFromLiteral('d3.timeThursdays')],
  ['d3.time.fridays',         buildMemberExpressionFromLiteral('d3.timeFridays')],
  ['d3.time.saturdays',       buildMemberExpressionFromLiteral('d3.timeSaturdays')],
  ['d3.time.weeks',           buildMemberExpressionFromLiteral('d3.timeWeeks')],
  ['d3.time.months',          buildMemberExpressionFromLiteral('d3.timeMonths')],
  ['d3.time.years',           buildMemberExpressionFromLiteral('d3.timeYears')],
]


/**
 * https://github.com/d3/d3/blob/master/CHANGES.md#time-formats-d3-time-format
 *
 * d3.time.second ↦ d3.timeSecond
 * d3.time.minute ↦ d3.timeMinute
 * d3.time.hour ↦ d3.timeHour
 * d3.time.day ↦ d3.timeDay
 * d3.time.sunday ↦ d3.timeSunday
 * d3.time.monday ↦ d3.timeMonday
 * d3.time.tuesday ↦ d3.timeTuesday
 * d3.time.wednesday ↦ d3.timeWednesday
 * d3.time.thursday ↦ d3.timeThursday
 * d3.time.friday ↦ d3.timeFriday
 * d3.time.saturday ↦ d3.timeSaturday
 * d3.time.week ↦ d3.timeWeek
 * d3.time.month ↦ d3.timeMonth
 * d3.time.year ↦ d3.timeYear
 *
 * d3.time.second.utc ↦ d3.utcSecond
 * d3.time.minute.utc ↦ d3.utcMinute
 * d3.time.hour.utc ↦ d3.utcHour
 * d3.time.day.utc ↦ d3.utcDay
 * d3.time.sunday.utc ↦ d3.utcSunday
 * d3.time.monday.utc ↦ d3.utcMonday
 * d3.time.tuesday.utc ↦ d3.utcTuesday
 * d3.time.wednesday.utc ↦ d3.utcWednesday
 * d3.time.thursday.utc ↦ d3.utcThursday
 * d3.time.friday.utc ↦ d3.utcFriday
 * d3.time.saturday.utc ↦ d3.utcSaturday
 * d3.time.week.utc ↦ d3.utcWeek
 * d3.time.month.utc ↦ d3.utcMonth
 * d3.time.year.utc ↦ d3.utcYear
 *
 * d3.time.seconds ↦ d3.timeSeconds
 * d3.time.minutes ↦ d3.timeMinutes
 * d3.time.hours ↦ d3.timeHours
 * d3.time.days ↦ d3.timeDays
 * d3.time.sundays ↦ d3.timeSundays
 * d3.time.mondays ↦ d3.timeMondays
 * d3.time.tuesdays ↦ d3.timeTuesdays
 * d3.time.wednesdays ↦ d3.timeWednesdays
 * d3.time.thursdays ↦ d3.timeThursdays
 * d3.time.fridays ↦ d3.timeFridays
 * d3.time.saturdays ↦ d3.timeSaturdays
 * d3.time.weeks ↦ d3.timeWeeks
 * d3.time.months ↦ d3.timeMonths
 * d3.time.years ↦ d3.timeYears
 *
 * d3.time.seconds.utc ↦ d3.utcSeconds
 * d3.time.minutes.utc ↦ d3.utcMinutes
 * d3.time.hours.utc ↦ d3.utcHours
 * d3.time.days.utc ↦ d3.utcDays
 * d3.time.sundays.utc ↦ d3.utcSundays
 * d3.time.mondays.utc ↦ d3.utcMondays
 * d3.time.tuesdays.utc ↦ d3.utcTuesdays
 * d3.time.wednesdays.utc ↦ d3.utcWednesdays
 * d3.time.thursdays.utc ↦ d3.utcThursdays
 * d3.time.fridays.utc ↦ d3.utcFridays
 * d3.time.saturdays.utc ↦ d3.utcSaturdays
 * d3.time.weeks.utc ↦ d3.utcWeeks
 * d3.time.months.utc ↦ d3.utcMonths
 * d3.time.years.utc ↦ d3.utcYears
 */
export default function transformer(file, api) {
  const j = api.jscodeshift
  const root = j(file.source)

  // Transform d3.scale
  timeMap.forEach((item) => {
    const [literal, nodeBuilder] = item

    root
      .find(j.MemberExpression)
      .filter((path) => isMemberExpression(path.node, literal))
      .replaceWith(() => nodeBuilder(j))
  })

  return root.toSource()
}
