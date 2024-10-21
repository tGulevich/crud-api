import cluster from "cluster";
import http from "http";
import os from "os";
import { requestListener } from "../requestListener";

const numCPUs = os.cpus().length;
const PORT = parseInt(process.env.PORT || "4000", 10);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    console.log(`Worker ${worker.process.pid} started`);
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const workerPort = cluster.worker ? PORT + cluster.worker.id : PORT;
  const server = http.createServer(requestListener);

  server.listen(workerPort, () => {
    console.log(`Worker ${process.pid} listening on port ${workerPort}`);
  });
}
