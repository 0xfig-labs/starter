import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Card, CardHeader, CardContent, CardTitle } from '#/components/ui/card'

export const Route = createFileRoute('/{-$locale}/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

function TanStackQueryDemo() {
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () =>
      Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]),
    initialData: [],
  })

  return (
    <main className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-2">
            TanStack Query
          </p>
          <CardTitle className="text-2xl">
            TanStack Query Simple Promise Handling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 space-y-2">
            {data.map((todo) => (
              <li key={todo.id} className="rounded-lg border p-4">
                <span className="text-base font-medium">{todo.name}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  )
}
