import React, { useState } from 'react';
import { X, FileText, File, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface FileUploadAreaProps {
  uploadedFiles: UploadedFile[];
  onRemoveFile: (index: number) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({ 
  uploadedFiles, 
  onRemoveFile 
}) => {
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText size={16} className="text-primary" />;
    if (type.includes('sheet') || type.includes('excel')) return <FileSpreadsheet size={16} className="text-primary" />;
    return <File size={16} className="text-primary" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (uploadedFiles.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-white mb-2">Uploaded Files:</h4>
      <div className="space-y-2">
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-card-dark border border-primary-dark/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              {getFileIcon(file.type)}
              <div>
                <p className="text-sm text-white truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFile(index)}
              className="text-gray-400 hover:text-primary hover:bg-primary/10"
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};