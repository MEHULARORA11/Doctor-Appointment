/**
 * Vercel serverless entry: export Express app without listen().
 * Local/dev still uses src/server.ts.
 */
import buffer from 'buffer';
if (!(buffer as any).SlowBuffer) {
    (buffer as any).SlowBuffer = buffer.Buffer;
}

import app from './app';

export default app;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = app;
    module.exports.default = app;
}
