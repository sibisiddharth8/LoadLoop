import React from 'react';
import { FaRocket, FaBan } from 'react-icons/fa';

function ConfigForm({
  baseUrl,
  setBaseUrl,
  durationMinutes,
  setDurationMinutes,
  batchSize,
  setBatchSize,
  payloadSize,
  setPayloadSize,
  delayBetweenBatches,
  setDelayBetweenBatches,
  sendHeavyLoadRequests,
  cancelRequests,
  loading,
}) {
  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow space-y-4">
      {/* Tile Header */}
      <div className="bg-gray-700 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center">Load Test Configuration</h2>
      </div>
      
      <div>
        <label className="block mb-1 text-sm">Base URL:</label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
          placeholder="https://your-server.com/api"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Duration (minutes):</label>
        <input
          type="number"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
          min="1"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Batch Size (concurrent requests):</label>
        <input
          type="number"
          value={batchSize}
          onChange={(e) => setBatchSize(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
          min="1"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Payload Size (array length):</label>
        <input
          type="number"
          value={payloadSize}
          onChange={(e) => setPayloadSize(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
          min="1"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Delay between Batches (ms):</label>
        <input
          type="number"
          value={delayBetweenBatches}
          onChange={(e) => setDelayBetweenBatches(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-green-300 focus:outline-none focus:ring focus:ring-green-500"
          min="0"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <button
          onClick={sendHeavyLoadRequests}
          disabled={loading}
          className="flex-1 flex items-center justify-center p-3 bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50 transition-colors duration-200"
        >
          <FaRocket className="mr-2" />
          Start Load Test
        </button>
        {loading && (
          <button
            onClick={cancelRequests}
            className="flex-1 flex items-center justify-center p-3 bg-red-600 rounded hover:bg-red-500 transition-colors duration-200"
          >
            <FaBan className="mr-2" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ConfigForm;
