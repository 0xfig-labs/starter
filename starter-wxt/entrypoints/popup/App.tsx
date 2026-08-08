import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import '@/assets/globals.css';

export default function App() {
  return (
    <main className="flex min-w-80 flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>WXT Starter</CardTitle>
          <CardDescription>React + shadcn/ui browser extension.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => browser.runtime.openOptionsPage()}>Open options</Button>
        </CardContent>
      </Card>
    </main>
  );
}
