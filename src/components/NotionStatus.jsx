import { useState, useEffect } from 'react';
import { statusClasses } from './statusClasses';

export default function NotionStatus() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch config:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-4 w-4"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const status = config?.notionSync === 'connected' ? 'connected' : 'disconnected';
  const statusText = status === 'connected' ? 'Connected' : 'Disconnected';
  const { badgeBg, badgeText, dot } = statusClasses[status];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notion Integration</h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeBg} ${badgeText}`}
        >
          <div className={`w-2 h-2 ${dot} rounded-full mr-1`}></div>
          {statusText}
        </span>
      </div>
      
      {config && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Platform Version:</span>
            <span className="font-medium">{config.platform?.version}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Active Scripts:</span>
            <span className="font-medium">{config.activeScripts?.length || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Processing Mode:</span>
            <span className="font-medium capitalize">{config.platform?.mode}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Updated:</span>
            <span className="text-gray-400">
              {new Date(config.lastUpdated).toLocaleTimeString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
