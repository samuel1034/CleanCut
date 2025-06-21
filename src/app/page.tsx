'use client';

import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { removeBackground } from '@/ai/flows/remove-background';

import { AppHeader } from '@/components/app/header';
import { AppFooter } from '@/components/app/footer';
import { ImageUploadForm } from '@/components/app/image-upload-form';
import { ImageComparison } from '@/components/app/image-comparison';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload a valid image file (e.g., JPG, PNG).',
      });
      return;
    }
    
    // Max file size: 5MB
    if (file.size > 5 * 1024 * 1024) { 
        toast({
            variant: 'destructive',
            title: 'File Too Large',
            description: 'Please upload an image smaller than 5MB.',
        });
        return;
    }

    setIsLoading(true);
    setProcessedImage(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setOriginalImage(dataUrl);

      try {
        const result = await removeBackground({ photoDataUri: dataUrl });
        if (result.backgroundRemovedDataUri) {
          setProcessedImage(result.backgroundRemovedDataUri);
        } else {
          throw new Error("AI did not return an image.");
        }
      } catch (error) {
        console.error("Background removal failed:", error);
        toast({
          variant: 'destructive',
          title: 'Processing Failed',
          description: 'Could not remove the background. The AI may be unavailable or the image format is unsupported. Please try again.',
        });
        handleReset(); // Reset on failure
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the selected file. Please try again.',
      });
      setIsLoading(false);
    };
  };
  
  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow flex items-center justify-center w-full px-4 py-8">
        <div className="w-full max-w-4xl">
          {!originalImage ? (
            <ImageUploadForm onFileSelect={handleFileSelect} loading={isLoading} />
          ) : (
            <ImageComparison
              original={originalImage}
              processed={processedImage}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
