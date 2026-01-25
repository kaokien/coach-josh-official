/**
 * Workout Timer Web Worker
 * 
 * Runs timing in a separate thread to prevent UI jank from affecting countdown
 * accuracy. The main thread can be busy with animations, but the timer will
 * always fire on time.
 */

let intervalId = null;
let remainingMs = 0;
let isPaused = true;

self.onmessage = function (e) {
  const { type, payload } = e.data;

  switch (type) {
    case 'START':
      remainingMs = payload.durationMs;
      isPaused = false;

      if (intervalId) clearInterval(intervalId);

      // High-precision interval (16ms = ~60fps)
      intervalId = setInterval(function () {
        if (!isPaused && remainingMs > 0) {
          remainingMs -= 16;

          // Send tick every 100ms to reduce message overhead
          if (remainingMs % 100 < 16) {
            self.postMessage({
              type: 'TICK',
              remainingMs: remainingMs,
              remainingSeconds: Math.ceil(remainingMs / 1000)
            });
          }

          // Phase change detection (every second)
          if (remainingMs % 1000 < 16) {
            self.postMessage({
              type: 'SECOND',
              remainingSeconds: Math.ceil(remainingMs / 1000)
            });
          }
        }

        if (remainingMs <= 0) {
          self.postMessage({ type: 'COMPLETE' });
          if (intervalId) clearInterval(intervalId);
        }
      }, 16);
      break;

    case 'PAUSE':
      isPaused = true;
      break;

    case 'RESUME':
      isPaused = false;
      break;

    case 'RESET':
      remainingMs = payload.durationMs;
      isPaused = true;
      self.postMessage({
        type: 'TICK',
        remainingMs: remainingMs,
        remainingSeconds: Math.ceil(remainingMs / 1000)
      });
      break;

    case 'STOP':
      if (intervalId) clearInterval(intervalId);
      isPaused = true;
      break;
  }
};
