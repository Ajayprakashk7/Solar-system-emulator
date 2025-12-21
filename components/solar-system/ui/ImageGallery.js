/* eslint-disable react-hooks/exhaustive-deps */
// ImageGallery.js - Full-screen image viewer with zoom and navigation
'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'z':
        case 'Z':
          setIsZoomed(!isZoomed);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isZoomed, onClose]);

  // Prevent body scroll when gallery is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!currentImage) return null;

  return (
    <div 
      className={styles.galleryOverlay}
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header with close button and counter */}
      <div className={styles.galleryHeader}>
        <div className={styles.imageCounter}>
          {currentIndex + 1} / {images.length}
        </div>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>
      </div>

      {/* Main image container */}
      <div className={`${styles.imageContainer} ${isZoomed ? styles.zoomed : ''}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={currentImage.url}
            alt={currentImage.alt || currentImage.title}
            fill
            sizes="100vw"
            className={styles.galleryImage}
            quality={95}
            priority
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
      </div>

      {/* Image caption */}
      {currentImage.caption && (
        <div className={styles.imageCaption}>
          <p>{currentImage.caption}</p>
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            className={`${styles.navButton} ${styles.navPrevious}`}
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Thumbnail strip (for multiple images) */}
      {images.length > 1 && (
        <div className={styles.thumbnailStrip}>
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`${styles.thumbnail} ${idx === currentIndex ? styles.thumbnailActive : ''}`}
              onClick={() => {
                setCurrentIndex(idx);
                setIsZoomed(false);
              }}
              aria-label={`View image ${idx + 1}`}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                width={80}
                height={60}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom indicator */}
      <div className={styles.controlsHint}>
        <span>Click image to {isZoomed ? 'zoom out' : 'zoom in'}</span>
        {images.length > 1 && <span> • Use arrows or swipe to navigate</span>}
        <span> • Press ESC to close</span>
      </div>
    </div>
  );
}
