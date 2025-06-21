'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Download, Repeat, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  original: string;
  processed: string | null;
  onReset: () => void;
}

export function ImageComparison({ original, processed, onReset }: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX);
    
    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e: TouchEvent) => isDragging && handleMove(e.touches[0].clientX);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);


  return (
    <div className="w-full flex flex-col items-center gap-8">
       <Card className="shadow-lg w-full max-w-4xl">
        <CardContent className="p-4 md:p-6">
          <div className="relative w-full aspect-video select-none" ref={containerRef}>
            <Image
              src={original}
              alt="Original image"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
              unoptimized
            />
            {processed ? (
              <div
                className="absolute top-0 left-0 h-full w-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={processed}
                  alt="Background removed"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                  unoptimized
                />
              </div>
            ) : (
                <div className="absolute top-0 left-0 h-full w-full">
                    <Skeleton className="w-full h-full rounded-md" />
                </div>
            )}
             {processed && (
                 <>
                    <div
                        className="absolute top-0 h-full w-1 bg-background/50 cursor-ew-resize"
                        style={{ left: `calc(${sliderPosition}% - 2px)` }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center">
                            <MoveHorizontal className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                     <div className="absolute top-2 right-2 flex gap-2">
                        <div className="py-1 px-3 rounded-full bg-black/50 text-white text-sm font-semibold">Original</div>
                     </div>
                      <div className="absolute top-2 left-2 flex gap-2" style={{ opacity: sliderPosition > 20 ? 1 : 0}}>
                        <div className="py-1 px-3 rounded-full bg-black/50 text-white text-sm font-semibold">Removed BG</div>
                     </div>
                 </>
             )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={onReset} variant="outline" size="lg">
          <Repeat className="mr-2 h-5 w-5" />
          Try Another Image
        </Button>
        <Button
          asChild
          size="lg"
          disabled={!processed}
          className={cn(processed && "bg-accent hover:bg-accent/90 text-accent-foreground")}
        >
          <a href={processed ?? ''} download="cleancut-result.png">
            <Download className="mr-2 h-5 w-5" />
            Download HD
          </a>
        </Button>
      </div>
    </div>
  );
}
