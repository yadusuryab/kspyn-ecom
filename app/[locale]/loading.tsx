import { Spinner } from "@/components/ui/spinner";

export default async function LoadingPage() {
  // const t = await getTranslations()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-6">
        <Spinner size="lg" className="bg-foreground" />
      </div>
    </div>
  );
}
