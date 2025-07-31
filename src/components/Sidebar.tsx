import React from 'react';
import { FileText, Users, DollarSign, History, Upload } from 'lucide-react';

interface SidebarProps {
  onFileUpload: (files: FileList) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div className="w-1/4 h-screen bg-sidebar-dark border-r border-primary-dark/30 p-4 flex flex-col">
      {/* Logo Section */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-primary-glow">
          <span className="text-white font-bold text-lg">Z</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">ZabbixAI</h1>
          <p className="text-sm text-gray-400">Intelligent Assistant</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-xl font-semibold text-white">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Cost</p>
              <p className="text-xl font-semibold text-white">$2,456</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Upload size={18} />
          Upload Documents
        </h3>
        <div className="border-2 border-dashed border-primary-dark/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            id="file-upload"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileChange}
            className="hidden"
            max={3}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <FileText size={32} className="text-primary" />
            <p className="text-sm text-gray-300">
              Click to upload files
            </p>
            <p className="text-xs text-gray-500">
              PDF, Word, Excel (Max 3 files)
            </p>
          </label>
        </div>
      </div>

      {/* History Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <History size={18} />
          Chat History
        </h3>
        <div className="space-y-2">
          <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-3 hover:bg-primary-dark/10 cursor-pointer transition-colors">
            <p className="text-sm text-white truncate">Zabbix configuration help</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
          <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-3 hover:bg-primary-dark/10 cursor-pointer transition-colors">
            <p className="text-sm text-white truncate">Monitoring best practices</p>
            <p className="text-xs text-gray-500">1 day ago</p>
          </div>
          <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-3 hover:bg-primary-dark/10 cursor-pointer transition-colors">
            <p className="text-sm text-white truncate">Alert configuration</p>
            <p className="text-xs text-gray-500">3 days ago</p>
          </div>
          <div className="bg-card-dark border border-primary-dark/30 rounded-lg p-3 hover:bg-primary-dark/10 cursor-pointer transition-colors">
            <p className="text-sm text-white truncate">Database optimization</p>
            <p className="text-xs text-gray-500">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};