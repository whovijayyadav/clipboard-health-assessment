const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate = "0";

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = generateHash(data)
    }
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
 
  return candidate.length > MAX_PARTITION_KEY_LENGTH ? generateHash(candidate) : candidate;
};

function generateHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}