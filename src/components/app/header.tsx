import { CleanCutLogo } from '@/components/icons';

export function AppHeader() {
  return (
    <header className="py-4 px-6 border-b border-border/50">
      <div className="container mx-auto flex items-center gap-3">
        <CleanCutLogo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">
          CleanCut
        </h1>
      </div>
    </header>
  );
}
