import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function StatusDisplay({ loading, completedCount }) {
  return (
    <div className="mt-6 text-center">
      {loading ? (
        <p className="text-lg">
          <FaSpinner className="animate-spin inline-block mr-2" />
          Sending requests... <span className="font-bold">{completedCount}</span> completed
        </p>
      ) : (
        <p className="text-lg">Load test idle.</p>
      )}
    </div>
  );
}

export default StatusDisplay;
