import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfigForm from './ConfigForm';
import StatusDisplay from './StatusDisplay';
import { FaSignOutAlt } from 'react-icons/fa';

function LoadTester() {
  const navigate = useNavigate();
  const [baseUrl, setBaseUrl] = useState('http://example.com/api');
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [batchSize, setBatchSize] = useState(50);
  const [payloadSize, setPayloadSize] = useState(1000000);
  const [delayBetweenBatches, setDelayBetweenBatches] = useState(1000);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Updated generateHeavyPayload function with nested, complex data structures.
  const generateHeavyPayload = (size) => ({
    task: 'heavyCompute',
    payload: {
      data: Array.from({ length: size }, () => Math.random()),
      meta: {
        timestamp: Date.now(),
        description: "Complex payload structure for heavy computation",
        // Create a nested array whose length is a fraction of the payload size.
        nestedData: Array.from({ length: Math.floor(size / 1000) }, () => ({
          value: Math.random(),
          details: {
            a: Math.random(),
            b: Math.random(),
            c: Math.random(),
          },
        })),
      },
    },
    additional: {
      operation: "simulateComputation",
      complexity: Math.random(),
      parameters: {
        param1: Array.from({ length: 100 }, () => Math.random()),
        param2: Array.from({ length: 50 }, () => ({
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
        })),
      },
    },
  });

  const sendHeavyLoadRequests = async () => {
    setCompletedCount(0);
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const durationMs = durationMinutes * 60 * 1000;
    const startTime = Date.now();
    const endTime = startTime + durationMs;
    let batchNumber = 0;

    while (Date.now() < endTime && !controller.signal.aborted) {
      batchNumber++;
      const batchRequests = Array.from({ length: batchSize }, (_, i) => {
        const requestId = batchNumber * batchSize + i + 1;
        const reqStartTime = performance.now();
        const payload = generateHeavyPayload(payloadSize);

        return fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'omit',
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
          .then(() =>
            new Promise((resolve) => {
              const reqEndTime = performance.now();
              resolve({
                id: requestId,
                time: Math.round(reqEndTime - reqStartTime),
                status: 'Success',
              });
            })
          )
          .catch((err) => {
            const reqEndTime = performance.now();
            const status =
              err.name === 'AbortError' ? 'Aborted' : `Error: ${err.message}`;
            return {
              id: requestId,
              time: Math.round(reqEndTime - reqStartTime),
              status,
            };
          })
          .finally(() => {
            setCompletedCount((prev) => prev + 1);
          });
      });

      await Promise.all(batchRequests);
      await wait(delayBetweenBatches);
    }

    setLoading(false);
    abortControllerRef.current = null;
  };

  const cancelRequests = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="space-y-8">
      <ConfigForm
        baseUrl={baseUrl}
        setBaseUrl={setBaseUrl}
        durationMinutes={durationMinutes}
        setDurationMinutes={setDurationMinutes}
        batchSize={batchSize}
        setBatchSize={setBatchSize}
        payloadSize={payloadSize}
        setPayloadSize={setPayloadSize}
        delayBetweenBatches={delayBetweenBatches}
        setDelayBetweenBatches={setDelayBetweenBatches}
        sendHeavyLoadRequests={sendHeavyLoadRequests}
        cancelRequests={cancelRequests}
        loading={loading}
      />
      <StatusDisplay loading={loading} completedCount={completedCount} />
    </div>
  );
}

export default LoadTester;
