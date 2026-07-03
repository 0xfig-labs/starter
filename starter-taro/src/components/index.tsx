import { useEffect, useState, type ReactNode } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

export type Tone = 'blue' | 'green' | 'orange' | 'purple' | 'slate' | 'red'

export function PageShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState(24)

  useEffect(() => {
    try {
      const menu = Taro.getMenuButtonBoundingClientRect?.()
      if (menu?.bottom) {
        setHeaderHeight(menu.bottom + 16)
      }
    } catch {
      // H5 没有小程序胶囊按钮，保留默认轻量间距即可。
    }
  }, [])

  return (
    <View className='template-page min-h-screen bg-slate-50 text-slate-900'>
      <View className='template-transparent-header' style={{ height: `${headerHeight}px` }} />
      <View className='template-page-content'>{children}</View>
      {footer}
    </View>
  )
}

export function AppHeader({
  title,
  desc,
  right,
}: {
  title: string
  desc?: string
  right?: ReactNode
}) {
  return (
    <View className='flex-between items-start mb-6'>
      <View className='flex-1 min-w-0'>
        <Text className='block text-40 font-bold tracking-tight text-slate-950'>{title}</Text>
        {desc ? <Text className='block text-23 text-slate-500 mt-2 leading-relaxed'>{desc}</Text> : null}
      </View>
      {right ? <View className='ml-4'>{right}</View> : null}
    </View>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <View className={`rounded-24 bg-white p-5 shadow-sm ${className}`}>{children}</View>
}

export function Section({
  title,
  desc,
  extra,
  children,
}: {
  title: string
  desc?: string
  extra?: ReactNode
  children?: ReactNode
}) {
  return (
    <View className='mt-6'>
      <View className='flex-between items-end mb-3'>
        <View>
          <Text className='block text-30 font-bold text-slate-900'>{title}</Text>
          {desc ? <Text className='block text-21 text-slate-400 mt-1'>{desc}</Text> : null}
        </View>
        {extra}
      </View>
      {children}
    </View>
  )
}

export function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: Tone }) {
  return <Text className={`ui-badge tone-${tone}`}>{children}</Text>
}

export function ActionGrid({
  items,
  columns = 4,
}: {
  items: Array<{ title: string; desc?: string; icon: string; tone?: Tone }>
  columns?: 3 | 4
}) {
  return (
    <View className='grid gap-3' style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {items.map((item) => (
        <Card key={item.title} className='flex-col flex-center text-center py-5'>
          <View className={`ui-icon tone-${item.tone ?? 'blue'}`}>
            <View className={`${item.icon} text-34`} />
          </View>
          <Text className='block text-23 font-semibold text-slate-800 mt-3'>{item.title}</Text>
          {item.desc ? <Text className='block text-18 text-slate-400 mt-1'>{item.desc}</Text> : null}
        </Card>
      ))}
    </View>
  )
}

export function StatCard({ label, value, icon, tone = 'blue' }: { label: string; value: string; icon: string; tone?: Tone }) {
  return (
    <Card className='flex-between'>
      <View>
        <Text className='block text-21 text-slate-400'>{label}</Text>
        <Text className='block text-34 font-bold text-slate-900 mt-1'>{value}</Text>
      </View>
      <View className={`ui-icon tone-${tone}`}>
        <View className={`${icon} text-32`} />
      </View>
    </Card>
  )
}

export function ListItem({
  title,
  desc,
  icon,
  extra,
  tone = 'blue',
}: {
  title: string
  desc?: string
  icon: string
  extra?: ReactNode
  tone?: Tone
}) {
  return (
    <View className='flex items-center py-4'>
      <View className={`ui-icon small tone-${tone}`}>
        <View className={`${icon} text-26`} />
      </View>
      <View className='flex-1 min-w-0 ml-3'>
        <Text className='block text-25 font-semibold text-slate-800'>{title}</Text>
        {desc ? <Text className='block text-20 text-slate-400 mt-1'>{desc}</Text> : null}
      </View>
      {extra ?? <View className='i-mingcute-right-line text-26 text-slate-300' />}
    </View>
  )
}

export function EmptyState({ title, desc }: { title: string; desc?: string }) {
  return (
    <Card className='flex-col flex-center py-8 text-center'>
      <View className='ui-empty-visual'>
        <View className='i-mingcute-inbox-2-line text-54 text-slate-300' />
      </View>
      <Text className='block text-27 font-semibold text-slate-800 mt-4'>{title}</Text>
      {desc ? <Text className='block text-21 text-slate-400 mt-2'>{desc}</Text> : null}
    </Card>
  )
}

export function LoadingState() {
  return (
    <Card className='py-5'>
      <View className='ui-skeleton w-40 h-5' />
      <View className='ui-skeleton w-full h-4 mt-4' />
      <View className='ui-skeleton w-70-pct h-4 mt-3' />
    </Card>
  )
}

export function ErrorState({ title, desc }: { title: string; desc?: string }) {
  return (
    <Card className='flex items-center'>
      <View className='ui-icon tone-red'>
        <View className='i-mingcute-warning-line text-32' />
      </View>
      <View className='ml-3 flex-1'>
        <Text className='block text-25 font-semibold text-slate-800'>{title}</Text>
        {desc ? <Text className='block text-20 text-slate-400 mt-1'>{desc}</Text> : null}
      </View>
    </Card>
  )
}
