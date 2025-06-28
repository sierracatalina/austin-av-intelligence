import { useState, useEffect } from 'react';
import NotionStatus from '../components/NotionStatus';

export default function Home() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            🚗 Austin AV Intelligence
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise autonomous vehicle data processing and analysis platform
          </p>
        </div>

        {/* Status Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <NotionStatus />
          
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Status</h3>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Platform Version:</span>
                  <span className="font-medium">{config?.platform?.version || 'v1.0.0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Processing Mode:</span>
                  <span className="font-medium capitalize">{config?.platform?.mode || 'production'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Active Scripts:</span>
                  <span className="font-medium">{config?.activeScripts?.length || 0}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Processing
              </h3>
              <p className="text-gray-600">
                Advanced sensor fusion and computer vision algorithms for autonomous vehicle data
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-4">☁️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cloud-Native Architecture
              </h3>
              <p className="text-gray-600">
                Scalable infrastructure designed for enterprise deployment and monitoring
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enterprise Security
              </h3>
              <p className="text-gray-600">
                Industry-grade security and compliance for autonomous vehicle systems
              </p>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-4">🔗</div>
            <div>
              <h3 className="text-lg font-medium text-blue-900">
                Dual-Source Architecture
              </h3>
              <p className="text-blue-700 mt-1">
                Code managed in GitHub, configuration controlled through Notion workspace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
