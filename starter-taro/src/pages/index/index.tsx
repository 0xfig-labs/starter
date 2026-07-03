import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import {
  ActionGrid,
  AppHeader,
  Badge,
  Card,
  EmptyState,
  ErrorState,
  ListItem,
  LoadingState,
  PageShell,
  Section,
  StatCard,
} from '@/components'
import './index.css'

const starterActions = [
  { title: '页面骨架', desc: 'Shell', icon: 'i-mingcute-layout-6-line', tone: 'blue' as const },
  { title: '请求封装', desc: 'HTTP', icon: 'i-mingcute-api-line', tone: 'green' as const },
  { title: '状态管理', desc: 'Store', icon: 'i-mingcute-box-3-line', tone: 'purple' as const },
  { title: '表单校验', desc: 'Zod', icon: 'i-mingcute-shield-line', tone: 'orange' as const },
  { title: '数据缓存', desc: 'Query', icon: 'i-mingcute-database-line', tone: 'blue' as const },
  { title: '日期工具', desc: 'Day.js', icon: 'i-mingcute-time-line', tone: 'slate' as const },
  { title: '图标系统', desc: 'Iconify', icon: 'i-mingcute-palette-line', tone: 'purple' as const },
  { title: '多端构建', desc: 'Taro', icon: 'i-mingcute-rocket-line', tone: 'green' as const },
]

const tabs = [
  { label: '首页', icon: 'i-mingcute-home-4-line', active: true },
  { label: '组件', icon: 'i-mingcute-grid-line' },
  { label: '示例', icon: 'i-mingcute-code-line' },
  { label: '我的', icon: 'i-mingcute-user-3-line' },
]

export default function Index() {
  useLoad(() => {
    console.log('Starter home loaded.')
  })

  return (
    <PageShell
      footer={
        <View className='template-tabbar safe-area-bottom'>
          {tabs.map((tab) => (
            <View key={tab.label} className={`template-tab ${tab.active ? 'active' : ''}`}>
              <View className={`${tab.icon} text-38`} />
              <Text className='text-22 mt-1'>{tab.label}</Text>
            </View>
          ))}
        </View>
      }
    >
      <AppHeader
        title='starter-taro'
        desc='Taro 4 + React 18 + TypeScript 小程序模板'
        right={<Badge tone='green'>WeApp Ready</Badge>}
      />

      <View className='starter-hero'>
        <View className='flex-1 min-w-0'>
          <Text className='block text-42 font-bold text-white leading-tight'>开箱即用的小程序起点</Text>
          <Text className='block text-24 starter-hero-desc mt-3 leading-relaxed'>内置工程配置、数据请求、状态管理、表单校验和常用页面组件。</Text>
          <View className='flex gap-2 mt-5 flex-wrap'>
            <Badge>H5</Badge>
            <Badge tone='purple'>WeApp</Badge>
            <Badge tone='orange'>UnoCSS</Badge>
          </View>
        </View>
        <View className='starter-hero-art'>
          <View className='starter-phone-card' />
          <View className='starter-code-card' />
        </View>
      </View>

      <View className='grid grid-cols-3 gap-3 mt-5'>
        <StatCard label='组件' value='10+' icon='i-mingcute-components-line' tone='blue' />
        <StatCard label='类型' value='TS' icon='i-mingcute-file-code-line' tone='purple' />
        <StatCard label='构建' value='多端' icon='i-mingcute-terminal-box-line' tone='green' />
      </View>

      <Section title='模板能力' desc='业务无关，可删可改'>
        <ActionGrid items={starterActions} />
      </Section>

      <Section title='通用组件' desc='成熟小程序常用的基础积木'>
        <Card>
          <ListItem title='PageShell / AppHeader' desc='统一页面骨架、标题栏和安全区' icon='i-mingcute-layout-line' tone='blue' />
          <View className='template-divider' />
          <ListItem title='Card / Section / ListItem' desc='列表页、设置页、详情页都能复用' icon='i-mingcute-list-check-line' tone='green' />
          <View className='template-divider' />
          <ListItem title='Empty / Loading / Error' desc='请求状态和空状态的默认实现' icon='i-mingcute-alert-line' tone='orange' />
        </Card>
      </Section>

      <Section title='状态示例' desc='给真实页面复制的最小状态块'>
        <View className='grid grid-cols-2 gap-3'>
          <EmptyState title='暂无数据' desc='替换成你的业务文案' />
          <ErrorState title='加载失败' desc='点击重试即可恢复' />
        </View>
        <View className='mt-3'>
          <LoadingState />
        </View>
      </Section>
    </PageShell>
  )
}
