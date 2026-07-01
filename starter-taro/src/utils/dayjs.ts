/**
 * Day.js 配置实例
 *
 * 统一导出一个配置好的 dayjs 实例，避免各处重复 import locale 和插件。
 */

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// ─── 插件 ───────────────────────────────────────────────────

import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import duration from 'dayjs/plugin/duration'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(advancedFormat)
dayjs.extend(duration)

// 设为中文 locale
dayjs.locale('zh-cn')

export { dayjs }
export default dayjs
