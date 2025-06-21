'use client';

import { useState, useRef, type DragEvent } from 'react';
import { UploadCloud, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageUploadFormProps {
  onFileSelect: (file: File) => void;
  loading: boolean;
}

export function ImageUploadForm({ onFileSelect, loading }: ImageUploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Remove Image Background</CardTitle>
        <CardDescription className="text-lg">Upload your image and let AI do the magic. 100% free and automatic.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-300 ease-in-out',
            isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted'
          )}
        >
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <UploadCloud className="w-16 h-16 text-primary" />
            <p className="font-semibold text-lg">Drag & drop an image here, or click to browse</p>
            <p className="text-sm">Supports JPG, PNG formats up to 5MB</p>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg"
          disabled={loading}
        />
        <div className="mt-6 flex justify-center">
          <Button onClick={handleBrowseClick} size="lg" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
