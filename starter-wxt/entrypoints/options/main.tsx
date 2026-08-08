import { createRoot } from 'react-dom/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import '@/assets/globals.css';

function Options() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Extension options</CardTitle>
          <CardDescription>Replace this page with your extension settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => browser.runtime.sendMessage({ type: 'options-ready' })}>
            Test background message
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<Options />);
