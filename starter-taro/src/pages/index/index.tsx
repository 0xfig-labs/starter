import { View, Text, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useCounterStore } from '@/stores'
import { useAppQuery } from '@/hooks'
import { dayjs } from '@/utils'
import './index.css'

export default function Index() {
  const { count, increment, decrement, reset } = useCounterStore()

  const { data: timeStr } = useAppQuery({
    queryKey: ['server-time'],
    queryFn: async () => dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='flex flex-col gap-4 p-8'>
      {/* 标题区域 */}
      <View className='flex-center flex-col mt-4'>
        <Text className='text-32 font-bold text-gray-800'>
          🎉 starter-taro
        </Text>
        <Text className='text-22 text-gray-400 mt-2'>
          Taro 4 + React 18 + TypeScript
        </Text>
      </View>

      {/* 技术栈卡片 */}
      <View className='bg-white rounded-12 p-6 shadow-sm'>
        <Text className='text-26 font-semibold text-gray-700 mb-3'>
          已集成技术栈
        </Text>
        <View className='flex flex-wrap gap-2'>
          {[
            'Taro 4', 'React 18', 'TypeScript',
            'Zustand', 'TanStack Query',
            'React Hook Form', 'Zod',
            'Day.js', 'lodash-es', 'UnoCSS',
          ].map((lib) => (
            <Text
              key={lib}
              className='px-3 py-1 text-20 bg-blue-50 text-blue-600 rounded-6'
            >
              {lib}
            </Text>
          ))}
        </View>
      </View>

      {/* Zustand Counter 示例 */}
      <View className='bg-white rounded-12 p-6 shadow-sm'>
        <Text className='text-26 font-semibold text-gray-700 mb-3'>
          Zustand Counter
        </Text>
        <Text className='text-48 font-bold text-center text-blue-500 my-4'>
          {count}
        </Text>
        <View className='flex justify-center gap-3'>
          <Button className='flex-center w-20 h-20 bg-blue-500 text-white rounded-8 text-28' onClick={decrement}>
            -1
          </Button>
          <Button className='flex-center w-20 h-20 bg-gray-200 text-gray-600 rounded-8 text-22' onClick={reset}>
            Reset
          </Button>
          <Button className='flex-center w-20 h-20 bg-blue-500 text-white rounded-8 text-28' onClick={increment}>
            +1
          </Button>
        </View>
      </View>

      {/* Day.js 示例 */}
      <View className='bg-white rounded-12 p-6 shadow-sm'>
        <Text className='text-26 font-semibold text-gray-700 mb-2'>
          Day.js (zh-cn)
        </Text>
        <Text className='text-22 text-gray-500'>
          {timeStr ?? '加载中...'}
        </Text>
        <Text className='text-20 text-gray-400 mt-1'>
          {dayjs().fromNow()} · {dayjs().format('dddd')}
        </Text>
      </View>

      {/* HTTP 封装说明 */}
      <View className='bg-white rounded-12 p-6 shadow-sm'>
        <Text className='text-26 font-semibold text-gray-700 mb-2'>
          HTTP 封装
        </Text>
        <Text className='text-22 text-gray-500 leading-relaxed'>
          Taro.request 拦截器链已就绪（Token 注入 / 日志 / 错误处理）。
          使用 http.get/post/put/delete 进行类型安全的 API 调用。
        </Text>
      </View>

      {/* Zod + RHF 说明 */}
      <View className='bg-white rounded-12 p-6 shadow-sm'>
        <Text className='text-26 font-semibold text-gray-700 mb-2'>
          表单 & 校验
        </Text>
        <Text className='text-22 text-gray-500 leading-relaxed'>
          React Hook Form + Zod 集成就绪。使用 loginSchema / registerSchema
          等预设校验规则，快速构建类型安全的表单。
        </Text>
      </View>

      {/* 底部 */}
      <View className='flex-center py-4'>
        <Text className='text-20 text-gray-400'>
          {dayjs().year()} starter-taro
        </Text>
      </View>
    </View>
  )
}
